import { describe, expect, it } from 'vitest'
import type { Category } from '@/types/category.type'
import { buildCategoryBreadcrumb, buildCategoryTree, canUseCategoryParent, filterCategoryOptions, flattenCategoryTree, isCategoryDescendant } from '@/utils/buildCategoryTree'

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

  it('supports multiple roots and promotes orphan categories to roots', () => {
    const extra: Category[] = [
      { ...base, id: 'other', code: 'OTHER', name: 'Khác', slug: 'khac', parentId: null },
      { ...base, id: 'orphan', code: 'ORPHAN', name: 'Mồ côi', slug: 'mo-coi', parentId: 'missing' },
    ]
    const tree = buildCategoryTree([...categories, ...extra])
    expect(tree.map((node) => node.id)).toEqual(['other', 'root', 'orphan'])
    expect(tree.find((node) => node.id === 'root')?.children).toHaveLength(1)
  })

  it('prevents self-parent, descendant parent and excessive depth', () => {
    expect(canUseCategoryParent(categories, 'root', 'root')).toBe(false)
    expect(canUseCategoryParent(categories, 'root', 'intel')).toBe(false)
    expect(canUseCategoryParent(categories, undefined, 'intel')).toBe(false)
    expect(canUseCategoryParent(categories, 'intel', null)).toBe(true)
  })

  it('searches category breadcrumbs without case sensitivity', () => {
    const options = flattenCategoryTree(buildCategoryTree(categories))
    expect(filterCategoryOptions(options, 'linh KIỆN / cpu').map((option) => option.id)).toEqual(['cpu', 'intel'])
  })
})
