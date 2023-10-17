"use client"

import { CartLineItem } from "@/types"

import { Separator } from "@/components/ui/separator"
import CartItem from "@/components/cart-item"
import Summary from "@/components/summary"

interface CartCheckoutItemProps {
  cartId: string
  cartItems: CartLineItem[]
  totalAmount: number
}

export default function CartCheckoutItems({
  cartId,
  cartItems,
  totalAmount,
}: CartCheckoutItemProps) {
  return (
    <div className="grid grid-cols-6 gap-12">
      <div className="col-span-4">
        {cartItems.map((cartItem) => (
          <>
            <div className="flex w-full items-center gap-x-4">
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                isEditable={true}
                variant="default"
                className="flex-1"
              />
            </div>

            <Separator />
          </>
        ))}
      </div>

      <Summary
        cartItems={cartItems}
        totalAmount={totalAmount}
        className="col-span-2"
      />
    </div>
  )
}
