"use client"

import { Category } from "@/types"

import { Card } from "@/components/ui/card"
import CategoryLink from "@/components/category/category-link"

interface CategoriesProps {
  categories: Category[]
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      {categories.map((category) => (
        <CategoryLink key={category.id} category={category} />
      ))}
    </Card>
  )
}

export default Categories
