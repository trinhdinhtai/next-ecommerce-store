"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useDebounce } from "@/hooks/use-debounce"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const MAX_PRICE = 500
const PRICE_STEP = 1

export default function PriceRangeSlider() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE])
  const debouncedPrice = useDebounce(priceRange, MAX_PRICE)

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    const [min, max] = debouncedPrice
    const queryString = createQueryString({ price_range: `${min}-${max}` })
    router.push(`${pathname}?${queryString}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice])

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium tracking-wide text-foreground">
        Price range ($)
      </h3>

      <Slider
        variant="range"
        thickness="thin"
        defaultValue={[0, MAX_PRICE]}
        max={MAX_PRICE}
        step={PRICE_STEP}
        value={priceRange}
        onValueChange={(value: typeof priceRange) => setPriceRange(value)}
      />

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
        />
      </div>
    </div>
  )
}
