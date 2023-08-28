import { Category } from "@/types";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="min-w-[350px] border rounded-lg p-6">
      <div className="flex w-full gap-6">
        <div className="aspect-square bg-gray-100 w-14 rounded-sm border border-[#cccccc]"></div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{category.name}</h4>
            <span className="text-muted-foreground text-xs">(53)</span>
          </div>
          <Link href={`${category.name}`} className="text-sm">
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
