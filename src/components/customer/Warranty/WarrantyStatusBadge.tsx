import { CheckCircle2, Clock, Wrench, XCircle, AlertCircle } from 'lucide-react'
import type { WarrantyStatusBadgeProps } from '@/types/customerWarranty.type'
import { cn } from '@/utils/cn'

export function WarrantyStatusBadge({ status, label, className }: WarrantyStatusBadgeProps) {
  switch (status) {
    case 'completed':
      return (
        <span
          className={cn(
            'bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          {label || 'Đã hoàn tất'}
        </span>
      )
    case 'repairing':
    case 'waiting_parts':
      return (
        <span
          className={cn(
            'bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <Wrench className="w-3.5 h-3.5" />
          {label || (status === 'repairing' ? 'Đang sửa chữa' : 'Chờ linh kiện')}
        </span>
      )
    case 'inspecting':
    case 'received':
      return (
        <span
          className={cn(
            'bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <Clock className="w-3.5 h-3.5" />
          {label || (status === 'inspecting' ? 'Đang kiểm tra' : 'Đã tiếp nhận')}
        </span>
      )
    case 'pending':
      return (
        <span
          className={cn(
            'bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <Clock className="w-3.5 h-3.5" />
          {label || 'Chờ tiếp nhận'}
        </span>
      )
    case 'rejected':
      return (
        <span
          className={cn(
            'bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-2xs inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <XCircle className="w-3.5 h-3.5" />
          {label || 'Từ chối'}
        </span>
      )
    case 'cancelled':
      return (
        <span
          className={cn(
            'bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1 rounded-[4px] inline-flex items-center gap-1.5 whitespace-nowrap',
            className
          )}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          {label || 'Đã hủy'}
        </span>
      )
    default:
      return (
        <span
          className={cn(
            'bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-[4px] whitespace-nowrap',
            className
          )}
        >
          {label || status}
        </span>
      )
  }
}
