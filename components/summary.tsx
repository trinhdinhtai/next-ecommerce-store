import Link from "next/link"
import { CartLineItem } from "@/types"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Currency from "@/components/ui/currency"

interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItems: CartLineItem[]
  totalAmount: number
}

const Summary = ({ className, cartItems, totalAmount }: SummaryProps) => {
  return (
    <div className={className}>
      <div className="rounded-lg bg-secondary/60 px-4 py-6">
        <h2 className="text-lg font-medium">Order summary</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium">Order total</div>
            <Currency value={totalAmount} />
          </div>
        </div>
        <Link
          href={`/checkout`}
          className={cn(
            buttonVariants(),
            "mt-6 w-full",
            cartItems.length === 0 && "pointer-events-none cursor-not-allowed"
          )}
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default Summary
