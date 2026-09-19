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

export interface CategoryShelfAccordionProps {
  category: CategoryToggle
  products: ShelfProduct[]
  onRemoveProduct?: (productId: string) => void
}

export interface CategoryToggleCardProps {
  category: CategoryToggle
  onToggle: (id: string, enabled: boolean) => void
}

export interface HomeProductsTabProps {
  initialData?: HomeProductsConfigData
  onSave?: (data: HomeProductsConfigData) => void
}

export interface ShelfProductTableProps {
  products: ShelfProduct[]
  onRemoveProduct?: (productId: string) => void
}

