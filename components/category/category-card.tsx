import Image from "next/image"
import Link from "next/link"
import { Category } from "@/types"
import slugify from "slugify"

import { Card } from "@/components/ui/card"

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/categories/${slugify(category.name)}`}>
      <Card className="flex flex-col items-center gap-2 overflow-hidden rounded-md bg-transparent p-6">
        <div className="group relative aspect-square w-20">
          <Image
            src={category.imageUrl}
            alt={`${category.name} category`}
            className="rounded-full border object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            fill
            loading="lazy"
          />
        </div>

        <h4 className="text-lg font-semibold capitalize">{category.name}</h4>
        <span className="text-sm text-muted-foreground">
          {category._count.products} Products
        </span>
      </Card>
    </Link>
  )
}

export default CategoryCard
