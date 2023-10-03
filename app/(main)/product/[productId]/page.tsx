import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getProductById } from "@/actions/products"

import Container from "@/components/ui/container"
import ProductDetailsCarousel from "@/components/product/product-detail-carousel"
import ProductInfo from "@/components/product/product-info"
import RelatedProducts from "@/components/related-products"

interface ProductIdPageProps {
  params: {
    productId: string
  }
}

export default async function ProductIdPage({ params }: ProductIdPageProps) {
  const product = await getProductById(params.productId)

  if (!product) return notFound()

  return (
    <div>
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12 lg:gap-x-12">
            <ProductDetailsCarousel images={product.images} />
            <ProductInfo product={product} />
          </div>
          <hr className="my-10" />
          <Suspense>
            <RelatedProducts
              productId={product.id}
              categoryId={product.category.id}
            />
          </Suspense>
        </div>
      </Container>
    </div>
  )
}
