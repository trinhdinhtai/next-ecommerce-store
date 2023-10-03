"use client"

import { Product } from "@/types"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import Currency from "@/components/ui/currency"

import StarRating from "../ui/rating-star"
import AddToCard from "./add-to-cart"

interface ProductDescriptionProps {
  product: Product
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
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

        <StarRating rating={Math.floor(Math.random() * 5 + 1)} />
      </div>

      <div className="mt-6 flex items-center gap-x-3">
        <AddToCard />
      </div>
    </div>
  )
}

export default ProductDescription
