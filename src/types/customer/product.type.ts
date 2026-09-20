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

export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  className?: string
}

export interface ProductInfoProps {
  product: Product
  detail: ProductDetail
  currentPrice?: number
  currentSku?: string
  currentStock?: number
}

export interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export interface ProductDescriptionProps {
  sections: ProductDescriptionSection[]
}

export interface ProductSpecificationsProps {
  groups: ProductSpecificationGroup[]
}

export interface ProductReviewSummaryProps {
  summary: ProductRatingSummary
}

export interface ProductReviewListProps {
  reviews: ProductReview[]
}

export interface ProductPurchaseActionsProps {
  inStock: boolean
  maxStock: number
  onAddToCart: (quantity: number) => void
  onBuyNow: (quantity: number) => void
}

export interface ProductVariantSelectorProps {
  variantGroups: ProductVariantGroup[]
  selectedOptions: Record<string, ProductVariantOption>
  onSelectOption: (groupId: string, option: ProductVariantOption) => void
}

export interface ProductHighlightsProps {
  highlights: ProductHighlight[]
}


