import { getCategoryProducts } from "@/actions/products"

import { defaultSort, sortOptions } from "@/lib/constants"
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
  const { colorId, sizeId, sort } = searchParams as { [key: string]: string }
  const { sortKey, reverse } =
    sortOptions.find((item) => item.slug === sort) || defaultSort

  const products = await getCategoryProducts({})

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Category</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy ${toTitleCase(params.categoryName)} from the best stores`}
        </PageHeaderDescription>
      </PageHeader>

      <Products products={products} />
    </Shell>
  )
}
