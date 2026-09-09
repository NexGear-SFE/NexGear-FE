import { describe, expect, it } from 'vitest'
import { initialOrders } from '@/constants/warehouseMockData'
import { getOrderProgressIndex, sortOrders, validateParcel } from '@/utils/warehouseOrder'

describe('warehouse order utilities', () => {
  it('places issues first in smart sorting', () => expect(sortOrders(initialOrders, 'smart')[0].state).toBe('ISSUE'))
  it('renders an issue at its resume step', () => expect(getOrderProgressIndex(initialOrders.find((order) => order.state === 'ISSUE')!, false)).toBe(2))
  it('skips serial progress for orders without tracked items', () => expect(getOrderProgressIndex(initialOrders.find((order) => order.state === 'READY_TO_PACK')!, false)).toBe(2))
  it('validates every parcel dimension', () => expect(validateParcel({ weightGrams: 0, lengthCm: 0, widthCm: 0, heightCm: 0 })).toHaveLength(4))
})
