import type { UserRole } from '@/types/auth.type'

export const USER_ROLES = {
  USER: 'USER',
  STORE_MANAGER: 'STORE_MANAGER',
  TECH_STAFF: 'TECH_STAFF',
  WAREHOUSE_STORE: 'WAREHOUSE_STORE',
} as const satisfies Record<string, UserRole>

export const ALLOWED_ROLES = {
  ALL: [
    USER_ROLES.USER,
    USER_ROLES.STORE_MANAGER,
    USER_ROLES.TECH_STAFF,
    USER_ROLES.WAREHOUSE_STORE,
  ] as UserRole[],
  USER_ONLY: [USER_ROLES.USER] as UserRole[],
  STORE_MANAGER: [USER_ROLES.STORE_MANAGER] as UserRole[],
  TECH_STAFF: [USER_ROLES.TECH_STAFF] as UserRole[],
  WAREHOUSE_STORE: [USER_ROLES.WAREHOUSE_STORE] as UserRole[],
  ADMIN_STAFF: [
    USER_ROLES.STORE_MANAGER,
    USER_ROLES.TECH_STAFF,
    USER_ROLES.WAREHOUSE_STORE,
  ] as UserRole[],
} as const
