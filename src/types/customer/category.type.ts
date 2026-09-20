import type { ElementType } from 'react'

export interface SubcategoryGroup {
  title: string
  items: string[]
}

export interface CategoryItem {
  id: string
  name: string
  icon: ElementType
  subgroups?: SubcategoryGroup[]
}
