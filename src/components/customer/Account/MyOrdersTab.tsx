import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Package, ChevronRight } from 'lucide-react'
import type { Order } from '@/types/order.type'
import { ORDER_STATUS_FILTERS, type OrderFilterStatus } from '@/constants/customerAccount.constant'
import { formatCurrency } from '@/utils/formatCurrency'

interface MyOrdersTabProps {
  orders: Order[]
}

export function MyOrdersTab({ orders }: MyOrdersTabProps) {
  const [orderFilter, setOrderFilter] = useState<OrderFilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter orders logic
  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (orderFilter === 'processing') {
      if (order.status !== 'pending' && order.status !== 'confirmed' && order.status !== 'processing') return false
    } else if (orderFilter === 'shipping') {
      if (order.status !== 'shipping') return false
    } else if (orderFilter === 'delivered') {
      if (order.status !== 'delivered') return false
    } else if (orderFilter === 'cancelled') {
      if (order.status !== 'cancelled') return false
    } else if (orderFilter === 'returned') {
      if (order.status !== 'returned') return false
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchCode = order.orderCode.toLowerCase().includes(q)
      const matchProduct = order.items.some((item) => item.name.toLowerCase().includes(q))
      if (!matchCode && !matchProduct) return false
    }

    return true
  })

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs">
            Đã giao
          </span>
        )
      case 'shipping':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs">
            Đang giao
          </span>
        )
      case 'pending':
      case 'confirmed':
      case 'processing':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs">
            Đang xử lý
          </span>
        )
      case 'cancelled':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs">
            Đã hủy
          </span>
        )
      case 'returned':
        return (
          <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1 rounded-[4px]">
            Trả hàng
          </span>
        )
      default:
        return (
          <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-[4px]">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 space-y-6 shadow-xs font-body">
      {/* Header Title & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold font-heading text-[#040004]">
          Đơn hàng của tôi
        </h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên sản phẩm..."
            className="w-full bg-white border border-[#E0E0E0] rounded-[6px] py-2 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E30019] transition-all"
          />
        </div>
      </div>

      {/* Sub-filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-gray-100">
        {ORDER_STATUS_FILTERS.map((filter) => {
          const isActive = orderFilter === filter.key
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setOrderFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-red-50 text-[#E30019] border border-red-200'
                  : 'text-gray-600 hover:text-[#040004] hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {/* Order Cards List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-400 space-y-2">
            <Package className="w-12 h-12 text-gray-300 mx-auto stroke-1" />
            <p className="text-sm font-semibold text-gray-600">Không tìm thấy đơn hàng nào</p>
            <p className="text-xs text-gray-400">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái nhé.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const firstItem = order.items[0]
            return (
              <div
                key={order.id}
                className="border border-[#E0E0E0] rounded-[10px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-300 transition-all bg-white shadow-2xs"
              >
                {/* Left: Product Thumbnail & Order Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F4F5F7] rounded-[8px] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={firstItem.image}
                      alt={firstItem.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="font-bold text-sm sm:text-base text-[#040004] leading-snug line-clamp-2">
                      {firstItem.name}
                      {firstItem.quantity > 1 && (
                        <span className="text-xs sm:text-sm text-gray-600 font-semibold ml-1.5">
                          x{firstItem.quantity}
                        </span>
                      )}
                      {order.items.length > 1 && (
                        <span className="text-xs sm:text-sm text-gray-500 font-normal ml-1">
                          và {order.items.length - 1} sản phẩm khác
                        </span>
                      )}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono flex-wrap">
                      <span>{order.createdAt}</span>
                      <span>·</span>
                      <span className="font-bold text-[#E30019]">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Badge & View Detail Button */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {renderStatusBadge(order.status)}

                  <Link
                    to={`/account/orders/${order.id}`}
                    className="inline-flex items-center justify-center border border-gray-300 hover:border-[#E30019] text-gray-800 hover:text-[#E30019] text-xs font-bold px-4 py-2 rounded-[6px] transition-all bg-white shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    <span>Xem chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
