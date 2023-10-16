"use client"

import { MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types"
import { Expand, LucideImage, ShoppingCart } from "lucide-react"

import usePreviewModal from "@/hooks/use-preview-modal"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Currency from "@/components/ui/currency"
import IconButton from "@/components/ui/icon-button"
import RatingStar from "@/components/ui/rating-star"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const previewModal = usePreviewModal()
  const handleAddToCart = (productId: string) => {}

  const handleProductPreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    previewModal.onOpen(product)
  }

  const handleClickAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    handleAddToCart(product.id)
  }

  return (
    <Link href={`/product/${product?.id}`}>
      <Card className="group flex h-full cursor-pointer flex-col rounded-xl">
        <CardHeader className="p-2">
          <div className="relative aspect-square rounded-lg bg-secondary lg:aspect-[4/3]">
            {product?.images?.length ? (
              <Image
                src={product?.images?.[0]?.url}
                alt={product.name}
                fill
                className="aspect-square rounded-lg object-cover transition group-hover:scale-105 "
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-secondary/30">
                <LucideImage
                  className="h-12 w-12 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}

            <div className="absolute right-2 top-2 translate-x-2/4 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
              <div className="flex flex-col justify-center gap-2 text-muted-foreground">
                <IconButton
                  onClick={(event) => handleProductPreview(event)}
                  icon={<Expand size={18} />}
                />

                <IconButton
                  onClick={(event) => handleClickAddToCart(event)}
                  icon={<ShoppingCart size={18} />}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3">
          {/* Description */}
          <div className="space-y-2">
            <p className="line-clamp-2 font-semibold leading-none tracking-tight">
              {product.name}
            </p>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.category?.name}
            </p>
            <RatingStar rating={product.rating} />
          </div>
        </CardContent>

        <CardFooter className="mt-auto p-3">
          <Currency value={product.price} />
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard
