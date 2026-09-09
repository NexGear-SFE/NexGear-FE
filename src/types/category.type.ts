export type CategoryStatus = 'ACTIVE' | 'INACTIVE'

export interface Category {
  id: string
  code: string
  name: string
  slug: string
  description: string
  parentId: string | null
  sortOrder: number
  status: CategoryStatus
  createdAt: string
  updatedAt: string
}

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[]
}

export interface CategoryOption {
  id: string
  name: string
  breadcrumb: string
  depth: number
}
