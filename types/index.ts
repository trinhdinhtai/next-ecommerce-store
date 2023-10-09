export interface Product {
  id: string
  category: Category
  name: string
  price: string
  isFeatured: boolean
  size: Size
  color: Color
  images: Image[]
}

export interface CategoryProducts {
  count: number
  products: Product[]
}

export interface Image {
  id: string
  url: string
}

export interface Billboard {
  id: string
  label: string
  imageUrl: string
}

export interface Category {
  id: string
  name: string
  imageUrl: string
  _count: {
    products: number
  }
}

export interface Size {
  id: string
  name: string
  value: string
}

export interface Color {
  id: string
  name: string
  value: string
}

export interface Cart {
  id: string
}
