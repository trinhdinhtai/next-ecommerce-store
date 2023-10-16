"use server"

import { Product } from "@/types"

import { env } from "@/env.mjs"
import { prisma } from "@/lib/prismadb"

const STORE_ID = env.STORE_ID

export const getNewProductsAction = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      rating: true,
      images: {
        select: {
          id: true,
          url: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      size: {
        select: {
          id: true,
          name: true,
          value: true,
        },
      },
      color: {
        select: {
          id: true,
          name: true,
          value: true,
        },
      },
    },
    where: {
      storeId: STORE_ID,
      isArchived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  })

  return products
}
