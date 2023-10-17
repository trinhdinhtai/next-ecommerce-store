"use server"

import { Product } from "@/types"

import { env } from "@/env.mjs"
import { prisma } from "@/lib/prismadb"

const STORE_ID = env.STORE_ID

export const getNewProductsAction = async (): Promise<Product[]> => {
  const productsResponse = await prisma.product.findMany({
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

  const products = productsResponse.map((product) => ({
    ...product,
    price: Number(product.price),
  }))

  return products
}

export const getProductByIdAction = async (
  productId: string
): Promise<Product | null> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
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
          imageUrl: true,
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
  })

  if (!product) return null

  return { ...product, price: Number(product.price) }
}

export const getProductRecommendationsAction = async (
  productId: string
): Promise<Product[]> => {
  const productResponses = await prisma.product.findMany({
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
          imageUrl: true,
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
      category: {
        products: {
          some: {
            id: productId,
          },
        },
      },
      id: {
        not: productId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  })

  const products = productResponses.map((product) => ({
    ...product,
    price: Number(product.price),
  }))

  return products
}
