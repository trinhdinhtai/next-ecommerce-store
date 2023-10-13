"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { CartLineItem } from "@/types"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/Icons"

interface DeleteItemButtonProps {
  cartItem: CartLineItem
}

export default function DeleteItemButton({ cartItem }: DeleteItemButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRemoveCartItem = () => {}

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
