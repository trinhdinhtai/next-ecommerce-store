"use client"

import { ChangeEvent, useId, useState, useTransition } from "react"
import { CartLineItem } from "@/types"

import { catchError } from "@/lib/utils"
import useCartItem from "@/hooks/use-cart-item"
import { Input } from "@/components/ui/input"
import {
  decreaseProductQuantityAction,
  updateProductQuantityAction,
} from "@/components/cart/actions"
import { Icons } from "@/components/Icons"
import LoadingButton from "@/components/loading-button"

interface EditableCartItemProps {
  cartLineItem: CartLineItem
}

export default function EditCartItemQuantity({
  cartLineItem,
}: EditableCartItemProps) {
  const id = useId()
  const [isPending, startTransition] = useTransition()
  const { isIncreasePending, handleIncrement } = useCartItem()

  const handleDecrement = () => {
    startTransition(async () => {
      try {
        await decreaseProductQuantityAction(
          cartLineItem.quantity,
          cartLineItem.id
        )
      } catch (err) {
        catchError(err)
      }
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      try {
        await updateProductQuantityAction({
          cartItemId: cartLineItem.id,
          quantity: Number(event.target.value),
        })
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <div className="flex w-full items-center justify-between space-x-2 sm:w-auto sm:justify-normal">
      <div className="flex items-center">
        <LoadingButton
          id={`${id}-decrement`}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          dotClassName="bg-primary"
          onClick={handleDecrement}
          isLoading={isPending}
          icon={<Icons.minus className="h-4 w-4" />}
        />

        <Input
          id={`${id}-quantity`}
          type="number"
          min="0"
          className="h-8 w-14 rounded-none border-x-0"
          value={cartLineItem.quantity}
          onChange={(event) => handleInputChange(event)}
          disabled={isPending}
        />

        <LoadingButton
          id={`${id}-increment`}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          dotClassName="bg-primary"
          onClick={() => handleIncrement(cartLineItem.id)}
          isLoading={isIncreasePending}
          icon={<Icons.plus className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
