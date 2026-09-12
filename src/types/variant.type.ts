export type VariantStatus = 'ACTIVE' | 'INACTIVE'
export type SkuSource = 'AUTO' | 'MANUAL'

export interface VariantOption {
  name: string
  code?: string
  values: Array<{ value: string; code: string }>
}

export interface VariantOptionValue {
  option: string
  optionCode?: string
  value: string
  code: string
}

export interface ProductVariant {
  id: string
  productId: string
  sku: string
  skuSource: SkuSource
  optionValues: VariantOptionValue[]
  barcode?: string
  gtin?: string
  purchasePrice: number
  serialTracking: boolean
  reorderLevel: number
  status: VariantStatus
  skuLocked: boolean
  createdAt: string
  updatedAt: string
}

export interface SkuAuditEntry {
  id: string
  action: 'CREATE' | 'MANUAL_OVERRIDE' | 'REGENERATE' | 'DEACTIVATE'
  sku: string
  variantId?: string
  actor: string
  occurredAt: string
}
