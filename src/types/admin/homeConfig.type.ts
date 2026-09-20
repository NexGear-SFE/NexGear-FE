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

export interface TabNavigationProps {
  activeTab: HomeConfigTabId | string
  onTabChange: (tabId: HomeConfigTabId) => void
}

export interface TrustBadgeFormProps {
  initialBadges?: TrustBadge[]
  onSave?: (badges: TrustBadge[]) => void
}

export interface TrustBadgeItemProps {
  badge: TrustBadge
  index: number
  theme: BadgeTheme
  totalCount: number
  onChangeField: (id: number | string, field: keyof TrustBadge, value: string) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
  onDelete: (id: number | string) => void
  errors?: TrustBadgeErrors
}

export interface DynamicLucideIconProps {
  name: string
  className?: string
}

