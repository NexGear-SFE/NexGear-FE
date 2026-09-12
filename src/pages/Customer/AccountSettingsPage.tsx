import { useState } from 'react'
import { LayoutDashboard, Package, ShieldCheck, User, Wrench } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { SharedAccountSettings } from '@/components/common/SharedAccountSettings'
import type { UserProfile } from '@/types/account.type'

type CustomerTab = 'overview' | 'orders' | 'warranty' | 'profile'

export function CustomerAccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<CustomerTab>('profile')
  const { user } = useAuth()

  const tabs = [
    { key: 'overview' as CustomerTab, label: 'Tổng quan', icon: <LayoutDashboard size={16} /> },
    { key: 'orders' as CustomerTab, label: 'Đơn hàng của tôi', icon: <Package size={16} /> },
    { key: 'warranty' as CustomerTab, label: 'Bảo hành', icon: <ShieldCheck size={16} /> },
    { key: 'profile' as CustomerTab, label: 'Thông tin cá nhân', icon: <User size={16} /> },
  ]

  const customerUser: UserProfile = {
    name: user?.name || 'Nguyễn Văn Khách',
    email: user?.email || 'customer@gmail.com',
    phone: '0987654321',
    roleName: 'Khách hàng thành viên',
    roleBadge: 'CUSTOMER',
    roleDescription: 'Tài khoản mua sắm và theo dõi đơn hàng',
    avatarUrl: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    avatarInitials: user?.name ? user.name.charAt(0).toUpperCase() : 'KH',
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
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
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
          {activeTab === 'overview' && (
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30019] mx-auto flex items-center justify-center">
                <Wrench className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#040004]">Tính năng Tổng quan</h3>
                <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto">
                  Tính năng xem tổng quan đang được hoàn thiện và sẽ ra mắt trong thời gian sớm nhất!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30019] mx-auto flex items-center justify-center">
                <Package className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#040004]">Quản lý Đơn hàng của tôi</h3>
                <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto">
                  Tính năng theo dõi đơn hàng và lịch sử mua sắm đang trong quá trình phát triển!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30019] mx-auto flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#040004]">Trung tâm Bảo hành</h3>
                <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto">
                  Tính năng yêu cầu và tra cứu bảo hành sản phẩm đang được phát triển!
                </p>
              </div>
            </div>
          )}

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
