import type { UserProfile } from '@/types/account.type'

export type CustomerTabKey = 'overview' | 'orders' | 'warranty' | 'profile'

export const CUSTOMER_VALID_TABS: CustomerTabKey[] = ['overview', 'orders', 'warranty', 'profile']

export const DEFAULT_CUSTOMER_TAB: CustomerTabKey = 'profile'

export type OrderFilterStatus = 'all' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'returned'

export const ORDER_STATUS_FILTERS: { key: OrderFilterStatus; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'processing', label: 'Đang xử lý' },
  { key: 'shipping', label: 'Đang giao' },
  { key: 'delivered', label: 'Hoàn tất' },
  { key: 'cancelled', label: 'Đã hủy' },
  { key: 'returned', label: 'Trả hàng' },
]

export const DEFAULT_CUSTOMER_PROFILE: UserProfile = {
  name: 'Nguyễn Văn Khách',
  email: 'customer@gmail.com',
  phone: '0901234567',
  roleName: 'Khách hàng thành viên',
  roleBadge: 'CUSTOMER',
  roleDescription: 'Tài khoản mua sắm và theo dõi đơn hàng',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  avatarInitials: 'KH',
}
