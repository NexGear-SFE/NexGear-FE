import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { LayoutDashboard, Package, ShieldCheck, User, Search, ChevronRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { SharedAccountSettings } from '@/components/common/SharedAccountSettings'
import type { UserProfile } from '@/types/account.type'
import { MOCK_ORDERS } from '@/mocks/customer/order.mock'
import { formatCurrency } from '@/utils/formatCurrency'
import { WarrantyRequestList } from '@/components/customer/Warranty/WarrantyRequestList'
import { CreateWarrantyModal } from '@/components/customer/Warranty/CreateWarrantyModal'
import { WarrantyDetailModal } from '@/components/customer/Warranty/WarrantyDetailModal'
import { MOCK_CUSTOMER_WARRANTY_REQUESTS } from '@/mocks/customer/warranty.mock'
import type { CustomerWarrantyRequest } from '@/types/customerWarranty.type'

type CustomerTab = 'overview' | 'orders' | 'warranty' | 'profile'
type OrderFilterStatus = 'all' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'returned'

export function CustomerAccountSettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as CustomerTab
  const activeTab: CustomerTab = (tabParam && ['overview', 'orders', 'warranty', 'profile'].includes(tabParam))
    ? tabParam
    : 'profile'

  const [orderFilter, setOrderFilter] = useState<OrderFilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useAuth()

  // Warranty Tab States
  const [warrantyRequests, setWarrantyRequests] = useState<CustomerWarrantyRequest[]>(MOCK_CUSTOMER_WARRANTY_REQUESTS)
  const [isCreateWarrantyOpen, setIsCreateWarrantyOpen] = useState(false)
  const [selectedWarrantyDetail, setSelectedWarrantyDetail] = useState<CustomerWarrantyRequest | null>(null)

  const handleTabChange = (tabKey: CustomerTab) => {
    setSearchParams({ tab: tabKey })
  }

  const tabs = [
    { key: 'overview' as CustomerTab, label: 'Tổng quan', icon: <LayoutDashboard size={16} /> },
    { key: 'orders' as CustomerTab, label: 'Đơn hàng của tôi', icon: <Package size={16} /> },
    { key: 'warranty' as CustomerTab, label: 'Bảo hành', icon: <ShieldCheck size={16} /> },
    { key: 'profile' as CustomerTab, label: 'Thông tin cá nhân', icon: <User size={16} /> },
  ]

  const orderStatusFilters: { key: OrderFilterStatus; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'processing', label: 'Đang xử lý' },
    { key: 'shipping', label: 'Đang giao' },
    { key: 'delivered', label: 'Hoàn tất' },
    { key: 'cancelled', label: 'Đã hủy' },
    { key: 'returned', label: 'Trả hàng' },
  ]

  const customerUser: UserProfile = {
    name: user?.name || 'Nguyễn Văn Khách',
    email: user?.email || 'customer@gmail.com',
    phone: '0901234567',
    roleName: 'Khách hàng thành viên',
    roleBadge: 'CUSTOMER',
    roleDescription: 'Tài khoản mua sắm và theo dõi đơn hàng',
    avatarUrl: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    avatarInitials: user?.name ? user.name.charAt(0).toUpperCase() : 'KH',
  }

  // Filter orders logic
  const filteredOrders = MOCK_ORDERS.filter((order) => {
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
    <div className="bg-[#F4F5F7] min-h-screen py-6 md:py-8 font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Horizontal Navigation Tabs */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-2 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-xs">
          {tabs.map((t) => {
            const isActive = activeTab === t.key
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => handleTabChange(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${isActive
                    ? 'bg-[#E30019] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Contents */}
        <div>
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#040004]">
                    Xin chào, {user?.name || 'Nguyễn Văn Khách'}!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Chào mừng bạn quay trở lại NexGear. Quản lý đơn hàng, bảo hành và thông tin tài khoản của bạn tại đây.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTabChange('orders')}
                    className="inline-flex items-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-[6px] transition-all cursor-pointer shadow-xs"
                  >
                    <Package className="w-4 h-4" />
                    <span>Xem đơn hàng ({MOCK_ORDERS.length})</span>
                  </button>
                </div>
              </div>

              {/* Quick Access Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Orders */}
                <div
                  onClick={() => handleTabChange('orders')}
                  className="bg-white rounded-xl border border-[#E0E0E0] hover:border-[#E30019] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-red-50 text-[#E30019] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Package className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                      {MOCK_ORDERS.length} đơn
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
                  onClick={() => handleTabChange('warranty')}
                  className="bg-white rounded-xl border border-[#E0E0E0] hover:border-[#E30019] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                      {warrantyRequests.length} yêu cầu
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
                  onClick={() => handleTabChange('profile')}
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

              {/* Recent Orders Section */}
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#040004]">
                    Đơn hàng gần đây
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleTabChange('orders')}
                    className="text-xs font-bold text-[#E30019] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem tất cả đơn hàng ({MOCK_ORDERS.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {MOCK_ORDERS.slice(0, 3).map((order) => {
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
          )}

          {/* 2. MY ORDERS TAB (Exact match with design mockup) */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 space-y-6 shadow-xs">
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
                {orderStatusFilters.map((filter) => {
                  const isActive = orderFilter === filter.key
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setOrderFilter(filter.key)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${isActive
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
          )}

          {/* 3. WARRANTY TAB */}
          {activeTab === 'warranty' && (
            <>
              <WarrantyRequestList
                requests={warrantyRequests}
                onOpenCreateModal={() => setIsCreateWarrantyOpen(true)}
                onSelectRequest={(req) => setSelectedWarrantyDetail(req)}
              />
              <CreateWarrantyModal
                isOpen={isCreateWarrantyOpen}
                onClose={() => setIsCreateWarrantyOpen(false)}
                onSubmitSuccess={(newReq) => setWarrantyRequests((prev) => [newReq, ...prev])}
              />
              <WarrantyDetailModal
                request={selectedWarrantyDetail}
                isOpen={Boolean(selectedWarrantyDetail)}
                onClose={() => setSelectedWarrantyDetail(null)}
              />
            </>
          )}

          {/* 4. PERSONAL PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 shadow-xs">
              <div className="mb-6">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-body">
                  TÀI KHOẢN KHÁCH HÀNG
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-[#040004] font-heading mt-1">
                  Thông tin cá nhân &amp; Bảo mật
                </h2>
                <p className="text-xs md:text-sm text-[#636363] font-body mt-1">
                  Quản lý thông tin hồ sơ và thay đổi mật khẩu tài khoản của bạn.
                </p>
              </div>
              <SharedAccountSettings user={customerUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
