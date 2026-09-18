export type HomeConfigTabId =
  | 'hero'
  | 'quick-access'
  | 'commitments'
  | 'trust-badges'
  | 'products'
  | 'footer'

export interface HomeConfigTab {
  id: HomeConfigTabId
  label: string
}

export interface TrustBadge {
  id: number | string
  icon: string
  title: string
  subtitle: string
}

export interface TrustBadgeErrors {
  title?: string
  subtitle?: string
  icon?: string
}

export interface BadgeTheme {
  iconColor: string
  bgColor: string
  borderColor: string
}
