"use client"

import { useSearchParams } from "next/navigation"
import { Product } from "@/types"

import { defaultPage, defaultSort, sortOptions } from "@/lib/constants"
import PaginationButton from "@/components/pagination-button"
import ProductCard from "@/components/product/product-card"

interface ProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[]
  pageCount: number
}

export default function Products({
  products,
  pageCount,
  ...props
}: ProductsProps) {
  const searchParams = useSearchParams()

  // Search params
  const page = searchParams?.get("page") ?? defaultPage
  const sort = searchParams?.get("sort") ?? defaultSort.slug

  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length ? (
        <PaginationButton pageCount={pageCount} page={page} />
      ) : null}
    </section>
  )
}
