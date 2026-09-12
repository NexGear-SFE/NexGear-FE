export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE'

export interface ProductSpecification {
  key: string
  value: string
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

export type {
  ProductVariant,
  SkuAuditEntry,
  SkuSource,
  VariantOption,
  VariantOptionValue,
  VariantStatus,
} from '@/types/variant.type'
