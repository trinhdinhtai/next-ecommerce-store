import { Shell } from "@/components/ui/shell"
import Billboard from "@/components/billboards"
import Categories from "@/components/categories"
import { getBillboardsAction } from "@/app/_actions/billboard"
import { getCategoriesAction } from "@/app/_actions/category"
import { getNewProductsAction } from "@/app/_actions/product"

export default async function HomePage() {
  const responses = await Promise.all([
    getBillboardsAction(),
    getCategoriesAction(),
    getNewProductsAction(),
  ])

  const billboards = responses[0]
  const categories = responses[1]
  return (
    <Shell>
      <Billboard billboards={billboards} />

      <div className="flex flex-col gap-12 md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[225px]">
          <Categories categories={categories} />
        </div>
      </div>
    </Shell>
  )
}
