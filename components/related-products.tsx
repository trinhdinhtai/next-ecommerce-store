import { getProductRecommendations } from "@/actions/products"

import NoResults from "@/components/no-results"
import ProductCard from "@/components/product/product-card"

type RelatedProductsProps = {
  productId: string
  categoryId: string
}

export default async function RelatedProducts({
  productId,
  categoryId,
}: RelatedProductsProps) {
  const relatedProducts = await getProductRecommendations({
    productId,
    categoryId,
  })

  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">Related Items</h3>
      {relatedProducts?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
    </div>
  )
}
