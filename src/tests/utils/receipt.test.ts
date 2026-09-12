import { describe, expect, it } from 'vitest'
import { initialSerials, initialVariants } from '@/constants/warehouseMockData'
import type { StockReceipt } from '@/types/receipt.type'
import { calculateReceiptTotal, getReceiptValidationIssues, parseSerials } from '@/utils/receipt'

const receipt: StockReceipt = { id: 'R', supplier: 'Supplier', warehouseName: 'Kho A', receiptDate: '2026-09-09', invoiceCode: 'INV', notes: '', creator: 'Tester', status: 'DRAFT', lines: [{ id: 'L1', variantId: 'V001', quantity: 2, unitCost: 10, serials: ['NEW-1', 'NEW-2'] }], createdAt: '', updatedAt: '' }

describe('receipt rules', () => {
  it('calculates totals with a pure utility', () => expect(calculateReceiptTotal(receipt.lines)).toBe(20))
  it('trims pasted serials and removes empty lines', () => expect(parseSerials(' A \n\n B ')).toEqual(['A', 'B']))
  it('detects serial count mismatch and duplicates across inventory', () => {
    const invalid = { ...receipt, lines: [{ ...receipt.lines[0], quantity: 3, serials: ['ROG16-4080-0002', 'rog16-4080-0002'] }] }
    const issues = getReceiptValidationIssues(invalid, initialVariants, initialSerials)
    expect(issues.some((issue) => issue.includes('cần đúng 3 serial'))).toBe(true)
    expect(issues.some((issue) => issue.includes('đã tồn tại'))).toBe(true)
    expect(issues.some((issue) => issue.includes('bị trùng'))).toBe(true)
  })
  it('rejects empty lines, zero quantity and zero cost at confirmation', () => {
    expect(getReceiptValidationIssues({ ...receipt, lines: [] }, initialVariants, initialSerials)).toContain('Thêm ít nhất một SKU.')
    const issues = getReceiptValidationIssues({ ...receipt, lines: [{ ...receipt.lines[0], quantity: 0, unitCost: 0, serials: [] }] }, initialVariants, initialSerials)
    expect(issues.some((issue) => issue.includes('số lượng'))).toBe(true)
    expect(issues.some((issue) => issue.includes('giá nhập'))).toBe(true)
  })
})
