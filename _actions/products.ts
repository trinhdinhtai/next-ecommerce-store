"use server"

import { NewProduct, ProductDetail, RelatedProduct } from "@/types"
import { z } from "zod"

import { env } from "@/env.mjs"
import { defaultPagination } from "@/lib/constants"
import { prisma } from "@/lib/prismadb"
import { toTitleCase } from "@/lib/url"
import { getProductsSchema } from "@/lib/validations/product"

const STORE_ID = env.STORE_ID

const getNewProductsAction = async (): Promise<NewProduct[]> => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
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

const getProductByIdAction = async (
  productId: string
): Promise<ProductDetail | null> => {
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

  return product
}

const getProductRecommendationsAction = async (
  productId: string
): Promise<RelatedProduct[]> => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
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

  return products
}

const getCategoryProductsAction = async ({
  limit = defaultPagination.pageSize,
  offset = defaultPagination.currentPage,
  categories,
}: z.infer<typeof getProductsSchema>) => {
  const targetCategories = categories
    ?.split(".")
    .map((item) => toTitleCase(item))

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
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ])

  const [count, products] = response
  return { count, products }
}

export {
  getNewProductsAction,
  getProductByIdAction,
  getProductRecommendationsAction,
  getCategoryProductsAction,
}
