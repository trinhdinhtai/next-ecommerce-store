"use client"

import { CartLineItem } from "@/types"
import axios from "axios"

import { Button } from "@/components/ui/button"
import Currency from "@/components/ui/currency"

interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItems: CartLineItem[]
  totalAmount: number
}

const Summary = ({ className, cartItems, totalAmount }: SummaryProps) => {
  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: cartItems.map((item) => item.productId),
      }
    )

    window.location = response.data.url
  }

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
        <Button
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className="mt-6 w-full"
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}

export default Summary
