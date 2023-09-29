import { Product } from "@/types"

import NoResults from "@/components/no-results"
import ProductCard from "@/components/product/product-card"

type SuggestProductsProps = {
  title: string
  products: Product[]
}

const SuggestProducts = ({ title, products }: SuggestProductsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">{title}</h3>
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
  )
}

export default SuggestProducts
