import Image from "next/image"
import Link from "next/link"
import { Category } from "@/types"
import slugify from "slugify"

interface CategoryCardProps {
  category: Category
}

const CategoryLink = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/categories/${slugify(category.name)}`}
      className="flex items-center gap-1"
    >
      <div className="group relative aspect-square w-10 rounded-full bg-secondary">
        <Image
          src={category.imageUrl}
          alt={`${category.name} category`}
          className="rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          fill
          loading="lazy"
        />
      </div>

      <h4 className="font-semibold capitalize">{category.name}</h4>
      <span className="ml-auto text-sm text-muted-foreground">
        {category._count.products}
      </span>
    </Link>
  )
}

export default CategoryLink
