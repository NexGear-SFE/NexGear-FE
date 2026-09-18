export interface ProductSpec {
  label: string
  value: string
  icon?: string
}

export type ProductCategory = 'pc' | 'laptop' | 'gear' | 'screen'

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  category: ProductCategory
  specs: ProductSpec[]
  inStock: boolean
}
