"use server"

import { CategoryProducts, Product } from "@/types"
import { z } from "zod"

import { env } from "@/env.mjs"
import { defaultPagination } from "@/lib/constants"
import { prisma } from "@/lib/prismadb"
import { unSlugify } from "@/lib/url"
import { getProductsSchema } from "@/lib/validations/product"

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

export const getCategoryProductsAction = async ({
  limit = defaultPagination.pageSize,
  offset = defaultPagination.currentPage,
  sortKey = "createdAt",
  sortValue = "desc",
  categories,
  price_range,
}: z.infer<typeof getProductsSchema>): Promise<CategoryProducts> => {
  const targetCategories = categories?.split(".").map((item) => unSlugify(item))
  const [minPrice, maxPrice] = price_range?.split("-") ?? []

  const response = await Promise.all([
    prisma.product.count({
      where: {
        storeId: STORE_ID,
        isArchived: false,
        category: {
          name: {
            in: targetCategories,
          },
        },
      },
    }),
    await prisma.product.findMany({
      skip: offset,
      take: limit,
      where: {
        storeId: STORE_ID,
        isArchived: false,
        category: {
          name: {
            in: targetCategories,
          },
        },
        price: price_range
          ? {
              gte: parseFloat(minPrice),
              lte: parseFloat(maxPrice),
            }
          : undefined,
      },
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
      orderBy: {
        [sortKey]: sortValue,
      },
    }),
  ])

  const [count, products] = response

  const formattedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }))

  return { count, products: formattedProducts }
}
