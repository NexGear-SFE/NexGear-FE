import type { Category } from '@/types/category.type'
import type { InventoryRow, ProductSerial, StockStatus, VariantInventory } from '@/types/inventory.type'
import type { Product } from '@/types/product.type'
import type { ProductVariant } from '@/types/variant.type'

export function getAvailableStock(onHand: number, reserved: number): number {
  return Math.max(0, onHand - reserved)
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
      serialsAvailable: serials.filter((serial) => serial.variantId === variant.id && serial.status === 'AVAILABLE').length,
      status: getStockStatus(stock.onHand, stock.reserved, variant.reorderLevel),
    }
  }).filter((row): row is InventoryRow => row !== null)
}

export function filterInventoryRows(rows: InventoryRow[], query: string, categoryId: string, status: string, serialVariantIds: ReadonlySet<string> = new Set()): InventoryRow[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('vi')
  return rows.filter((row) => {
    const searchText = `${row.product.name} ${row.variant.sku}`.toLocaleLowerCase('vi')
    return (!normalizedQuery || searchText.includes(normalizedQuery) || serialVariantIds.has(row.variant.id))
      && (!categoryId || row.product.categoryId === categoryId)
      && (!status || row.status === status)
  })
}

export function findSerialExact(serials: ProductSerial[], query: string): ProductSerial[] {
  const normalizedQuery = query.trim().toUpperCase()
  if (!normalizedQuery) return serials
  return serials.filter((serial) => serial.value.trim().toUpperCase() === normalizedQuery)
}
