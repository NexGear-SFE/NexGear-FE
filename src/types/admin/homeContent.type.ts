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

export type BannerModalProps = {
  isOpen: boolean
  editingBanner: BannerItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: BannerFormData) => void
}

export type BannerFormBodyProps = {
  editingBanner: BannerItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: BannerFormData) => void
}

export type BannerTableProps = {
  banners: BannerItem[]
  onToggleVisibility: (id: string, isVisible: boolean) => void
  onEditBanner: (banner: BannerItem) => void
  onDeleteBanner: (banner: BannerItem) => void
  onReorderBanners: (reordered: BannerItem[]) => void
}

export type BannerTableRowProps = {
  banner: BannerItem
  index: number
  onToggleVisibility: (id: string, isVisible: boolean) => void
  onEdit: (banner: BannerItem) => void
  onDelete: (banner: BannerItem) => void
  onDragStart?: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void
  onDragOver?: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void
  onDrop?: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  isFirst?: boolean
  isLast?: boolean
}

export type DeleteConfirmModalProps = {
  banner: BannerItem | null
  onClose: () => void
  onConfirm: () => void
}

export type HomeConfigSubNavProps = {
  activeTab: HomeContentTab
  onTabChange: (tab: HomeContentTab) => void
}

export type ToggleSwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  id?: string
  ariaLabel?: string
  label?: string
}

