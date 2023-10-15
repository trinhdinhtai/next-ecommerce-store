"use client"

import { useTransition } from "react"
import { CartLineItem } from "@/types"

import { catchError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { deleteCartItemAction } from "@/components/cart/actions"
import { Icons } from "@/components/Icons"

interface DeleteItemButtonProps {
  cartItem: CartLineItem
}

export default function DeleteItemButton({ cartItem }: DeleteItemButtonProps) {
  const [_, startTransition] = useTransition()

  const handleRemoveCartItem = async () => {
    startTransition(async () => {
      try {
        await deleteCartItemAction(cartItem.id)
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Button
      aria-label="Remove cart item"
      variant="secondary"
      onClick={handleRemoveCartItem}
      className="h-5 w-5 rounded-full p-0"
    >
      <Icons.delete className="h-4 w-4 text-muted-foreground" />
    </Button>
  )
}
