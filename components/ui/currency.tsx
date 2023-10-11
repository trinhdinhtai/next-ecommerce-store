"use client"

import { useEffect, useState } from "react"
import { Decimal } from "@prisma/client/runtime/library"

import { cn } from "@/lib/utils"

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

interface CurrencyProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | number | Decimal
  variant?: "default" | "contained"
}

export default function Currency({
  className,
  value = 0,
  variant = "default",
  ...props
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
        variant === "contained" && "rounded-lg bg-primary text-secondary",
        className
      )}
      {...props}
    >
      {formatter.format(Number(value))}
    </div>
  )
}
