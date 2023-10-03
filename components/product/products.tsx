import { Product } from "@/types"

import SectionHeading from "@/components/ui/section-heading"
import ProductCard from "@/components/product/product-card"

import NoResults from "../no-results"

interface ProductListProps {
  products: Product[]
}

const Products = ({ products }: ProductListProps) => {
  return (
    <>
      <SectionHeading title="New Products" />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {products?.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </>
  )
}

export default Products
