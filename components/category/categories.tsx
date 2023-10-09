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

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-3 lg:grid-cols-4 lg:p-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  )
}

export default Categories
