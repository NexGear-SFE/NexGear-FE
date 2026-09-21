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

export type CategoryShelfAccordionProps = {
  category: CategoryToggle
  products: ShelfProduct[]
  defaultOpen?: boolean
}

export type CategoryToggleCardProps = {
  category: CategoryToggle
  onToggle: (id: string, enabled: boolean) => void
}

export type HomeProductsTabProps = {
  initialData?: HomeProductsConfigData
  onSave?: (categories: CategoryToggle[]) => void
}

export type ShelfProductTableProps = {
  products: ShelfProduct[]
}

