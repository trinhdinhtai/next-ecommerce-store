import { Product } from "@/types";
import NoResults from "./NoResults";
import ProductCard from "./ProductCard";

interface ProductListProps {
  title: string;
  products: Product[];
}

const Products = ({ title, products }: ProductListProps) => {
  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
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
    </div>
  );
};

export default Products;
