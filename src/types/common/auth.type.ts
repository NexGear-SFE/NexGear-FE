export type UserRole = 'USER' | 'STORE_MANAGER' | 'TECH_STAFF' | 'WAREHOUSE_STORE'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  roleName: string
  avatar?: string
  phone?: string
  redirectPath: string
}

export interface LoginPayload {
  email: string
  password?: string
  rememberMe?: boolean
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
