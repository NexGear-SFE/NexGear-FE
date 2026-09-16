import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { ALLOWED_ROLES } from '@/constants/roles';

// Layouts
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { TechStaffLayout } from '@/layouts/TechStaffLayout';

// Auth & Protection
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Customer Pages
import { HomePage } from '@/pages/customer/Home/HomePage';
import { ProductDetailPage } from '@/pages/customer/Product/ProductDetailPage';
import { BlogListPage } from '@/pages/customer/Blog/BlogListPage';
import { BlogDetailPage } from '@/pages/customer/Blog/BlogDetailPage';
import { CustomerAccountSettingsPage } from '@/pages/customer/AccountSettingsPage';
import { OrderDetailPage } from '@/pages/customer/Order/OrderDetailPage';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';

// Common Pages
import { AccountSettingsPage } from '@/pages/common/AccountSettingsPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';

// Admin / Store Manager Pages
import { BlogManagementPage } from '@/pages/admin/BlogManagementPage';

// Tech Staff Pages
import { TechStaffDashboard } from '@/pages/techstaff/Dashboard';
import { SerialCheck } from '@/pages/techstaff/SerialCheck';
import { Settings } from '@/pages/techstaff/Settings';

export const router = createBrowserRouter([
  // ==========================================
  // 1. CUSTOMER / PUBLIC ROUTES
  // ==========================================
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.PRODUCT_DETAIL(),
        element: <ProductDetailPage />,
      },
      {
        path: ROUTES.ACCOUNT.SETTINGS,
        element: <CustomerAccountSettingsPage />,
      },
      {
        path: ROUTES.ACCOUNT.ORDER_DETAIL(),
        element: <OrderDetailPage />,
      },
      {
        path: ROUTES.ACCOUNT.ROOT,
        element: <Navigate to={ROUTES.ACCOUNT.SETTINGS} replace />,
      },
      {
        path: ROUTES.BLOGS,
        element: <BlogListPage />,
      },
      {
        path: ROUTES.BLOG_DETAIL(),
        element: <BlogDetailPage />,
      },
    ],
  },

  // ==========================================
  // 2. AUTHENTICATION ROUTES
  // ==========================================
  {
    path: ROUTES.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: <RegisterPage />,
  },

  // ==========================================
  // 3. STORE MANAGER / ADMIN ROUTES
  // ==========================================
  {
    path: ROUTES.STORE_MANAGER.ROOT,
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.STORE_MANAGER}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.STORE_MANAGER.BLOGS} replace />,
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

  // ==========================================
  // 4. TECH STAFF ROUTES
  // ==========================================
  {
    path: ROUTES.TECH_STAFF.ROOT,
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

  // ==========================================
  // 5. FALLBACK & 404 NOT FOUND ROUTES
  // ==========================================
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
