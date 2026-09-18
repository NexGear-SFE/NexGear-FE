import { Link } from 'react-router-dom'
import { Package, ShieldCheck, User, ChevronRight, CheckCircle2, Truck, Clock, XCircle } from 'lucide-react'
import type { Order } from '@/types/order.type'
import type { CustomerTabKey } from '@/constants/customerAccount.constant'
import { formatCurrency } from '@/utils/formatCurrency'

interface AccountOverviewTabProps {
  userName?: string
  orderCount: number
  warrantyCount: number
  recentOrders: Order[]
  onTabChange: (tabKey: CustomerTabKey) => void
}

export function AccountOverviewTab({
  userName,
  orderCount,
  warrantyCount,
  recentOrders,
  onTabChange,
}: AccountOverviewTabProps) {
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Đã giao
          </span>
        )
      case 'shipping':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            Đang giao
          </span>
        )
      case 'pending':
      case 'confirmed':
      case 'processing':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Đang xử lý
          </span>
        )
      case 'cancelled':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            Đã hủy
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
    <div className="space-y-6 font-body">
      {/* 1. Welcome Header */}
      <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#040004]">
            Xin chào, {userName || 'Nguyễn Văn Khách'}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Chào mừng bạn quay trở lại NexGear. Quản lý đơn hàng, bảo hành và thông tin tài khoản của bạn tại đây.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onTabChange('orders')}
            className="inline-flex items-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-[6px] transition-all cursor-pointer shadow-xs"
          >
            <Package className="w-4 h-4" />
            <span>Xem đơn hàng ({orderCount})</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Orders */}
        <div
          onClick={() => onTabChange('orders')}
          className="bg-white rounded-xl border border-[#E0E0E0] hover:border-[#E30019] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-red-50 text-[#E30019] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
              {orderCount} đơn
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-[#040004] group-hover:text-[#E30019] transition-colors">
              Đơn hàng của tôi
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Theo dõi trạng thái giao hàng, lịch sử mua và xem chi tiết hóa đơn.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-[#E30019] pt-2 border-t border-gray-100">
            <span>Xem đơn hàng</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Warranty */}
        <div
          onClick={() => onTabChange('warranty')}
          className="bg-white rounded-xl border border-[#E0E0E0] hover:border-[#E30019] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
              {warrantyCount} yêu cầu
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-[#040004] group-hover:text-[#E30019] transition-colors">
              Yêu cầu bảo hành
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Gửi yêu cầu bảo hành mới và kiểm tra tiến trình xử lý kỹ thuật.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-[#E30019] pt-2 border-t border-gray-100">
            <span>Xem bảo hành</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Profile */}
        <div
          onClick={() => onTabChange('profile')}
          className="bg-white rounded-xl border border-[#E0E0E0] hover:border-[#E30019] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
              Hồ sơ cá nhân
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-[#040004] group-hover:text-[#E30019] transition-colors">
              Thông tin &amp; Bảo mật
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cập nhật tên, email, số điện thoại và thay đổi mật khẩu đăng nhập.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-[#E30019] pt-2 border-t border-gray-100">
            <span>Cập nhật hồ sơ</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 3. Recent Orders Section */}
      <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold font-heading text-[#040004]">
            Đơn hàng gần đây
          </h3>
          <button
            type="button"
            onClick={() => onTabChange('orders')}
            className="text-xs font-bold text-[#E30019] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Xem tất cả đơn hàng ({orderCount})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {recentOrders.slice(0, 3).map((order) => {
            const firstItem = order.items[0]
            return (
              <div
                key={order.id}
                className="border border-[#E0E0E0] rounded-[10px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-300 transition-all bg-white shadow-2xs"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-14 h-14 bg-[#F4F5F7] rounded-[8px] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={firstItem.image}
                      alt={firstItem.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#040004] leading-snug line-clamp-1">
                      {firstItem.name}
                      {firstItem.quantity > 1 && (
                        <span className="text-xs text-gray-600 font-semibold ml-1.5">
                          x{firstItem.quantity}
                        </span>
                      )}
                      {order.items.length > 1 && (
                        <span className="text-xs text-gray-500 font-normal ml-1">
                          và {order.items.length - 1} sản phẩm khác
                        </span>
                      )}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono flex-wrap">
                      <span>{order.createdAt}</span>
                      <span>·</span>
                      <span className="font-bold text-[#E30019]">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {renderStatusBadge(order.status)}

                  <Link
                    to={`/account/orders/${order.id}`}
                    className="inline-flex items-center justify-center border border-gray-300 hover:border-[#E30019] text-gray-800 hover:text-[#E30019] text-xs font-bold px-3 py-1.5 rounded-[6px] transition-all bg-white shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    <span>Xem chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
