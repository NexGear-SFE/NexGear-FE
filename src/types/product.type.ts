export interface ProductSpec {
  label: string
  value: string
  icon?: string
}

export type ProductCategory = 'pc' | 'laptop' | 'gear' | 'screen'

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  category: ProductCategory
  specs: ProductSpec[]
  inStock: boolean
}

export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface ProductVariantOption {
  id: string
  label: string
  value: string
  price?: number
  stock?: number
  sku?: string
}

export interface ProductVariantGroup {
  id: string
  name: string
  options: ProductVariantOption[]
}

export interface ProductHighlight {
  icon?: string
  title: string
  description?: string
}

export interface ProductDescriptionSection {
  title: string
  content: string;
  image?: string
}

export interface ProductSpecificationGroup {
  groupName: string
  specs: ProductSpec[]
}

export interface ProductReview {
  id: string
  customerName: string
  avatarUrl?: string
  rating: number
  content: string
  date: string
  verifiedPurchase: boolean
  images?: string[]
}

export interface ProductRatingSummary {
  average: number
  totalReviews: number
  distribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

export interface ProductDetail {
  productId: string
  brand: string
  sku: string
  stockQuantity: number
  warrantyPeriod: string
  shippingInfo: string
  images: ProductImage[]
  highlights: ProductHighlight[]
  variantGroups?: ProductVariantGroup[]
  descriptionSections: ProductDescriptionSection[]
  specificationGroups: ProductSpecificationGroup[]
  ratingSummary: ProductRatingSummary
  reviews: ProductReview[]
}

