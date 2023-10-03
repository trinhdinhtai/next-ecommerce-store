"use server"

import { cookies } from "next/headers"
import { type z } from "zod"

import { cartItemSchema } from "@/lib/validations/cart"

export const addItem = async (input: z.infer<typeof cartItemSchema>) => {
  // TODO: Add item to cart in database
  let cartId = cookies().get("cartId")?.value
  let cart
}
