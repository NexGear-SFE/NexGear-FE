import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { HomePage } from '@/pages/Home/HomePage'
import { BlogManagementPage } from '@/pages/AdminBlog/BlogManagementPage'
import { AccountSettingsPage } from '@/pages/AccountSettings/AccountSettingsPage'
import { BlogListPage } from '@/pages/Blog/BlogListPage'
import { BlogDetailPage } from '@/pages/Blog/BlogDetailPage'

import { RegisterPage } from '@/pages/Register/RegisterPage'
import { LoginPage } from '@/pages/Login/LoginPage'
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute'
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
  // {
  //   path: '/admin',
  //   element: <AdminLayout />,
  //   children: [
  //     {
  //       path: 'tech-staff',
  //       element: (
  //         <ProtectedRoute allowedRoles={ALLOWED_ROLES.TECH_STAFF}>
  //           <TechStaffDashboard />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: 'warehouse',
  //       element: (
  //         <ProtectedRoute allowedRoles={ALLOWED_ROLES.WAREHOUSE_STORE}>
  //           <WarehouseDashboard />
  //         </ProtectedRoute>
  //       ),
  //     },
  //   ],
  // },
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
])
