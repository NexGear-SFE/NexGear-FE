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

export interface BannerModalProps {
  isOpen: boolean
  editingBanner: BannerItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: BannerFormData) => void
}

export interface BannerFormBodyProps {
  formData: BannerFormData
  errors: Record<string, string>
  onChangeField: (field: keyof BannerFormData, value: BannerFormData[keyof BannerFormData]) => void
  onClose: () => void
  onSave: (data: BannerFormData) => void
  isEditing: boolean
}

export interface BannerTableProps {
  banners: BannerItem[]
  onToggleVisibility: (id: string, isVisible: boolean) => void
  onEditBanner: (banner: BannerItem) => void
  onDeleteBanner: (banner: BannerItem) => void
  onReorderBanners?: (banners: BannerItem[]) => void
}

export interface BannerTableRowProps {
  banner: BannerItem
  index: number
  totalCount: number
  onToggleVisibility: (id: string, isVisible: boolean) => void
  onEditBanner: (banner: BannerItem) => void
  onDeleteBanner: (banner: BannerItem) => void
  onMoveUp?: (index: number) => void
  onMoveDown?: (index: number) => void
}

export interface DeleteConfirmModalProps {
  banner: BannerItem | null
  onClose: () => void
  onConfirm: () => void
}

export interface HomeConfigSubNavProps {
  activeTab: HomeContentTab
  onTabChange: (tab: HomeContentTab) => void
}

export interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

