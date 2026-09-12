import { describe, expect, it } from 'vitest'
import type { ProductSerial } from '@/types/inventory.type'
import { areSerialsUnique, findDuplicateSkus, hasRequiredReceiptSerials, isSkuEditable } from '@/utils/skuRules'
import { variantCollectionSchema } from '@/schemas/variant.schema'

const serials: ProductSerial[] = [{ id: 'S1', variantId: 'V1', value: 'ABC-001', receiptId: 'R1', status: 'AVAILABLE', receivedAt: '' }]

describe('SKU and serial rules', () => {
  it('detects catalog and in-matrix SKU collisions', () => {
    expect([...findDuplicateSkus(['ASU-G16-I9', 'ASU-G16-I9'], ['OLD'])]).toEqual(['ASU-G16-I9'])
    expect([...findDuplicateSkus(['OLD'], ['OLD'])]).toEqual(['OLD'])
  })

  it('locks SKU after its first movement', () => {
    expect(isSkuEditable({ skuLocked: false })).toBe(true)
    expect(isSkuEditable({ skuLocked: true })).toBe(false)
  })

  it('requires unique serials globally and exact receipt quantity', () => {
    expect(areSerialsUnique(['new-001', 'NEW-002'], serials)).toBe(true)
    expect(areSerialsUnique(['abc-001'], serials)).toBe(false)
    expect(areSerialsUnique(['dup', 'DUP'], serials)).toBe(false)
    expect(hasRequiredReceiptSerials(true, 2, ['A', 'B'])).toBe(true)
    expect(hasRequiredReceiptSerials(true, 2, ['A'])).toBe(false)
    expect(hasRequiredReceiptSerials(false, 2, [])).toBe(true)
    expect(hasRequiredReceiptSerials(false, 2, ['NOT-A-SKU'])).toBe(false)
  })

  it('rejects duplicate option combinations', () => {
    const row = { sku: 'ASU-G16-BLK', skuSource: 'AUTO', optionValues: [{ option: 'Màu', optionCode: 'CLR', value: 'Đen', code: 'BLK' }], serialTracking: false, reorderLevel: 0, status: 'ACTIVE' }
    expect(variantCollectionSchema.safeParse([row, { ...row, sku: 'ASU-G16-BLK-2' }]).success).toBe(false)
  })
})
