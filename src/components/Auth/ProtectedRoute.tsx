import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import type { UserRole } from '@/types/auth.type'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, openLoginModal } = useAuth()

  if (!isAuthenticated || !user) {
    openLoginModal()
    return <Navigate to="/" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.redirectPath || '/'} replace />
  }

  return <>{children}</>
}
