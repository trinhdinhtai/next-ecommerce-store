import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

import { formatPrice } from "@/lib/formatter"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Shell } from "@/components/ui/shell"
import { CartLineItems } from "@/components/cart-line-items"
import { getCartAction } from "@/components/cart/actions"
import CartItem from "@/components/cart/cart-item"
import Summary from "@/components/cart/summary"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default async function CartPage() {
  const { cartItems, itemCount, totalAmount } = await getCartAction()

  return (
    <Shell>
      <PageHeader
        id="cart-page-header"
        aria-labelledby="cart-page-header-heading"
      >
        <PageHeaderHeading size="sm">Checkout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Checkout with your cart items
        </PageHeaderDescription>
      </PageHeader>

      {!!itemCount ? (
        <div className="grid grid-cols-6 gap-12">
          <div className="col-span-4">
            {cartItems.map((cartItem) => (
              <Fragment key={cartItem.id}>
                <div className="flex w-full items-center gap-x-4">
                  <Checkbox />

                  <CartItem
                    key={cartItem.id}
                    cartItem={cartItem}
                    isEditable={true}
                    variant="default"
                    className="flex-1"
                  />
                </div>

                <Separator />
              </Fragment>
            ))}
          </div>

          <Summary
            cartItems={cartItems}
            totalAmount={totalAmount}
            className="col-span-2"
          />
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <Image
            width={300}
            height={300}
            src="/cart-empty.png"
            alt="cart empty"
          />
          <div className="text-xl font-medium text-muted-foreground">
            Your cart is empty
          </div>

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
        </div>
      )}
    </Shell>
  )
}
