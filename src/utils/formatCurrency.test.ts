import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats positive numbers into Vietnamese Dong format', () => {
    const formatted = formatCurrency(17890000)
    // Should format with thousands separator and ₫ symbol
    expect(formatted).toMatch(/17[.,]890[.,]000\s?₫/)
  })

  it('formats zero correctly', () => {
    const formatted = formatCurrency(0)
    expect(formatted).toMatch(/0\s?₫/)
  })

  it('returns "0₫" when input is NaN or invalid', () => {
    expect(formatCurrency(NaN)).toBe('0₫')
    // @ts-expect-error test invalid input runtime safety
    expect(formatCurrency(null)).toBe('0₫')
    // @ts-expect-error test invalid input runtime safety
    expect(formatCurrency(undefined)).toBe('0₫')
  })
})
