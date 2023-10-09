import { Product } from "@/types"
import axios from "axios"
import qs from "query-string"

import { defaultPagination } from "@/lib/constants"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

const getProductsAction = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  })

  const res = await fetch(url)

  return res.json()
}

const getProductRecommendations = async ({
  productId,
  categoryId,
}: {
  productId: string
  categoryId: string
}): Promise<Product[]> => {
  const productsByCategoryIdResponse = await axios.get(
    `${URL}?categoryId=${categoryId}`
  )

  const productsByCategoryId = productsByCategoryIdResponse.data

  const relatedProducts = productsByCategoryId.filter(
    (product: Product) => product.id !== productId
  )
  return relatedProducts
}

const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`)

  return res.json()
}

const getCategoryProducts = async ({
  limit = defaultPagination.pageSize,
  offset = defaultPagination.currentPage,
  reverse,
  sortKey,
}: {
  limit?: number
  offset?: number
  reverse?: boolean
  sortKey?: string
}): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      limit,
      offset,
    },
  })

  const response = await axios.get(url)

  return response.data
}

export {
  getProductsAction as getProducts,
  getProductById,
  getProductRecommendations,
  getCategoryProducts,
}
