import React from "react"
import { BiCategoryAlt } from "react-icons/bi"

const ProductFilterItem = ({ title, isBorder = true, data }: any) => {
  return (
    <ul className="mb-4">
      <h2 className="flex items-center font-normal">
        <BiCategoryAlt className="text-[#ccc]" />
        <span className="ml-1">{title}</span>
      </h2>
      {data.map((item: any) => (
        <li className="py-1" key={item.id}>
          <label htmlFor={item.name} className="flex items-center">
            <input type="checkbox" name="item1" id={item.name} />
            <span className="mx-1 text-sm font-light leading-relaxed">
              {item.name}
            </span>
          </label>
        </li>
      ))}

      {isBorder && <div className="mt-3 border-b"></div>}
    </ul>
  )
}

export default ProductFilterItem
