"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createCart, getCart, updateCart } from "@/_actions/cart"
import { type z } from "zod"

import { prisma } from "@/lib/prismadb"
import { cartItemSchema } from "@/lib/validations/cart"

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
      cart = await updateCart({ cartItemId: cartItem.id, quantity })
      revalidatePath("/")
      return cart
    }
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
