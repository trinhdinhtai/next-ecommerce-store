import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Shell } from "@/components/ui/shell"
import CartCheckoutItems from "@/components/cart-checkout-items"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { getCartAction } from "@/app/_actions/cart"

export default async function CartPage() {
  const cartResponse = await getCartAction()

  if (!cartResponse) return notFound()

  const { id, cartItems, itemCount, totalAmount } = cartResponse

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

      {itemCount ? (
        <CartCheckoutItems
          cartId={id}
          cartItems={cartItems}
          totalAmount={totalAmount}
        />
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
