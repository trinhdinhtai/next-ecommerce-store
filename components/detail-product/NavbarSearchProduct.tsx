import React from "react"
import { MdFilterList } from "react-icons/md"

import ProductFilterItem from "./ProductFilterItem"

const categories = [
  {
    title: "Theo danh mục",
    isFilter: true,
    data: [
      { id: "1", name: "Áo khoác mùa đông", quantity: 334 },
      { id: "2", name: "Áo khoác ngoài", quantity: 165 },
      { id: "3", name: "Áo blazer", quantity: 61 },
      { id: "4", name: "Hoodie và áo nỉ", quantity: 113 },
    ],
  },
]

const address = [
  {
    title: "Nơi bán",
    isFilter: true,
    data: [
      { id: "1", name: "Hà Nội" },
      { id: "2", name: "TP. Hồ Chí Mịnh" },
      { id: "3", name: "Thái Nguyên" },
      { id: "4", name: "Vĩnh Phúc" },
      { id: "5", name: "Bắc Giang" },
      { id: "6", name: "Nam Định" },
      { id: "7", name: "Hà Nam" },
    ],
  },
]

const ship = [
  {
    title: "Đơn vị vận chuyển",
    isFilter: true,
    data: [
      { id: "1", name: "Hỏa Tốc" },
      { id: "2", name: "Nhanh" },
      { id: "3", name: "Tiết Kiệm" },
    ],
  },
]

const NavbarSearchProduct = () => {
  return (
    <div className="m-4 rounded-md border p-2">
      <h1 className="mb-3 flex items-center font-medium text-[#FF9529]">
        <MdFilterList />
        <span className="ml-2 uppercase">Bộ lọc tìm kiếm</span>
      </h1>

      <ProductFilterItem title="Theo danh mục" data={categories[0].data} />
      <ProductFilterItem title="Nơi bán" data={address[0].data} />
      <ProductFilterItem title="Địa chỉ" data={ship[0].data} isBorder={false} />
    </div>
  )
}

export default NavbarSearchProduct
