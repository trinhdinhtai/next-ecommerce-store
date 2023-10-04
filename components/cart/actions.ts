"use server"

import { cookies } from "next/headers"
import { createCart, getCart } from "@/actions/cart"
import { type z } from "zod"

import { cartItemSchema } from "@/lib/validations/cart"

export const addItem = async ({
  productId,
  quantity,
}: z.infer<typeof cartItemSchema>) => {
  let cartId = cookies().get("cartId")?.value
  let cart

  if (cartId) {
    cart = await getCart(cartId)
  }

  if (!cartId || !cart) {
    cart = await createCart()
    cartId = cart.id
    cookies().set("cartId", cartId)
  }
}
