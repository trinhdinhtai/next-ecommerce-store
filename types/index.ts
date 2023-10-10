import {
  Category as ServerCategory,
  Color as ServerColor,
  Image as ServerImage,
  Product as ServerProduct,
  Size as ServerSize,
} from "@prisma/client"

export type Product = {
  id: ServerProduct["id"]
  name: ServerProduct["name"]
  price: ServerProduct["price"]
  rating: ServerProduct["rating"]
  images: Image[]
  category: {
    id: ServerCategory["id"]
    name: ServerCategory["name"]
  }
  color: {
    id: ServerColor["id"]
    name: ServerColor["name"]
    value: ServerColor["value"]
  }
  size: {
    id: ServerSize["id"]
    name: ServerColor["name"]
    value: ServerColor["value"]
  }
}

export type CategoryProducts = {
  count: number
  products: Product[]
}

export type ProductDetail = ServerProduct & {
  category: Category
  images?: Image[]
  size: Size
  color: Color
}

export type RelatedProduct = {
  id: ServerProduct["id"]
  name: ServerProduct["name"]
  price: ServerProduct["price"]
  images: Image[]
  category: {
    id: ServerCategory["id"]
    name: ServerCategory["name"]
  }
}

export interface Image {
  id: ServerImage["id"]
  url: ServerImage["url"]
}

export interface Billboard {
  id: string
  label: string
  imageUrl: string
}

export interface Category {
  _count: {
    products: number
  }
  id: ServerCategory["id"]
  name: ServerCategory["name"]
  imageUrl: ServerCategory["imageUrl"]
}

export interface Size {
  id: ServerSize["id"]
  name: ServerSize["name"]
  value: ServerSize["value"]
}

export interface Color {
  id: ServerColor["id"]
  name: ServerColor["name"]
  value: ServerColor["value"]
}

export interface Cart {
  id: string
}
