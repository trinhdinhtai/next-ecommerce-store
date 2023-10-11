import { getBillboardsAction } from "@/_actions/billboards"
import { getCategoriesAction } from "@/_actions/categories"
import { getNewProductsAction } from "@/_actions/products"

import { Shell } from "@/components/ui/shell"
import Billboard from "@/components/billboard"
import Categories from "@/components/category/categories"
import Products from "@/components/product/products"

export const revalidate = 0

export default async function HomePage() {
  const responses = await Promise.all([
    getBillboardsAction(),
    getCategoriesAction(),
    getNewProductsAction(),
  ])

  const billboards = responses[0]
  const categories = responses[1]
  const products = responses[2]

  return (
    <Shell>
      <Billboard billboards={billboards} />
      <div className="flex gap-12">
        <div className="order-first w-full flex-none md:max-w-[225px]">
          <Categories categories={categories} />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <Products products={products} />
        </div>
      </div>
    </Shell>
  )
}
