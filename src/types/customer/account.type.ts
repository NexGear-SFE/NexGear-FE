import type { Order } from './order.type'
import type { CustomerTabKey } from '@/constants/customerAccount.constant'

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  roleName: string;
  roleBadge: string;
  roleDescription: string;
  avatarUrl: string;
  avatarInitials: string;
}

export interface AccountOverviewTabProps {
  userName?: string
  orderCount: number
  warrantyCount: number
  recentOrders: Order[]
  onTabChange: (tabKey: CustomerTabKey) => void
}
