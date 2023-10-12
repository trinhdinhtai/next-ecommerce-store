import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartLineItems } from "@/components/cart-line-items"
import { getCartAction } from "@/components/cart/actions"

export default async function CartButton() {
  const { cartItems, itemCount, totalAmount } = await getCartAction()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative px-3">
          <ShoppingCart size={24} />

          {!!itemCount && (
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
          <Separator />
        </SheetHeader>

        {!!itemCount ? (
          <>
            <CartLineItems cartItems={cartItems} className="flex-1" />
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
