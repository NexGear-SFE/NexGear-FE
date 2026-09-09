export type ReceiptStatus = 'DRAFT' | 'CONFIRMED'

export interface ReceiptLine {
  id: string
  variantId: string
  quantity: number
  unitCost: number
  serials: string[]
}

export interface StockReceipt {
  id: string
  supplier: string
  receiptDate: string
  invoiceCode: string
  notes: string
  creator: string
  status: ReceiptStatus
  lines: ReceiptLine[]
  createdAt: string
  updatedAt: string
}
