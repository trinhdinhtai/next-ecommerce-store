"use client"

import { Product } from "@/types"

import ProductCard from "@/components/product-card"

interface GridProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[]
}

export default function GridProducts({
  products,
  ...props
}: GridProductsProps) {
  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
