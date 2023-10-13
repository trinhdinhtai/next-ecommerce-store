"use client"

import { useId, useTransition } from "react"
import { CartLineItem } from "@/types"

import { catchError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/Icons"

interface EditableCartItemProps {
  cartLineItem: CartLineItem
}

export default function EditableCartItem({
  cartLineItem,
}: EditableCartItemProps) {
  const id = useId()
  const [isPending, startTransition] = useTransition()

  const handleDecrement = () => {
    startTransition(async () => {
      try {
        // TODO: Implement updateCartItemAction
      } catch (err) {
        catchError(err)
      }
    })
  }

  const handleIncrement = () => {
    startTransition(async () => {
      try {
        // TODO: Implement updateCartItemAction
      } catch (err) {
        catchError(err)
      }
    })
  }

  const handleInputChange = () => {
    startTransition(async () => {
      try {
        // TODO: Implement updateCartItemAction
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <div className="flex w-full items-center justify-between space-x-2 sm:w-auto sm:justify-normal">
      <div className="flex items-center">
        <Button
          id={`${id}-decrement`}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={handleDecrement}
          disabled={isPending}
        >
          <Icons.minus className="h-4 w-4" aria-hidden="true" />
        </Button>

        <Input
          id={`${id}-quantity`}
          type="number"
          min="0"
          className="h-8 w-14 rounded-none border-x-0"
          value={cartLineItem.quantity}
          onChange={handleInputChange}
          disabled={isPending}
        />

        <Button
          id={`${id}-increment`}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={handleIncrement}
          disabled={isPending}
        >
          <Icons.plus className="h-3 w-3" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
