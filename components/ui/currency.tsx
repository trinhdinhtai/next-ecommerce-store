"use client"

import { useEffect, useState } from "react"
import { Decimal } from "@prisma/client/runtime/library"

import { cn } from "@/lib/utils"

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

interface CurrencyProps {
  value?: string | number | Decimal
  variant?: "default" | "contained"
}

export default function Currency({
  value = 0,
  variant = "default",
}: CurrencyProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={cn(
        "w-fit font-semibold",
        variant === "contained" &&
          "rounded-lg bg-primary px-2 py-1 text-secondary"
      )}
    >
      {formatter.format(Number(value))}
    </div>
  )
}
