import { useTransition } from "react"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import LoadingButton from "@/components/loading-button"

import { addToCartAction } from "../cart/actions"

interface AddToCartProps {
  productId: string
}

const AddToCard = ({ productId }: AddToCartProps) => {
  const [isPending, startTransition] = useTransition()

  const handleAddToCart = () => {
    startTransition(async () => {
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

  return (
    <LoadingButton
      aria-label="Add item to cart"
      onClick={handleAddToCart}
      className="flex items-center gap-x-2"
      dotClassName="bg-background"
      isLoading={isPending}
      icon={<ShoppingCart size={18} />}
    >
      Add To Cart
    </LoadingButton>
  )
}

export default AddToCard
