import { CheckCircle2, Clock, Truck, XCircle, AlertCircle, RotateCcw } from 'lucide-react'
import type { OrderStatusBadgeProps } from '@/types/order.type'
import { cn } from '@/utils/cn'

export function OrderStatusBadge({ status, label, className }: OrderStatusBadgeProps) {
  switch (status) {
    case 'delivered':
      return (
        <span
          className={cn(
            'bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          {label || 'Đã giao'}
        </span>
      )
    case 'shipping':
      return (
        <span
          className={cn(
            'bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <Truck className="w-3.5 h-3.5" />
          {label || 'Đang giao hàng'}
        </span>
      )
    case 'pending':
    case 'confirmed':
    case 'processing':
      return (
        <span
          className={cn(
            'bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <Clock className="w-3.5 h-3.5" />
          {label || 'Chờ xác nhận'}
        </span>
      )
    case 'cancelled':
      return (
        <span
          className={cn(
            'bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <XCircle className="w-3.5 h-3.5" />
          {label || 'Đã hủy'}
        </span>
      )
    case 'returned':
      return (
        <span
          className={cn(
            'bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {label || 'Đổi trả'}
        </span>
      )
    default:
      return (
        <span
          className={cn(
            'bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1 rounded-[4px] inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          {label || status}
        </span>
      )
  }
}
