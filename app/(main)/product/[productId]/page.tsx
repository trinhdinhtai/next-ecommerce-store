import { Suspense } from "react"
import { notFound } from "next/navigation"

import { Shell } from "@/components/ui/shell"
import ProductCarousel from "@/components/product-carousel"
import ProductDescription from "@/components/product-description"
import RelatedProducts from "@/components/related-products"
import { getProductByIdAction } from "@/app/_actions/product"

interface ProductIdPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductIdPageProps) {
  const product = await getProductByIdAction(params.productId)

  if (!product) return notFound()

  return (
    <Shell>
      <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12 lg:gap-x-12">
        {product?.images && <ProductCarousel images={product.images} />}

        <ProductDescription product={product} />
      </div>
      <hr className="my-10" />
      <Suspense>
        <RelatedProducts productId={product.id} />
      </Suspense>
    </Shell>
  )
}
