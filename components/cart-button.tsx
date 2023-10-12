import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getCartAction } from "@/components/cart/actions"

export default async function CartButton() {
  const { cartItems, itemCount } = await getCartAction()

  return (
    <Button variant="ghost" className="relative px-3">
      <ShoppingCart size={24} />

      {!!itemCount && (
        <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
          {itemCount}
        </span>
      )}
    </Button>
  )
}
