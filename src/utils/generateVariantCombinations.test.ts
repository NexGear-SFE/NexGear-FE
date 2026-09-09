import { describe, expect, it } from 'vitest'
import { generateVariantCombinations } from '@/utils/generateVariantCombinations'

describe('generateVariantCombinations', () => {
  it('returns one default combination when there are no options', () => {
    expect(generateVariantCombinations([])).toEqual([[]])
  })

  it('creates the cartesian product', () => {
    const combinations = generateVariantCombinations([
      { name: 'Màu', values: [{ value: 'Đen', code: 'BLK' }, { value: 'Trắng', code: 'WHT' }] },
      { name: 'Size', values: [{ value: 'M', code: 'M' }, { value: 'L', code: 'L' }] },
    ])
    expect(combinations).toHaveLength(4)
    expect(combinations[3]?.map((item) => item.code)).toEqual(['WHT', 'L'])
  })

  it('creates one combination for one option with one value', () => {
    expect(generateVariantCombinations([{ name: 'Màu', code: 'CLR', values: [{ value: 'Đen', code: 'BLK' }] }])).toEqual([[{ option: 'Màu', optionCode: 'CLR', value: 'Đen', code: 'BLK' }]])
  })

  it('returns no combinations for an option without values', () => {
    expect(generateVariantCombinations([{ name: 'Màu', values: [] }])).toEqual([])
  })
})
