import { useTransition } from "react"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import {
  addToCartAction,
  increaseProductQuantityAction,
} from "@/components/cart/actions"

const useCartItem = () => {
  const [isIncreasePending, startIncreaseTransition] = useTransition()
  const [isAddToCartPending, startAddToCartTransition] = useTransition()

  const handleAddToCart = (productId: string) => {
    startAddToCartTransition(async () => {
      try {
        await addToCartAction({
          productId: productId,
          quantity: 1,
        })
        toast.success("Added to cart.")
      } catch (err) {
        catchError(err)
      }
    })
  }

  const handleIncrement = (cartItemId: string) => {
    startIncreaseTransition(async () => {
      try {
        await increaseProductQuantityAction(cartItemId)
      } catch (err) {
        catchError(err)
      }
    })
  }

  return {
    isIncreasePending,
    handleIncrement,
    isAddToCartPending,
    handleAddToCart,
  }
}

export default useCartItem
