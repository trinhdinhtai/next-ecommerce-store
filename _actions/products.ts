"use server"

import { CategoryProducts, Product } from "@/types"
import { z } from "zod"

import { env } from "@/env.mjs"
import { defaultPagination } from "@/lib/constants"
import { prisma } from "@/lib/prismadb"
import { unSlugify } from "@/lib/url"
import { getProductsSchema } from "@/lib/validations/product"

const STORE_ID = env.STORE_ID

const getNewProductsAction = async (): Promise<Product[]> => {
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

const getProductByIdAction = async (
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

  return product
}

const getProductRecommendationsAction = async (
  productId: string
): Promise<Product[]> => {
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

  return products
}

const getCategoryProductsAction = async ({
  limit = defaultPagination.pageSize,
  offset = defaultPagination.currentPage,
  sortKey = "createdAt",
  sortValue = "desc",
  categories,
}: z.infer<typeof getProductsSchema>): Promise<CategoryProducts> => {
  const targetCategories = categories?.split(".").map((item) => unSlugify(item))

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
  return { count, products }
}

export {
  getNewProductsAction,
  getProductByIdAction,
  getProductRecommendationsAction,
  getCategoryProductsAction,
}
