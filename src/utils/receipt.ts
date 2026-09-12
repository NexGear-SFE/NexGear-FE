import type { ProductSerial } from '@/types/inventory.type'
import type { ProductVariant } from '@/types/variant.type'
import type { ReceiptLine, StockReceipt } from '@/types/receipt.type'

export function calculateLineTotal(line: Pick<ReceiptLine, 'quantity' | 'unitCost'>): number {
  return line.quantity * line.unitCost
}

export function calculateReceiptTotal(lines: ReceiptLine[]): number {
  return lines.reduce((total, line) => total + calculateLineTotal(line), 0)
}

export function parseSerials(value: string): string[] {
  return value.split(/\r?\n/).map((serial) => serial.trim()).filter(Boolean)
}

export function getReceiptValidationIssues(receipt: StockReceipt, variants: ProductVariant[], inventorySerials: ProductSerial[]): string[] {
  const issues: string[] = []
  if (!receipt.supplier.trim()) issues.push('Chọn nhà cung cấp.')
  if (!receipt.warehouseName.trim()) issues.push('Chọn kho nhận.')
  if (!receipt.receiptDate) issues.push('Chọn ngày nhập.')
  if (!receipt.invoiceCode.trim()) issues.push('Nhập mã hóa đơn hoặc chứng từ.')
  if (receipt.lines.length === 0) issues.push('Thêm ít nhất một SKU.')
  const seenSku = new Set<string>()
  const seenSerial = new Set<string>()
  const existingSerials = new Set(inventorySerials.map((serial) => serial.value.trim().toUpperCase()))
  receipt.lines.forEach((line) => {
    const variant = variants.find((item) => item.id === line.variantId)
    if (!variant) { issues.push('Một SKU không còn tồn tại.'); return }
    if (seenSku.has(line.variantId)) issues.push(`SKU ${variant.sku} bị lặp trong phiếu.`)
    seenSku.add(line.variantId)
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) issues.push(`SKU ${variant.sku}: số lượng phải là số nguyên lớn hơn 0.`)
    if (line.unitCost <= 0) issues.push(`SKU ${variant.sku}: giá nhập phải lớn hơn 0.`)
    if (!variant.serialTracking) return
    if (line.serials.length !== line.quantity) issues.push(`SKU ${variant.sku}: cần đúng ${line.quantity} serial.`)
    line.serials.forEach((serial) => {
      const normalized = serial.trim().toUpperCase()
      if (!normalized) issues.push(`SKU ${variant.sku}: serial không được để trống.`)
      else if (seenSerial.has(normalized)) issues.push(`Serial ${serial} bị trùng trong phiếu.`)
      else if (existingSerials.has(normalized)) issues.push(`Serial ${serial} đã tồn tại trong kho.`)
      seenSerial.add(normalized)
    })
  })
  return issues
}
