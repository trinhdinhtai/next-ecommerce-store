"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart, User } from "lucide-react"

import useCart from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const NavbarActions = () => {
  const router = useRouter()
  const cart = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
      <ThemeToggle />

      <Button
        variant="ghost"
        className="relative px-3"
        onClick={() => router.push("/cart")}
      >
        <ShoppingCart size={24} />
        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
          {cart.items.length}
        </span>
      </Button>
      <Button
        variant="ghost"
        className="relative px-3"
        onClick={() => router.push("/wishlist")}
      >
        <Heart size={24} />
        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
          {0}
        </span>
      </Button>
      <Button variant="ghost" className="px-3">
        <User size={24} />
      </Button>
    </div>
  )
}

export default NavbarActions
