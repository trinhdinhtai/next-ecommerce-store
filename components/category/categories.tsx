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
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex w-full gap-6 overflow-x-auto py-2">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories
