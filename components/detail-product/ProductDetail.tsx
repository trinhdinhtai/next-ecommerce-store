import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types"
import { FaStar } from "react-icons/fa"

const ProductDetail = ({ products }: any) => {
  return (
    <div className="m-4 grid gap-4 rounded-md sm:grid-cols-1 md:grid-cols-4">
      {products.map((product: any) => (
        <Link href="/" className="rounded-md border p-3" key={product.id}>
          <div className="product">
            <div className="relative w-full overflow-hidden rounded">
              <Image
                src={product.images[0].url}
                width={800}
                height={800}
                alt="product"
                className="rounded object-contain"
              />
            </div>

            <div className="content">
              <div className="my-1 text-sm">{product.name}</div>
              <div className="product-bill my-1">
                <div className="text-red-500">34.999.000đ</div>
              </div>

              <div className="product-start my-1 flex items-center justify-between">
                <div className="flex">
                  <FaStar className="text-[#FF9529]" />
                  <FaStar className="text-[#FF9529]" />
                  <FaStar className="text-[#FF9529]" />
                  <FaStar className="text-[#FF9529]" />
                  <FaStar className="text-[#FF9529]" />
                </div>
                <div className="text-sm">Đã bán(62)</div>
              </div>

              <div className="my-1 text-sm font-light">TP Hồ Chí Minh</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductDetail
