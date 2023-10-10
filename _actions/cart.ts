import { Cart } from "@/types"
import axios from "axios"

const URL = "https://gm.io.vn/api/cart"

const createCart = async (): Promise<Cart> => {
  const response = await axios.post(URL)
  return response.data
}

const getCart = async (cartId: string): Promise<Cart> => {
  const response = await axios.get(`${URL}/${cartId}`)
  return response.data
}

export { createCart, getCart }
