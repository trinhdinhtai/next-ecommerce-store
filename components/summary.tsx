"use client"

import { useState } from "react"
import { CartLineItem } from "@/types"
import axios from "axios"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import Currency from "@/components/ui/currency"
import LoadingButton from "@/components/loading-button"

interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  cartId: string
  cartItems: CartLineItem[]
  totalAmount: number
}

const Summary = ({
  className,
  cartId,
  cartItems,
  totalAmount,
}: SummaryProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(`/api/${cartId}/checkout`)
      window.location.assign(response.data.url)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
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
        <LoadingButton
          className={cn(
            "mt-6 w-full",
            cartItems.length === 0 && "pointer-events-none cursor-not-allowed"
          )}
          dotClassName="mr-2"
          onClick={handleCheckout}
          isLoading={isLoading}
        >
          Checkout
        </LoadingButton>
      </div>
    </div>
  )
}

export default Summary
