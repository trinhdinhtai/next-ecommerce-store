"use client"

import { useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"

import { useQueryString } from "@/hooks/use-query-string"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const MAX_PRICE = 500

export default function PriceRange() {
  const router = useRouter()
  const pathname = usePathname()
  const { createQueryString } = useQueryString()
  const [isPending, startTransition] = useTransition()

  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE])

  const handlePriceRangeSearch = () => {
    startTransition(() => {
      const [min, max] = priceRange
      const queryString = createQueryString({ price_range: `${min}-${max}` })
      router.push(`${pathname}?${queryString}`, { scroll: false })
      console.log(
        "🚀 ~ file: price-range.tsx:25 ~ startTransition ~ queryString:",
        queryString
      )
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium tracking-wide text-foreground">
        Price range ($)
      </h3>

      <div className="flex items-center space-x-4">
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          max={priceRange[1]}
          className="h-9"
          value={priceRange[0]}
          onChange={(e) => {
            const value = Number(e.target.value)
            setPriceRange([value, priceRange[1]])
          }}
          disabled={isPending}
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="number"
          inputMode="numeric"
          min={priceRange[0]}
          max={500}
          className="h-9"
          value={priceRange[1]}
          onChange={(e) => {
            const value = Number(e.target.value)
            setPriceRange([priceRange[0], value])
          }}
          disabled={isPending}
        />
      </div>

      <Button
        className="w-full"
        variant="outline"
        onClick={handlePriceRangeSearch}
        disabled={isPending}
      >
        Apply
      </Button>
    </div>
  )
}
