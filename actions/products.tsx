import { Product } from "@/types"
import axios from "axios"
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

const getProducts = async (query: Query): Promise<Product[]> => {
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

export { getProducts, getProductById, getProductRecommendations }
