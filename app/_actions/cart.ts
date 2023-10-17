"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { Cart } from "@/types"
import { z } from "zod"

import { prisma } from "@/lib/prismadb"
import { cartItemSchema } from "@/lib/validations/cart"

const getCart = async (cartId: string) => {
  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: true,
    },
  })
  return cart
}

const createCart = async ({
  productId,
  quantity,
}: z.infer<typeof cartItemSchema>): Promise<Cart> => {
  const cart = await prisma.cart.create({
    data: {
      cartItems: {
        create: {
          productId,
          quantity,
        },
      },
    },
  })

  return cart
}

const createCartItem = async ({
  cartId,
  productId,
  quantity,
}: z.infer<typeof cartItemSchema> & {
  cartId: string
}): Promise<Cart> => {
  const cart = await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
  })

  return cart
}

const updateCartItemQuantity = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: string
  quantity: number
}) => {
  const cart = await prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity: {
        increment: quantity,
      },
    },
  })
  return cart
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

export const increaseProductQuantityAction = async (cartItemId: string) => {
  let cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart id not found, please try again.")
  }

  await prisma.cartItem.update({
    data: {
      quantity: {
        increment: 1,
      },
    },
    where: {
      id: cartItemId,
    },
  })

  revalidatePath("/")
}
