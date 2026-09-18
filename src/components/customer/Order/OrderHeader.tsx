import { Link } from 'react-router-dom'
import { ArrowLeft, Headphones } from 'lucide-react'
import type { OrderStatus } from '@/types/order.type'
import { formatCurrency } from '@/utils/formatCurrency'
import { OrderStatusBadge } from './OrderStatusBadge'

export interface OrderHeaderProps {
  orderCode: string
  createdAt: string
  totalAmount: number
  status: OrderStatus
  statusLabel?: string
}

export function OrderHeader({
  orderCode,
  createdAt,
  totalAmount,
  status,
  statusLabel,
}: OrderHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <Link
          to="/account/settings?tab=orders"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-600 hover:text-[#E30019] transition-colors mb-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Đơn hàng của tôi</span>
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#040004]">
            Chi tiết đơn hàng {orderCode}
          </h1>
          <OrderStatusBadge status={status} label={statusLabel} />
        </div>
        <p className="text-xs md:text-sm text-gray-600 font-medium">
          Đặt ngày {createdAt} · Tổng tiền{' '}
          <strong className="text-[#E30019] font-bold text-sm md:text-base">{formatCurrency(totalAmount)}</strong>
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <a
          href="tel:18009999"
          className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#E30019] text-gray-700 hover:text-[#E30019] text-xs md:text-sm font-bold px-4 py-2.5 rounded-[6px] transition-all bg-white shadow-2xs"
        >
          <Headphones className="w-4 h-4" />
          <span>Hỗ trợ: 1800-9999</span>
        </a>
      </div>
    </div>
  )
}
