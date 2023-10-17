"use client"

import { useTransition } from "react"
import { CartLineItem } from "@/types"
import { X } from "lucide-react"

import { catchError } from "@/lib/error"
import { Button } from "@/components/ui/button"
import { deleteCartItemAction } from "@/app/_actions/cart"

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
      <X className="h-4 w-4 text-muted-foreground" />
    </Button>
  )
}
