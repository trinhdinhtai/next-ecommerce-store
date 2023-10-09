"use client"

import { Category } from "@/types"

import SectionHeading from "@/components/ui/section-heading"
import CategoryCard from "@/components/category/category-card"

interface CategoriesProps {
  categories: Category[]
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <>
      <SectionHeading title="Categories" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  )
}

export default Categories
