import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

type WarehouseRole = 'ADMIN' | 'WAREHOUSE_STAFF'

const allowedRoles: WarehouseRole[] = ['ADMIN', 'WAREHOUSE_STAFF']

export function WarehouseRouteGuard() {
  const location = useLocation()
  const currentRole: WarehouseRole = 'WAREHOUSE_STAFF'
  if (!allowedRoles.includes(currentRole)) return <Navigate to={ROUTES.home} replace state={{ from: location.pathname }} />
  return <Outlet />
}
