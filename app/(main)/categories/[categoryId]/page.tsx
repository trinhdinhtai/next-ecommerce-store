import { getProducts } from "@/actions/products"

import Container from "@/components/ui/container"
import NavbarSearchProduct from "@/components/detail-product/NavbarSearchProduct"
import ProductDetail from "@/components/detail-product/ProductDetail"

const CategoriesPage = async () => {
  const responses = await Promise.all([getProducts({ isFeatured: true })])
  const products = responses[0]

  return (
    <Container>
      <div className="mt-4 flex flex-wrap">
        <div className="w-full md:w-1/5">
          <NavbarSearchProduct />
        </div>

        <div className="w-full md:w-4/5">
          <ProductDetail products={products} />
        </div>
      </div>
    </Container>
  )
}

export default CategoriesPage
