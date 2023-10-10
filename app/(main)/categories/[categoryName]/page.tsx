import { getCategoryProductsAction } from "@/_actions/products"

import { defaultPagination, defaultSort, sortOptions } from "@/lib/constants"
import { unSlugify } from "@/lib/url"
import PriceRangeSlider from "@/components/ui/price-range-slider"
import { Separator } from "@/components/ui/separator"
import { Shell } from "@/components/ui/shell"
import FilterBar from "@/components/FilterBar"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import Products from "@/components/products"

interface CategoryIdPageProps {
  params: { categoryName: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryIdPage({
  params,
  searchParams,
}: CategoryIdPageProps) {
  const { categoryName: categorySlug } = params
  const { page, per_page, sort } = searchParams as { [key: string]: string }
  const { sortKey, reverse } =
    sortOptions.find((item) => item.slug === sort) || defaultSort

  const limit =
    typeof per_page === "string"
      ? parseInt(per_page)
      : defaultPagination.pageSize
  const offset =
    typeof page === "string"
      ? (parseInt(page) - 1) * limit
      : defaultPagination.currentPage

  const { count, products } = await getCategoryProductsAction({
    limit,
    offset,
    categories: categorySlug,
  })

  const pageCount = Math.ceil(count / limit)

  const categoryName = unSlugify(categorySlug)

  return (
    <Shell>
      <div className="flex gap-12">
        <div className="order-first w-full flex-none md:max-w-[225px]">
          <h2 className="text-lg font-semibold text-foreground">Filter</h2>
          <Separator />

          <div className="mt-8 flex flex-col gap-8">
            <PriceRangeSlider />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <PageHeader>
            <PageHeaderHeading size="sm">{categoryName}</PageHeaderHeading>
            <PageHeaderDescription size="sm">
              {`Buy the best ${categoryName}`}
            </PageHeaderDescription>
          </PageHeader>

          <FilterBar />
          <Products products={products} pageCount={pageCount} />
        </div>
      </div>
    </Shell>
  )
}
