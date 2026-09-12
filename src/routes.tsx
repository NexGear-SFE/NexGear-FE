import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout'
import { HomePage } from '@/pages/customer/HomePage';
import { TechStaffLayout } from '@/layouts/TechStaffLayout';
import { TechStaffDashboard } from '@/pages/techstaff/Dashboard';
import { SerialCheck } from '@/pages/techstaff/SerialCheck';
import { Settings } from '@/pages/techstaff/Settings';
import { BlogManagementPage } from '@/pages/admin/BlogManagementPage'
import { AccountSettingsPage } from '@/pages/common/AccountSettingsPage'
import { BlogListPage } from '@/pages/customer/BlogListPage'
import { BlogDetailPage } from '@/pages/customer/BlogDetailPage'

import { RegisterPage } from '@/pages/auth/RegisterPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { ALLOWED_ROLES } from '@/constants/roles'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // {
      //   path: 'profile',
      //   element: (
      //     <ProtectedRoute allowedRoles={ALLOWED_ROLES.ALL}>
      //       <UserProfilePage />
      //     </ProtectedRoute>
      //   ),
      // },
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
    path: '/storemanager',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.STORE_MANAGER}>
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
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/tech-staff',
    element: <TechStaffLayout />,
    children: [
      {
        index: true,
        element: <TechStaffDashboard />,
      },
      {
        path: 'serial',
        element: <SerialCheck />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);
