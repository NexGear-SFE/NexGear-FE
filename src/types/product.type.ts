export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE'
export type VariantStatus = 'ACTIVE' | 'INACTIVE'
export type SkuSource = 'AUTO' | 'MANUAL'

export interface ProductSpecification {
  key: string
  value: string
}

export interface VariantOptionValue {
  option: string
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
  serialTracking: boolean
  reorderLevel: number
  status: VariantStatus
  skuLocked: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductDimensions {
  lengthMm: number
  widthMm: number
  heightMm: number
}

export interface Product {
  id: string
  productCode: string
  modelCode: string
  name: string
  slug: string
  brand: string
  brandCode: string
  categoryId: string
  shortDescription: string
  specifications: ProductSpecification[]
  warrantyMonths: number
  unit: string
  origin: string
  weightGrams: number
  dimensions: ProductDimensions
  status: ProductStatus
  imageUrl?: string
  createdAt: string
  updatedAt: string
}
