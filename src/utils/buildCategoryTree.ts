import type { Category, CategoryOption, CategoryTreeNode } from '@/types/category.type'

export const MAX_CATEGORY_DEPTH = 3

export function buildCategoryTree(categories: Category[]): CategoryTreeNode[] {
  const nodes = new Map<string, CategoryTreeNode>()
  categories.forEach((category) => nodes.set(category.id, { ...category, children: [] }))

  const roots: CategoryTreeNode[] = []
  nodes.forEach((node) => {
    const parent = node.parentId ? nodes.get(node.parentId) : undefined
    if (!parent || parent.id === node.id || isCategoryDescendant(categories, parent.id, node.id)) {
      roots.push(node)
      return
    }
    parent.children.push(node)
  })

  const sortNodes = (items: CategoryTreeNode[]) => {
    items.sort((first, second) => first.sortOrder - second.sortOrder || first.name.localeCompare(second.name))
    items.forEach((item) => sortNodes(item.children))
  }
  sortNodes(roots)
  return roots
}

export function isCategoryDescendant(categories: Category[], categoryId: string, possibleAncestorId: string): boolean {
  const byId = new Map(categories.map((category) => [category.id, category]))
  const visited = new Set<string>()
  let current = byId.get(categoryId)
  while (current?.parentId && !visited.has(current.id)) {
    if (current.parentId === possibleAncestorId) return true
    visited.add(current.id)
    current = byId.get(current.parentId)
  }
  return false
}

export function buildCategoryBreadcrumb(categories: Category[], categoryId: string): string {
  const byId = new Map(categories.map((category) => [category.id, category]))
  const parts: string[] = []
  const visited = new Set<string>()
  let current = byId.get(categoryId)
  while (current && !visited.has(current.id)) {
    parts.unshift(current.name)
    visited.add(current.id)
    current = current.parentId ? byId.get(current.parentId) : undefined
  }
  return parts.join(' / ')
}

export function flattenCategoryTree(nodes: CategoryTreeNode[], depth = 0): CategoryOption[] {
  return nodes.flatMap((node) => [
    { id: node.id, name: node.name, breadcrumb: node.name, depth },
    ...flattenCategoryTree(node.children, depth + 1).map((option) => ({
      ...option,
      breadcrumb: `${node.name} / ${option.breadcrumb}`,
    })),
  ])
}

export function getCategoryDepth(categories: Category[], categoryId: string): number {
  const byId = new Map(categories.map((category) => [category.id, category]))
  const visited = new Set<string>()
  let depth = 0
  let current = byId.get(categoryId)
  while (current?.parentId && !visited.has(current.id)) {
    visited.add(current.id)
    depth += 1
    current = byId.get(current.parentId)
  }
  return depth
}

export function canUseCategoryParent(categories: Category[], categoryId: string | undefined, parentId: string | null): boolean {
  if (!parentId) return true
  if (categoryId && (parentId === categoryId || isCategoryDescendant(categories, parentId, categoryId))) return false
  return getCategoryDepth(categories, parentId) + 1 < MAX_CATEGORY_DEPTH
}

export function filterCategoryOptions(options: CategoryOption[], query: string): CategoryOption[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('vi')
  if (!normalizedQuery) return options
  return options.filter((option) => `${option.name} ${option.breadcrumb}`.toLocaleLowerCase('vi').includes(normalizedQuery))
}
