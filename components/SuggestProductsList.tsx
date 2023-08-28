import NoResults from "@/components/NoResults";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

type SuggestProductsListProps = {
  title: string;
  products: Product[];
};

const SuggestProductsList = ({ title, products }: SuggestProductsListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {products?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default SuggestProductsList;
