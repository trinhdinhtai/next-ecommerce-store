export type SortFilterItem = {
  title: string
  slug: string | null
  sortKey: "createdAt" | "price"
  value: "asc" | "desc"
}

export const defaultSort: SortFilterItem = {
  title: "Latest arrivals",
  slug: null,
  sortKey: "createdAt",
  value: "desc",
}

export const sortOptions: SortFilterItem[] = [
  defaultSort,
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "price",
    value: "asc",
  },
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "price",
    value: "desc",
  },
]

export const defaultPagination = {
  currentPage: 0,
  pageSize: 8,
}

export const defaultPage = "1"
