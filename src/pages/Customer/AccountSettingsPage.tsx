import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutDashboard, Package, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { SharedAccountSettings } from '@/components/common/SharedAccountSettings'
import { AccountOverviewTab } from '@/components/customer/Account/AccountOverviewTab'
import { MyOrdersTab } from '@/components/customer/Account/MyOrdersTab'
import { WarrantyRequestList } from '@/components/customer/Warranty/WarrantyRequestList'
import { CreateWarrantyModal } from '@/components/customer/Warranty/CreateWarrantyModal'
import { WarrantyDetailModal } from '@/components/customer/Warranty/WarrantyDetailModal'

import { MOCK_ORDERS } from '@/mocks/customer/order.mock'
import { MOCK_CUSTOMER_WARRANTY_REQUESTS } from '@/mocks/customer/warranty.mock'
import type { CustomerWarrantyRequest } from '@/types/customerWarranty.type'
import {
  CUSTOMER_VALID_TABS,
  DEFAULT_CUSTOMER_TAB,
  DEFAULT_CUSTOMER_PROFILE,
  type CustomerTabKey,
} from '@/constants/customerAccount.constant'

export function CustomerAccountSettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as CustomerTabKey
  const activeTab: CustomerTabKey = CUSTOMER_VALID_TABS.includes(tabParam) ? tabParam : DEFAULT_CUSTOMER_TAB

  const { user } = useAuth()

  // Warranty Tab States
  const [warrantyRequests, setWarrantyRequests] = useState<CustomerWarrantyRequest[]>(MOCK_CUSTOMER_WARRANTY_REQUESTS)
  const [isCreateWarrantyOpen, setIsCreateWarrantyOpen] = useState(false)
  const [selectedWarrantyDetail, setSelectedWarrantyDetail] = useState<CustomerWarrantyRequest | null>(null)

  const handleTabChange = (tabKey: CustomerTabKey) => {
    setSearchParams({ tab: tabKey })
  }

  const tabs = [
    { key: 'overview' as CustomerTabKey, label: 'Tổng quan', icon: <LayoutDashboard size={16} /> },
    { key: 'orders' as CustomerTabKey, label: 'Đơn hàng của tôi', icon: <Package size={16} /> },
    { key: 'warranty' as CustomerTabKey, label: 'Bảo hành', icon: <ShieldCheck size={16} /> },
    { key: 'profile' as CustomerTabKey, label: 'Thông tin cá nhân', icon: <User size={16} /> },
  ]

  const customerUser = {
    ...DEFAULT_CUSTOMER_PROFILE,
    name: user?.name || DEFAULT_CUSTOMER_PROFILE.name,
    email: user?.email || DEFAULT_CUSTOMER_PROFILE.email,
    avatarUrl: user?.avatar || DEFAULT_CUSTOMER_PROFILE.avatarUrl,
    avatarInitials: user?.name ? user.name.charAt(0).toUpperCase() : DEFAULT_CUSTOMER_PROFILE.avatarInitials,
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
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <AccountOverviewTab
              userName={user?.name}
              orderCount={MOCK_ORDERS.length}
              warrantyCount={warrantyRequests.length}
              recentOrders={MOCK_ORDERS}
              onTabChange={handleTabChange}
            />
          )}

          {/* 2. MY ORDERS TAB */}
          {activeTab === 'orders' && <MyOrdersTab orders={MOCK_ORDERS} />}

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
