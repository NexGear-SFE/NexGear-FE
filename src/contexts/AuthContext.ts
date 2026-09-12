import { createContext } from 'react'
import type { User, LoginPayload } from '@/types/auth.type'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
  login: (payload: LoginPayload) => { success: boolean; user?: User; error?: string }
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
