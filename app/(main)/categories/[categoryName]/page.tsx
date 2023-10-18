import { defaultPagination, defaultSort, sortOptions } from "@/lib/constants"
import { unSlugify } from "@/lib/url"
import { Separator } from "@/components/ui/separator"
import { Shell } from "@/components/ui/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import PriceRange from "@/components/price-range"
import Products from "@/components/products"
import SortFilterItemList from "@/components/sort-filter-item-list"
import { getCategoryProductsAction } from "@/app/_actions/product"

interface CategoryIdPageProps {
  params: { categoryName: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryIdPage({
  params,
  searchParams,
}: CategoryIdPageProps) {
  const { categoryName: categorySlug } = params
  const { page, per_page, sort, price_range } = searchParams as {
    [key: string]: string
  }
  const { sortKey, value: sortValue } =
    sortOptions.find((item) => item.slug === sort) ?? defaultSort

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
    sortKey,
    sortValue,
    categories: categorySlug,
    price_range,
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
            <PriceRange />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <PageHeader>
            <PageHeaderHeading size="sm">{categoryName}</PageHeaderHeading>
            <PageHeaderDescription size="sm">
              {`Buy the best ${categoryName}`}
            </PageHeaderDescription>
          </PageHeader>

          <SortFilterItemList />

          {products.length ? (
            <Products products={products} pageCount={pageCount} />
          ) : (
            <div className="mx-auto flex max-w-xs flex-1 flex-col space-y-1.5">
              <h1 className="text-center text-2xl font-bold">
                No products found
              </h1>
              <p className="text-center text-muted-foreground">
                Try changing your filters, or check back later for new products
              </p>
            </div>
          )}
        </div>
      </div>
    </Shell>
  )
}
