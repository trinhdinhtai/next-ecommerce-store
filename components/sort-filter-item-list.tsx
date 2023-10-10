"use client"

import { sortOptions } from "@/lib/constants"
import SortFilterItem from "@/components/sort-filter-item"

export default function SortFilterItemList() {
  return (
    <section className="sticky top-[68px] z-50 w-full shrink-0 overflow-hidden">
      <div className="flex gap-4">
        {sortOptions.map((option) => (
          <SortFilterItem key={option.slug} item={option} />
        ))}
      </div>
    </section>
  )
}
