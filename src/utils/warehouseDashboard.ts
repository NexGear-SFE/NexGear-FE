import type { Category } from '@/types/category.type'
import type { VariantInventory } from '@/types/inventory.type'
import type { Product, ProductVariant } from '@/types/product.type'
import type { WarehouseOrder } from '@/types/warehouseOrder.type'
import { getStockStatus } from '@/utils/inventory'

type DashboardSource = { categories: Category[]; inventory: VariantInventory[]; orders: WarehouseOrder[]; products: Product[]; variants: ProductVariant[] }
export function getDashboardMetrics(source: DashboardSource) {
  const stocks = source.variants.map((variant) => { const stock = source.inventory.find((item) => item.variantId === variant.id); return getStockStatus(stock?.onHand ?? 0, stock?.reserved ?? 0, variant.reorderLevel) })
  return { waitingAcceptance: source.orders.filter((order) => order.state === 'WAITING_ACCEPTANCE').length, totalSku: source.variants.length, lowStock: stocks.filter((status) => status === 'LOW_STOCK').length, outOfStock: stocks.filter((status) => status === 'OUT_OF_STOCK').length, activeProducts: source.products.filter((product) => product.status === 'ACTIVE').length, draftProducts: source.products.filter((product) => product.status === 'DRAFT').length, inactiveCategories: source.categories.filter((category) => category.status === 'INACTIVE').length }
}
