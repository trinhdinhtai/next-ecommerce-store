import { ShoppingCart } from "lucide-react"

import { Button } from "../ui/button"

const AddToCard = () => {
  const handleAddToCart = () => {}
  return (
    <Button onClick={handleAddToCart} className="flex items-center gap-x-2">
      Add To Cart
      <ShoppingCart size={20} />
    </Button>
  )
}

export default AddToCard
