import { RotateCcw, Truck, Headphones } from 'lucide-react'
import type { OrderActionsCardProps } from '@/types/order.type'

export function OrderActionsCard({
  status,
  trackingCode,
  itemCount,
  onReorder,
  onOpenCancelModal,
  onShowNotification,
}: OrderActionsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-3 font-body">
      <h3 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
        Thao tác với đơn hàng
      </h3>

      {status === 'delivered' && (
        <>
          {itemCount === 1 && (
            <button
              type="button"
              onClick={onReorder}
              className="w-full bg-[#E30019] hover:bg-[#cc0016] text-white font-bold py-3 px-4 rounded-[6px] flex items-center justify-center gap-2 text-xs md:text-sm transition-all shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mua lại đơn hàng</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onShowNotification('Chức năng Đánh giá sản phẩm đang được cập nhật!')}
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-800 font-bold py-3 px-4 rounded-[6px] text-xs md:text-sm transition-all cursor-pointer"
          >
            Đánh giá sản phẩm
          </button>
        </>
      )}

      {status === 'pending' && (
        <button
          type="button"
          onClick={onOpenCancelModal}
          className="w-full bg-red-50 hover:bg-red-100 text-[#E30019] border border-red-200 font-bold py-3 px-4 rounded-[6px] text-xs md:text-sm transition-all cursor-pointer"
        >
          Hủy đơn hàng này
        </button>
      )}

      {(status === 'shipping' || status === 'processing') && (
        <button
          type="button"
          onClick={() => onShowNotification(`Mã vận đơn: ${trackingCode || 'NEX-7739102'}`)}
          className="w-full bg-black text-white hover:bg-zinc-800 font-bold py-3 px-4 rounded-[6px] text-xs md:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>Tra cứu vận chuyển</span>
        </button>
      )}

      {status === 'cancelled' && itemCount === 1 && (
        <button
          type="button"
          onClick={onReorder}
          className="w-full bg-[#E30019] hover:bg-[#cc0016] text-white font-bold py-3 px-4 rounded-[6px] flex items-center justify-center gap-2 text-xs md:text-sm transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Mua lại đơn hàng</span>
        </button>
      )}

      <a
        href="tel:18009999"
        className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold py-2.5 px-4 rounded-[6px] text-xs md:text-sm transition-all flex items-center justify-center gap-2"
      >
        <Headphones className="w-4 h-4 text-gray-500" />
        <span>Liên hệ chăm sóc khách hàng</span>
      </a>
    </div>
  )
}
