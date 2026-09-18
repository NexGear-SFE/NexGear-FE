export type HomeContentTab =
  | 'hero'
  | 'quick-access'
  | 'commitments'
  | 'products'
  | 'footer'

export interface BannerItem {
  id: string
  title: string
  specs: string
  price: number
  order: number
  isVisible: boolean
  imageUrl?: string
  targetUrl?: string
}

export interface BannerFormData {
  title: string
  specs: string
  price: number
  order: number
  isVisible: boolean
  imageUrl?: string
  targetUrl?: string
}

export interface QuickAccessItem {
  id: number | string
  icon: string
  label: string
  url: string
  order: number
}

export interface QuickAccessFormData {
  icon: string
  label: string
  url: string
  order: number
}
