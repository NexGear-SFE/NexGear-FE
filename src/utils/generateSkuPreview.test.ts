import { describe, expect, it } from 'vitest'
import { generateSkuPreview, isValidSku, normalizeSkuSegment } from '@/utils/generateSkuPreview'

describe('SKU utilities', () => {
  it('normalizes Vietnamese text and special characters', () => {
    expect(normalizeSkuSegment('Chuột Đỏ / 2026')).toBe('CHUOT-DO-2026')
  })

  it('generates a stable SKU from codes', () => {
    expect(generateSkuPreview('ASU', 'G16', [
      { option: 'CPU', value: 'Intel Core i9', code: 'I9' },
      { option: 'GPU', value: 'RTX 4080', code: '4080' },
    ])).toBe('ASU-G16-I9-4080')
  })

  it('does not change SKU when only display names change', () => {
    const first = generateSkuPreview('LOG', 'GPX2', [{ option: 'Màu', value: 'Đen', code: 'BLK' }])
    const renamed = generateSkuPreview('LOG', 'GPX2', [{ option: 'Color', value: 'Black', code: 'BLK' }])
    expect(first).toBe('LOG-GPX2-BLK')
    expect(renamed).toBe(first)
  })

  it('rejects spaces and lowercase characters', () => {
    expect(isValidSku('ASU-G16-I9')).toBe(true)
    expect(isValidSku('asu g16')).toBe(false)
  })
})
