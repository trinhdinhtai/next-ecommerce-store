"use client";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const handleAddToCart = () => {};

  return (
    <div className="md:col-span-7">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>

        <Currency value={product?.price} variant="contained" />

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{product?.size?.value}</div>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: product?.color?.value }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-x-3">
        <Button onClick={handleAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
