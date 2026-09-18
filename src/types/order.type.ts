export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipping'
  | 'delivered'
  | 'cancelled'
  | 'returned'

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'

export interface OrderItem {
  id: string
  name: string
  sku: string
  price: number
  quantity: number
  image: string
  variant?: string
}

export interface ShippingInfo {
  recipientName: string
  phone: string
  address: string
  city: string
  district: string
  ward: string
  shippingMethod: string
  trackingCode?: string
  estimatedDelivery?: string
  actualDelivery?: string
  note?: string
}

export interface PaymentInfo {
  method: string
  status: PaymentStatus
  transactionId?: string
  paidAt?: string
}

export interface OrderTimelineStep {
  title: string
  timestamp?: string
  completed: boolean
  current?: boolean
}

export interface Order {
  id: string
  orderCode: string
  createdAt: string
  status: OrderStatus
  statusLabel: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
  timeline: OrderTimelineStep[]
  subtotal: number
  shippingFee: number
  discountFee: number
  totalAmount: number
  cancelReason?: string
}
