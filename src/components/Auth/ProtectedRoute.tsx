
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/constants'
import type { ProtectedRouteProps } from '@/types/common/ui.type'

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, openLoginModal } = useAuth()

  if (!isAuthenticated || !user) {
    openLoginModal()
    return <Navigate to={ROUTES.HOME} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.redirectPath || ROUTES.HOME} replace />
  }

  return <>{children}</>
}
