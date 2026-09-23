export type HomeConfigTabId =
  | 'hero'
  | 'quick-access'
  | 'commitments'
  | 'trust-badges'
  | 'products'
  | 'footer'

export type IconCategoryFilter = 'all' | 'warranty' | 'shipping' | 'tech' | 'service'

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

export type TabNavigationProps = {
  activeTab: import('./homeContent.type').HomeContentTab | HomeConfigTabId
  onTabChange: (tab: import('./homeContent.type').HomeContentTab) => void
}

export type TrustBadgeFormProps = {
  initialData?: TrustBadge[]
  onSave?: (badges: TrustBadge[]) => void
}

export type TrustBadgeItemProps = {
  badge: TrustBadge
  index: number
  onChange: (id: number | string, field: keyof TrustBadge, value: string) => void
  errors?: TrustBadgeErrors
}

export type DynamicLucideIconProps = {
  icon: string
  className?: string
}

