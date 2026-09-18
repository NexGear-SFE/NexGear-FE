import type { ElementType } from 'react'

export interface QuickCategoryItem {
  id: string
  title: string
  icon: ElementType
  targetId: string
}

export interface TrustBadgeItem {
  icon: ElementType
  title: string
  description: string
}
