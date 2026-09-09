import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { HomePage } from '@/pages/Home/HomePage'
import { BlogManagementPage } from '@/pages/AdminBlog/BlogManagementPage'
import { AccountSettingsPage } from '@/pages/AccountSettings/AccountSettingsPage'
import { BlogListPage } from '@/pages/Blog/BlogListPage'
import { BlogDetailPage } from '@/pages/Blog/BlogDetailPage'

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
    element: <AdminLayout />,
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
])

