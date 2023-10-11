import { useTransition } from "react"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"

import { addToCartAction } from "../cart/actions"
import { Button } from "../ui/button"

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
    <Button
      aria-label="Add item to cart"
      onClick={handleAddToCart}
      className="flex items-center gap-x-2"
      disabled={isPending}
    >
      Add To Cart
      <ShoppingCart size={20} />
    </Button>
  )
}

export default AddToCard
