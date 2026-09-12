import type { Category } from '@/types/category.type'
import type { Product } from '@/types/product.type'
import type { ProductVariant } from '@/types/variant.type'

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
export type SerialStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'RETURNED'
export type InventoryMovementReason = 'STOCK_RECEIPT' | 'ORDER_RESERVED' | 'ORDER_FULFILLED' | 'ADJUSTMENT'

export interface VariantInventory {
  variantId: string
  onHand: number
  reserved: number
}

export interface InventoryRow {
  product: Product
  variant: ProductVariant
  category: Category | undefined
  stock: VariantInventory
  available: number
  serialCount: number
  serialsAvailable: number
  status: StockStatus
}

export interface InventoryMovement {
  id: string
  variantId: string
  reason: InventoryMovementReason
  quantityDelta: number
  reference: string
  occurredAt: string
}

export interface ProductSerial {
  id: string
  variantId: string
  value: string
  receiptId: string
  status: SerialStatus
  receivedAt: string
}
