import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { formatPrice } from "@/lib/formatter"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartLineItems from "@/components/cart-line-items"
import { getCartAction } from "@/app/_actions/cart"

export default async function CartButton() {
  const cartResponse = await getCartAction()

  const { cartItems, itemCount, totalAmount } = cartResponse ?? {}

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative px-3">
          <ShoppingCart size={24} />

          {!!itemCount && (
            <div
              className={cn(
                "absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[12px] text-destructive-foreground",
                itemCount > 9 && "text-[10px]",
                itemCount > 99 && "text-[8px]"
              )}
            >
              <span>{itemCount > 99 ? "99+" : itemCount}</span>
            </div>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {itemCount ? `(${itemCount})` : ""}</SheetTitle>
          <Separator />
        </SheetHeader>

        {cartItems?.length ? (
          <>
            <CartLineItems cartItems={cartItems} className="flex-1" />

            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  {totalAmount && (
                    <span>{formatPrice(totalAmount.toFixed(2))}</span>
                  )}
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    aria-label="View your cart"
                    href="/cart"
                    className={buttonVariants({
                      size: "sm",
                      className: "w-full",
                    })}
                  >
                    Continue to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Image
              width={300}
              height={300}
              src="/images/cart-empty.png"
              alt="cart empty"
            />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
            <SheetTrigger asChild>
              <Link
                aria-label="Add items to your cart to checkout"
                href="/"
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-sm text-muted-foreground",
                  })
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
