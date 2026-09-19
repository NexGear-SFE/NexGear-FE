import type { QuickAccessItem, QuickAccessFormData } from './homeContent.type'

export type { QuickAccessItem, QuickAccessFormData }

export interface QuickAccessModalProps {
  isOpen: boolean
  editingItem: QuickAccessItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: QuickAccessFormData) => void
}

export interface QuickAccessFormBodyProps {
  formData: QuickAccessFormData
  errors: Record<string, string>
  onChangeField: (field: keyof QuickAccessFormData, value: QuickAccessFormData[keyof QuickAccessFormData]) => void
  onClose: () => void
  onSave: (data: QuickAccessFormData) => void
  isEditing: boolean
}

export interface QuickAccessIconProps {
  name: string
  className?: string
}
