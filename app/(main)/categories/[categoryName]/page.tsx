import { getCategoryProductsAction } from "@/_actions/products"

import { defaultPagination, defaultSort, sortOptions } from "@/lib/constants"
import { toTitleCase } from "@/lib/url"
import { Shell } from "@/components/ui/shell"
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
  const { categoryName } = params
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
    categories: categoryName,
  })

  const pageCount = Math.ceil(count / limit)

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Category</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy ${toTitleCase(categoryName)} from the best stores`}
        </PageHeaderDescription>
      </PageHeader>

      <Products products={products} pageCount={pageCount} />
    </Shell>
  )
}
