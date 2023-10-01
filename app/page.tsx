import { getBillboards } from "@/actions/billboards"
import { getCategories } from "@/actions/categories"
import { getProducts } from "@/actions/products"

import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import Billboard from "@/components/Billboard"
import CategoriesCarousel from "@/components/category/categories-carousel"
import Products from "@/components/product/products"

export const revalidate = 0

const HomePage = async () => {
  const responses = await Promise.all([
    getBillboards(),
    getCategories(),
    getProducts({ isFeatured: true }),
  ])

  const billboards = responses[0]
  const categories = responses[1]
  const products = responses[2]

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard billboards={billboards} />
        <CategoriesCarousel categories={categories} />
        <SectionHeading title="New Products" />
        <Products title="New Products" products={products} />
      </div>
    </Container>
  )
}

export default HomePage
