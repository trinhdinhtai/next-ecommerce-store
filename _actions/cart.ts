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
          product: {
            connect: {
              id: productId,
            },
          },
          quantity,
        },
      },
    },
  })

  return cart
}

const updateCart = async ({
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

export { createCart, getCart, updateCart }
