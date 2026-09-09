export type WarehouseOrderState =
  | 'WAITING_ACCEPTANCE'
  | 'PICKING'
  | 'WAITING_SERIAL'
  | 'READY_TO_PACK'
  | 'WAITING_GHTK_PICKUP'
  | 'COMPLETED'
  | 'ISSUE'

export interface WarehouseOrderItem {
  id: string
  variantId: string
  quantity: number
  unitPrice: number
  pickedQuantity: number
  assignedSerialIds: string[]
}

export interface OrderIssue {
  code: string
  title: string
  message: string
  occurredAt: string
  resumeState: Exclude<WarehouseOrderState, 'ISSUE'>
  retryable: boolean
}

export interface OrderTimelineEvent {
  id: string
  label: string
  occurredAt: string
  actor: string
}

export interface WarehouseOrder {
  id: string
  customerName: string
  phone: string
  address: string
  paymentMethod: 'COD' | 'BANK_TRANSFER' | 'VNPAY' | 'MOMO'
  state: WarehouseOrderState
  assignee: string | null
  items: WarehouseOrderItem[]
  note: string
  issue?: OrderIssue
  timeline: OrderTimelineEvent[]
  createdAt: string
  pickedAt?: string
  pickedBy?: string
  assignedAt?: string
  assignedBy?: string
  parcel?: { weightGrams: number; lengthCm: number; widthCm: number; heightCm: number; pickupAddress: string; trackingCode?: string }
}
