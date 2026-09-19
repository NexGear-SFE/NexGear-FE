export interface CategoryToggle {
  id: string
  name: string
  icon: string
  count: number
  topProduct: string
  enabled: boolean
}

export interface ShelfProduct {
  id: string
  name: string
  category: string
  sku: string
  price: number
  stock: number
  score: number
  scoreColor: string
}

export interface HomeProductsConfigData {
  syncTime: string
  categories: CategoryToggle[]
  shelves: Record<string, ShelfProduct[]>
}
