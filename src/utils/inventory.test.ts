import { describe, expect, it } from 'vitest'
import { initialCategories, initialInventory, initialProducts, initialSerials, initialVariants } from '@/constants/warehouseMockData'
import { buildInventoryRows, filterInventoryRows, findSerialExact, getStockStatus } from '@/utils/inventory'

describe('inventory utilities', () => {
  it('calculates stock state from available quantity and reorder threshold', () => {
    expect(getStockStatus(10, 2, 3)).toBe('IN_STOCK')
    expect(getStockStatus(4, 1, 3)).toBe('LOW_STOCK')
    expect(getStockStatus(3, 3, 3)).toBe('OUT_OF_STOCK')
  })

  it('searches inventory rows by SKU', () => {
    const rows = buildInventoryRows(initialProducts, initialVariants, initialInventory, initialSerials, initialCategories)
    const result = filterInventoryRows(rows, 'ASU-G16-I9-4080', '', '')
    expect(result).toHaveLength(1)
    expect(result[0].variant.id).toBe('V001')
  })

  it('matches serial numbers exactly and case-insensitively', () => {
    expect(findSerialExact(initialSerials, 'rog16-4080-0002').map((item) => item.id)).toEqual(['S002'])
    expect(findSerialExact(initialSerials, 'ROG16-4080')).toEqual([])
  })
})
