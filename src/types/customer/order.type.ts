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

export interface MyOrdersTabProps {
  orders: Order[]
}

export interface CancelOrderModalProps {
  isOpen: boolean
  orderCode: string
  reasonInput: string
  onChangeReason: (val: string) => void
  onClose: () => void
  onConfirmCancel: () => void
}

export interface OrderActionsCardProps {
  status: OrderStatus
  trackingCode?: string
  itemCount: number
  singleProductId?: string
  onReorder: () => void
  onOpenCancelModal: () => void
  onShowNotification: (msg: string) => void
}

export interface OrderHeaderProps {
  orderCode: string
  createdAt: string
  totalAmount: number
  status: OrderStatus
  statusLabel: string
}

export interface OrderItemListProps {
  items: OrderItem[]
}

export interface OrderPaymentCardProps {
  paymentInfo: PaymentInfo
}

export interface OrderShippingCardProps {
  shippingInfo: ShippingInfo
}

export interface OrderStatusBadgeProps {
  status: OrderStatus | string
  label?: string
  className?: string
}

export interface OrderSummaryCardProps {
  subtotal: number
  shippingFee: number
  totalAmount: number
  itemCount: number
}

export interface OrderTimelineProps {
  status: OrderStatus
  cancelReason?: string
  timeline: OrderTimelineStep[]
}

