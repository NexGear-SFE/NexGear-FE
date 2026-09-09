import { describe, expect, it } from 'vitest'
import type { Category } from '@/types/category.type'
import { buildCategoryBreadcrumb, buildCategoryTree, isCategoryDescendant } from '@/utils/buildCategoryTree'

const base = { description: '', sortOrder: 1, status: 'ACTIVE', createdAt: '', updatedAt: '' } as const
const categories: Category[] = [
  { ...base, id: 'root', code: 'ROOT', name: 'Linh kiện', slug: 'linh-kien', parentId: null },
  { ...base, id: 'cpu', code: 'CPU', name: 'CPU', slug: 'cpu', parentId: 'root' },
  { ...base, id: 'intel', code: 'INTEL', name: 'Intel', slug: 'intel', parentId: 'cpu' },
]

describe('category tree utilities', () => {
  it('builds nested categories and breadcrumb', () => {
    const tree = buildCategoryTree(categories)
    expect(tree[0]?.children[0]?.children[0]?.id).toBe('intel')
    expect(buildCategoryBreadcrumb(categories, 'intel')).toBe('Linh kiện / CPU / Intel')
  })

  it('detects descendants without looping', () => {
    expect(isCategoryDescendant(categories, 'intel', 'root')).toBe(true)
    expect(isCategoryDescendant(categories, 'root', 'intel')).toBe(false)
  })
})
