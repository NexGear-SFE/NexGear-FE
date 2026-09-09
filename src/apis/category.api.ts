import { initialCategories } from '@/constants/warehouseMockData'
import type { Category } from '@/types/category.type'
import { mockResponse } from '@/apis/mockResponse'
import type { CategoryFormValues } from '@/schemas/category.schema'

export function getCategories() { return mockResponse<Category[]>(initialCategories) }

export function isCategoryIdentityAvailable(categories: Category[], code: string, slug: string, ignoredId?: string): boolean {
  return !categories.some((category) => category.id !== ignoredId && (category.code === code || category.slug === slug))
}

export function saveCategoryDraft(draft: CategoryFormValues, shouldFail = false) {
  return mockResponse(draft, 'Đã lưu danh mục', { shouldFail })
}
