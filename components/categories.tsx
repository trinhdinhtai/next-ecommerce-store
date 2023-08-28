import CategoryCard from "@/components/category-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/types";

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="w-full overflow-x-auto flex py-2 gap-6">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
