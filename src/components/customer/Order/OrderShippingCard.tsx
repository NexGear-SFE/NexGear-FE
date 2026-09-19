import { Truck, User, Phone, MapPin } from 'lucide-react'
import type { OrderShippingCardProps } from '@/types/order.type'

export function OrderShippingCard({ shippingInfo }: OrderShippingCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="text-base md:text-lg font-bold text-[#040004] font-heading flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#E30019]" />
          <span>Thông tin giao hàng</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs md:text-sm">
        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-medium block">Người nhận hàng:</span>
              <strong className="text-gray-900 text-sm md:text-base font-bold">{shippingInfo.recipientName}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-medium block">Số điện thoại:</span>
              <strong className="text-gray-900 text-xs md:text-sm font-bold font-mono">{shippingInfo.phone}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-medium block">Địa chỉ nhận hàng:</span>
              <p className="text-gray-800 text-xs md:text-sm font-medium leading-relaxed">
                {shippingInfo.address}, {shippingInfo.city}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 bg-gray-50 p-4 rounded-[8px] border border-gray-200/70">
          <div>
            <span className="text-slate-500 font-medium block">Đơn vị vận chuyển:</span>
            <strong className="text-gray-900 text-xs md:text-sm font-semibold">{shippingInfo.shippingMethod}</strong>
          </div>

          {shippingInfo.trackingCode && (
            <div>
              <span className="text-slate-500 font-medium block">Mã vận đơn:</span>
              <strong className="text-[#E30019] text-xs md:text-sm font-mono font-bold">{shippingInfo.trackingCode}</strong>
            </div>
          )}

          {shippingInfo.actualDelivery && (
            <div>
              <span className="text-slate-500 font-medium block">Thời gian giao thực tế:</span>
              <span className="text-gray-800 text-xs md:text-sm font-medium">{shippingInfo.actualDelivery}</span>
            </div>
          )}

          {shippingInfo.note && (
            <div>
              <span className="text-slate-500 font-medium block">Ghi chú giao hàng:</span>
              <span className="text-gray-700 text-xs md:text-sm italic">{shippingInfo.note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
