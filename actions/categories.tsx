import { Category } from "@/types"
import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

const getCategories = async (): Promise<Category[]> => {
  console.log("file: categories.tsx:6 ~ URL:", URL)
  const response = await axios.get(URL)
  console.log("file: categories.tsx:9 ~ getCategories ~ response:", response)
  return response.data
}

export { getCategories }
