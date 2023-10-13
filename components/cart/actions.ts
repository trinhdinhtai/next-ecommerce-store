"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import {
  createCart,
  createCartItem,
  getCart,
  updateCartItemQuantity,
} from "@/_actions/cart"
import { CartLineItems } from "@/types"
import { type z } from "zod"

import { prisma } from "@/lib/prismadb"
import { cartItemSchema } from "@/lib/validations/cart"

export async function getCartAction(): Promise<CartLineItems> {
  const cartId = cookies().get("cartId")?.value
  if (!cartId)
    return {
      cartItems: [],
      itemCount: 0,
      totalAmount: 0,
    }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    select: {
      cartItems: {
        select: {
          id: true,
          productId: true,
          product: {
            select: {
              name: true,
              images: true,
              price: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          quantity: true,
        },
      },
    },
  })

  const quantityCount = await prisma.cartItem.aggregate({
    where: {
      cartId,
    },
    _sum: {
      quantity: true,
    },
  })

  // TODO: Update this to use the cartTotal from the server
  const totalAmount = cart?.cartItems.reduce(
    (total, item) => total + item.quantity * Number(item.product.price),
    0
  )

  return {
    cartItems: cart?.cartItems ?? [],
    itemCount: quantityCount._sum.quantity ?? 0,
    totalAmount: totalAmount ?? 0,
  }
}

export const addToCartAction = async ({
  productId,
  quantity,
}: z.infer<typeof cartItemSchema>) => {
  // Checking if product is in stock
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      inventory: true,
    },
  })

  if (!product) {
    throw new Error("Product not found, please try again.")
  }

  if (product.inventory < quantity) {
    throw new Error("Product is out of stock, please try again later.")
  }

  // Create cart
  let cartId = cookies().get("cartId")?.value
  let cart
  if (cartId) {
    cart = await getCart(cartId)
    const cartItem = cart?.cartItems.find(
      (item) => item.productId === productId
    )

    if (cartItem) {
      cart = await updateCartItemQuantity({ cartItemId: cartItem.id, quantity })
      revalidatePath("/")
      return cart
    }

    cart = await createCartItem({ cartId, productId, quantity })
    revalidatePath("/")
    return cart
  }
  if (!cartId || !cart) {
    cart = await createCart({ productId, quantity })
    cartId = cart.id
    cookies().set("cartId", cartId)
    revalidatePath("/")
    return cart
  }

  revalidatePath("/")
  return cart
}

export const decreaseProductCartAction = async (cartItemId: string) => {
  let cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart id not found, please try again.")
  }

  await prisma.cartItem.update({
    data: {
      quantity: {
        decrement: 1,
      },
    },
    where: {
      id: cartItemId,
    },
  })

  revalidatePath("/")
}

export const updateCartItemAction = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: string
  quantity: number
}) => {
  // Create cart
  let cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart id not found, please try again.")
  }

  const cart = await getCart(cartId)
}
