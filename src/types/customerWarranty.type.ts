export type CustomerWarrantyStatus =
  | 'pending'
  | 'received'
  | 'inspecting'
  | 'repairing'
  | 'waiting_parts'
  | 'completed'
  | 'rejected'
  | 'cancelled'

export interface WarrantyTimelineStep {
  title: string
  timestamp?: string
  completed: boolean
  current: boolean
  description?: string
}

export interface CustomerWarrantyRequest {
  id: string
  requestCode: string
  productId: string
  productName: string
  productImage: string
  sku: string
  serialNumber: string
  orderCode: string
  purchaseDate: string
  warrantyExpirationDate: string
  reason: string
  description: string
  images?: string[]
  status: CustomerWarrantyStatus
  statusLabel: string
  createdAt: string
  expectedCompletionDate?: string
  actualCompletionDate?: string
  inspectionResult?: string
  resolution?: string
  timeline: WarrantyTimelineStep[]
}

export interface WarrantyEligibleProduct {
  id: string
  name: string
  image: string
  sku: string
  serialNumber: string
  orderCode: string
  purchaseDate: string
  warrantyUntil: string
  isEligible: boolean
  ineligibilityReason?: string
}
