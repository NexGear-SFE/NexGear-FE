import { CreditCard, CheckCircle2, Clock } from 'lucide-react'
import type { OrderPaymentCardProps } from '@/types/customer/order.type'

export function OrderPaymentCard({ paymentInfo }: OrderPaymentCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="text-base md:text-lg font-bold text-[#040004] font-heading flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#E30019]" />
          <span>Thông tin thanh toán</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
        <div>
          <span className="text-slate-500 font-medium block">Phương thức thanh toán:</span>
          <strong className="text-gray-900 text-sm md:text-base font-semibold">{paymentInfo.method}</strong>
        </div>

        <div>
          <span className="text-slate-500 font-medium block mb-1">Trạng thái thanh toán:</span>
          {paymentInfo.status === 'paid' ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded text-xs md:text-sm font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Đã thanh toán
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded text-xs md:text-sm font-bold">
              <Clock className="w-4 h-4" />
              Chưa thanh toán
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
