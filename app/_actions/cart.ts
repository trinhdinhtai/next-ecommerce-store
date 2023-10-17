"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { Cart, CartLineItems } from "@/types"
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

export async function getCartAction(): Promise<CartLineItems | undefined> {
  const cartId = cookies().get("cartId")?.value
  if (!cartId) return undefined

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
    id: cartId,
    cartItems: cart?.cartItems
      ? cart.cartItems.map((item) => ({
          ...item,
          product: {
            ...item.product,
            price: Number(item.product.price),
          },
        }))
      : [],
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

export const decreaseProductQuantityAction = async (
  currentQuantity: number,
  cartItemId: string
) => {
  let cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart id not found, please try again.")
  }

  if (currentQuantity === 1) {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    })
    revalidatePath("/")
    return
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

export const updateProductQuantityAction = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: string
  quantity: number
}) => {
  let cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart id not found, please try again.")
  }

  await prisma.cartItem.update({
    data: {
      quantity,
    },
    where: {
      id: cartItemId,
    },
  })

  revalidatePath("/")
}

export const deleteCartItemAction = async (cartItemId: string) => {
  let cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart id not found, please try again.")
  }

  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  })

  revalidatePath("/")
}
