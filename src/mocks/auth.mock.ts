import type { User } from '@/types/auth.type'
import { USER_ROLES } from '../constants/roles'

export const DEFAULT_MOCK_PASSWORD = '123456'

export const MOCK_USERS: User[] = [
  {
    id: 'usr_001',
    email: 'user@gmail.com',
    name: 'Nguyễn Văn Khách',
    role: USER_ROLES.USER,
    roleName: 'Khách hàng',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    phone: '0901234567',
    redirectPath: '/',
  },
  {
    id: 'usr_002',
    email: 'storemanager@gmail.com',
    name: 'Quản Lý Cửa Hàng',
    role: USER_ROLES.STORE_MANAGER,
    roleName: 'Store Manager',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    phone: '0987654321',
    redirectPath: '/storemanager',
  },
  {
    id: 'usr_003',
    email: 'techstaff@gmail.com',
    name: 'Kỹ Thuật Viên Tech',
    role: USER_ROLES.TECH_STAFF,
    roleName: 'Tech Staff',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    phone: '0912345678',
    redirectPath: '/admin/tech-staff',
  },
  {
    id: 'usr_004',
    email: 'warehousestore@gmail.com',
    name: 'Thủ Kho GearGo',
    role: USER_ROLES.WAREHOUSE_STORE,
    roleName: 'Warehouse Store',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    phone: '0933445566',
    redirectPath: '/admin/warehouse',
  },
]
