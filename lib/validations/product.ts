import * as z from "zod"

export const getProductsSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  sortKey: z.enum(["createdAt", "price"]).default("createdAt"),
  sortValue: z.enum(["asc", "desc"]).default("desc"),
  categories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
})
