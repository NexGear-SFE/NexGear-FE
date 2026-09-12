import { describe, expect, it } from 'vitest'
import { initialCategories, initialInventory, initialOrders, initialProducts, initialVariants } from '@/constants/warehouseMockData'
import { getDashboardMetrics } from '@/utils/warehouseDashboard'

describe('warehouse dashboard metrics', () => {
  it('derives all counts from domain stores', () => expect(getDashboardMetrics({ categories: initialCategories, inventory: initialInventory, orders: initialOrders, products: initialProducts, variants: initialVariants })).toMatchObject({ waitingAcceptance: 1, totalSku: 9, activeProducts: 6, draftProducts: 0 }))
})
