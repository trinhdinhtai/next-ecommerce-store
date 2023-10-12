import * as z from "zod"

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(0),
})

export const cartLineItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  quantity: z.number().min(0),
})
