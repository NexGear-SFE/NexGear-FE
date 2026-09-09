import type { Category } from '@/types/category.type'
import type { ProductSerial, StockStatus, VariantInventory } from '@/types/inventory.type'
import type { Product, ProductVariant } from '@/types/product.type'
import { getAvailableStock } from '@/utils/formatters'

export interface InventoryRow {
  product: Product
  variant: ProductVariant
  category: Category | undefined
  stock: VariantInventory
  available: number
  serialCount: number
  status: StockStatus
}

export function getStockStatus(onHand: number, reserved: number, reorderLevel: number): StockStatus {
  const available = getAvailableStock(onHand, reserved)
  if (available === 0) return 'OUT_OF_STOCK'
  return available <= reorderLevel ? 'LOW_STOCK' : 'IN_STOCK'
}

export function buildInventoryRows(
  products: Product[],
  variants: ProductVariant[],
  inventory: VariantInventory[],
  serials: ProductSerial[],
  categories: Category[],
): InventoryRow[] {
  return variants.map((variant) => {
    const product = products.find((item) => item.id === variant.productId)
    if (!product) return null
    const stock = inventory.find((item) => item.variantId === variant.id) ?? { variantId: variant.id, onHand: 0, reserved: 0 }
    return {
      product,
      variant,
      category: categories.find((item) => item.id === product.categoryId),
      stock,
      available: getAvailableStock(stock.onHand, stock.reserved),
      serialCount: serials.filter((serial) => serial.variantId === variant.id).length,
      status: getStockStatus(stock.onHand, stock.reserved, variant.reorderLevel),
    }
  }).filter((row): row is InventoryRow => row !== null)
}

export function filterInventoryRows(rows: InventoryRow[], query: string, categoryId: string, status: string): InventoryRow[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('vi')
  return rows.filter((row) => {
    const searchText = `${row.product.name} ${row.variant.sku}`.toLocaleLowerCase('vi')
    return (!normalizedQuery || searchText.includes(normalizedQuery))
      && (!categoryId || row.product.categoryId === categoryId)
      && (!status || row.status === status)
  })
}

export function findSerialExact(serials: ProductSerial[], query: string): ProductSerial[] {
  const normalizedQuery = query.trim().toUpperCase()
  if (!normalizedQuery) return serials
  return serials.filter((serial) => serial.value.trim().toUpperCase() === normalizedQuery)
}
