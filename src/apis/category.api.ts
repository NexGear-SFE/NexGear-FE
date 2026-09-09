import { initialCategories } from '@/constants/warehouseMockData'
import type { Category } from '@/types/category.type'
import { mockResponse } from '@/apis/mockResponse'

export function getCategories() { return mockResponse<Category[]>(initialCategories) }

export function isCategoryIdentityAvailable(categories: Category[], code: string, slug: string, ignoredId?: string): boolean {
  return !categories.some((category) => category.id !== ignoredId && (category.code === code || category.slug === slug))
}
