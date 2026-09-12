import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { HomePage } from '@/pages/Home/HomePage'
import { BlogManagementPage } from '@/pages/AdminBlog/BlogManagementPage'
import { AccountSettingsPage } from '@/pages/AccountSettings/AccountSettingsPage'
import { BlogListPage } from '@/pages/Blog/BlogListPage'
import { BlogDetailPage } from '@/pages/Blog/BlogDetailPage'
import { UserProfilePage } from '@/pages/Profile/UserProfilePage'
import { TechStaffDashboard } from '@/pages/Admin/TechStaffDashboard'
import { WarehouseDashboard } from '@/pages/Admin/WarehouseDashboard'
import { RegisterPage } from '@/pages/Register/RegisterPage'
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute allowedRoles={['USER', 'STORE_MANAGER', 'TECH_STAFF', 'WAREHOUSE_STORE']}>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'blogs',
        element: <BlogListPage />,
      },
      {
        path: 'blogs/:id',
        element: <BlogDetailPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'tech-staff',
        element: (
          <ProtectedRoute allowedRoles={['TECH_STAFF']}>
            <TechStaffDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'warehouse',
        element: (
          <ProtectedRoute allowedRoles={['WAREHOUSE_STORE']}>
            <WarehouseDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/storemanager',
    element: (
      <ProtectedRoute allowedRoles={['STORE_MANAGER']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/storemanager/blogs" replace />,
      },
      {
        path: 'blogs',
        element: <BlogManagementPage />,
      },
      {
        path: 'settings',
        element: <AccountSettingsPage />,
      },
    ],
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])
