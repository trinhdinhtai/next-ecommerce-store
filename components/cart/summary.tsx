"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import useCartItem from "@/hooks/use-cart-item"
import { Button } from "@/components/ui/button"
import Currency from "@/components/ui/currency"

const Summary = () => {
  const searchParams = useSearchParams()
  const items = useCartItem((state) => state.items)
  const removeAll = useCartItem((state) => state.removeAll)

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.")
      removeAll()
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.")
    }
  }, [searchParams, removeAll])

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    )

    window.location = response.data.url
  }

  return (
    <div className="mt-16 rounded-lg bg-secondary/60 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="mt-6 w-full"
      >
        Checkout
      </Button>
    </div>
  )
}

export default Summary
