"use client"

import { Product } from "@/types"

import Currency from "@/components/ui/currency"
import RatingStar from "@/components/ui/rating-star"

interface ProductDescriptionProps {
  product: Product
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <div className="md:col-span-7">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">{product.name}</h1>

        <Currency value={product?.price} variant="contained" />

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Size:</h3>
          <div>{product?.size?.value}</div>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: product?.color?.value }}
          />
        </div>

        <RatingStar rating={product.rating} />
      </div>

      <div className="mt-6 flex items-center gap-x-3"></div>
    </div>
  )
}
