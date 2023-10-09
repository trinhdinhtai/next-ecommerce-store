import { Category } from "@/types"
import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(URL)
  return response.data
}

export { getCategories }
