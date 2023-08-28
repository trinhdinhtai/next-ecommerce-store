"use client";

import { Product } from "@/types";
import Image from "next/image";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import IconButton from "./ui/icon-button";
import Currency from "./ui/currency";
import usePreviewModal from "@/hooks/usePreviewModal";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${product?.id}`);
  };

  const handleProductPreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    previewModal.onOpen(product);
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    cart.addItem(product);
  };
  const handleAddToWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    cart.addItem(product);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={product?.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="absolute top-2 right-2 opacity-0 translate-x-2/4 group-hover:opacity-100 group-hover:translate-x-0 transition">
          <div className="flex flex-col gap-2 justify-center">
            <IconButton
              onClick={handleProductPreview}
              icon={<Expand size={18} className="text-gray-600" />}
            />
            <IconButton
              onClick={handleAddToCart}
              icon={<ShoppingCart size={18} className="text-gray-600" />}
            />

            <IconButton
              onClick={handleAddToWishlist}
              icon={<Heart size={18} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-sm text-gray-500">{product.category?.name}</p>
      </div>

      {/* Price & Review */}
      <div className="flex items-center justify-between">
        <Currency value={product?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
