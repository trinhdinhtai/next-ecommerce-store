"use client"

import { useState } from "react"

import { useDebounce } from "@/hooks/use-debounce"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export default function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const debouncedPrice = useDebounce(priceRange, 500)

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium tracking-wide text-foreground">
        Price range ($)
      </h3>

      <Slider
        variant="range"
        thickness="thin"
        defaultValue={[0, 500]}
        max={500}
        step={1}
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
