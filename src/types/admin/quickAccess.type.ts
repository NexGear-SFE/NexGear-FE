import type { QuickAccessItem, QuickAccessFormData } from './homeContent.type'

export type { QuickAccessItem, QuickAccessFormData }

export type QuickAccessModalProps = {
  isOpen: boolean
  editingItem: QuickAccessItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: QuickAccessFormData) => void
}

export type QuickAccessFormBodyProps = {
  editingItem: QuickAccessItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: QuickAccessFormData) => void
}

export type QuickAccessIconProps = {
  name: string
  className?: string
}
