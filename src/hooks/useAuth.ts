import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthContext'
import type { AuthContextType } from '@/providers/AuthContext'



export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
