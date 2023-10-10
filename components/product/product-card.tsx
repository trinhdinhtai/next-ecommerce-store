"use client"

import { MouseEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "@/types"
import { Expand, Heart, ShoppingCart } from "lucide-react"

import useCart from "@/hooks/use-cart"
import usePreviewModal from "@/hooks/use-preview-modal"
import IconButton from "@/components/ui/icon-button"
import { Icons } from "@/components/Icons"

import Currency from "../ui/currency"
import StarRating from "../ui/rating-star"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()
  const previewModal = usePreviewModal()
  const cart = useCart()

  const handleClick = () => {
    router.push(`/product/${product?.id}`)
  }

  const handleProductPreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    previewModal.onOpen(product)
  }

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    cart.addItem(product)
  }
  const handleAddToWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    cart.addItem(product)
  }

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer flex-col gap-4 rounded-xl border p-3"
    >
      <div className="relative aspect-square rounded-xl lg:aspect-[4/3]">
        {product?.images?.length ? (
          <Image
            src={product?.images?.[0]?.url}
            alt={product.name}
            fill
            className="aspect-square rounded-lg object-cover transition group-hover:scale-105 "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-secondary/30">
            <Icons.placeholder
              className="h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="absolute right-2 top-2 translate-x-2/4 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
          <div className="flex flex-col justify-center gap-2 text-muted-foreground">
            <IconButton
              onClick={handleProductPreview}
              icon={<Expand size={18} />}
            />
            <IconButton
              onClick={handleAddToCart}
              icon={<ShoppingCart size={18} />}
            />

            <IconButton
              onClick={handleAddToWishlist}
              icon={<Heart size={18} />}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="line-clamp-2 font-semibold leading-none tracking-tight">
          {product.name}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.category?.name}
        </p>
        <StarRating rating={product.rating} />
      </div>

      {/* Price & Review */}
      <div className="mt-auto">
        <Currency value={product?.price} />
      </div>
    </div>
  )
}

export default ProductCard
