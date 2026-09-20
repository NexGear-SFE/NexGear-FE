import { Package } from 'lucide-react'
import type { OrderItemListProps } from '@/types/customer/order.type'
import { formatCurrency } from '@/utils/formatCurrency'

export function OrderItemList({ items }: OrderItemListProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="text-base md:text-lg font-bold text-[#040004] font-heading flex items-center gap-2">
          <Package className="w-5 h-5 text-[#E30019]" />
          <span>Sản phẩm trong đơn hàng ({items.length})</span>
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F4F5F7] rounded-[8px] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <h4 className="font-bold text-sm sm:text-base text-[#040004] leading-snug line-clamp-2">
                {item.name}
              </h4>
              {item.variant && (
                <p className="text-xs md:text-sm text-gray-600 font-medium truncate">{item.variant}</p>
              )}
              <p className="text-xs md:text-sm font-mono text-gray-500 font-medium">SKU: {item.sku}</p>
            </div>

            <div className="text-right shrink-0 space-y-1">
              <div className="text-sm md:text-base font-bold text-[#E30019]">
                {formatCurrency(item.price)}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">x{item.quantity}</div>
              <div className="text-xs md:text-sm font-bold text-gray-900">
                = {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
