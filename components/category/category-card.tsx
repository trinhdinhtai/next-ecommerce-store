import Link from "next/link"
import { Category } from "@/types"

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="min-w-[350px] rounded-lg border p-6">
      <div className="flex w-full gap-6">
        <div className="aspect-square w-14 rounded-sm border border-[#cccccc] bg-gray-100"></div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{category.name}</h4>
            <span className="text-xs text-muted-foreground">(53)</span>
          </div>
          <Link href={`categories/${category.id}`} className="text-sm">
            Show All
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
