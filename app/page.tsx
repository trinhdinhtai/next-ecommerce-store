import { getBillboards } from "@/actions/billboards"
import { getCategories } from "@/actions/categories"
import { getProducts } from "@/actions/products"

import { Shell } from "@/components/ui/shell"
import Billboard from "@/components/billboard"
import Categories from "@/components/category/categories"
import Products from "@/components/product/products"

export const revalidate = 0

export default async function HomePage() {
  const responses = await Promise.all([
    getBillboards(),
    getCategories(),
    getProducts({ isFeatured: true }),
  ])

  const billboards = responses[0]
  const categories = responses[1]
  const products = responses[2]

  return (
    <>
      <Billboard billboards={billboards} />
      <Categories categories={categories} />
      <Products products={products} />
    </>
  )
}
