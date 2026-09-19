import { formatCurrency } from '@/utils/formatCurrency'
import type { OrderSummaryCardProps } from '@/types/customer/order.type'

export function OrderSummaryCard({
  subtotal,
  shippingFee,
  totalAmount,
  itemCount,
}: OrderSummaryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4 font-body">
      <h3 className="text-base md:text-lg font-bold text-[#040004] font-heading pb-3 border-b border-gray-100">
        Tổng cộng đơn hàng
      </h3>

      <div className="space-y-3 text-xs md:text-sm">
        <div className="flex justify-between text-slate-600 font-medium">
          <span>Tạm tính ({itemCount} sản phẩm)</span>
          <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-slate-600 font-medium">
          <span>Phí vận chuyển</span>
          <span className="font-semibold text-slate-900">
            {shippingFee > 0 ? formatCurrency(shippingFee) : 'Miễn phí'}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
          <span className="text-sm md:text-base font-bold text-slate-900">Tổng tiền thanh toán</span>
          <span className="text-xl md:text-2xl font-bold text-[#E30019]">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  )
}
