import {
  Category as DBCategory,
  Color as DBColor,
  Image as DBImage,
  Product as DBProduct,
  Size as DBSize,
} from "@prisma/client"

export type NewProduct = {
  id: DBProduct["id"]
  name: DBProduct["name"]
  price: DBProduct["price"]
  images: Image[]
  category: {
    id: DBCategory["id"]
    name: DBCategory["name"]
  }
}

export type ProductDetail = DBProduct & {
  category: Category
  images?: Image[]
  size: Size
  color: Color
}

export type RelatedProduct = {
  id: DBProduct["id"]
  name: DBProduct["name"]
  price: DBProduct["price"]
  images: Image[]
  category: {
    id: DBCategory["id"]
    name: DBCategory["name"]
  }
}

export interface Image {
  id: DBImage["id"]
  url: DBImage["url"]
}

export interface Billboard {
  id: string
  label: string
  imageUrl: string
}

export interface Category {
  id: DBCategory["id"]
  name: DBCategory["name"]
  imageUrl: DBCategory["imageUrl"]
}

export interface Size {
  id: DBSize["id"]
  name: DBSize["name"]
  value: DBSize["value"]
}

export interface Color {
  id: DBColor["id"]
  name: DBColor["name"]
  value: DBColor["value"]
}

export interface Cart {
  id: string
}
