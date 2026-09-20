import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { ALLOWED_ROLES } from '@/constants/roles';

// Khung bố cục giao diện
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { TechStaffLayout } from '@/layouts/TechStaffLayout';

// Xác thực & Bảo vệ tuyến đường
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Trang Khách hàng
import { HomePage } from '@/pages/customer/Home/HomePage';
import { ProductDetailPage } from '@/pages/customer/Product/ProductDetailPage';
import { BlogListPage } from '@/pages/customer/Blog/BlogListPage';
import { BlogDetailPage } from '@/pages/customer/Blog/BlogDetailPage';
import { CustomerAccountSettingsPage } from '@/pages/customer/AccountSettingsPage';
import { OrderDetailPage } from '@/pages/customer/Order/OrderDetailPage';

// Trang Xác thực
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';

// Trang Dùng chung
import { AccountSettingsPage } from '@/pages/common/AccountSettingsPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';

// Trang Quản lý Cửa hàng
import { BlogManagementPage } from '@/pages/admin/BlogManagementPage';
import { HomePageConfig } from '@/pages/admin/HomePageConfig';

// Trang Nhân viên Kỹ thuật
import { TechStaffDashboard } from '@/pages/techstaff/Dashboard';
import { SerialCheck } from '@/pages/techstaff/SerialCheck';
import { Settings } from '@/pages/techstaff/Settings';

export const router = createBrowserRouter([
  // ==========================================
  // 1. ĐƯỜNG DẪN KHÁCH HÀNG / CÔNG KHẢI
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
  // 2. ĐƯỜNG DẪN XÁC THỰC TÀI KHOẢN
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
  // 3. ĐƯỜNG DẪN QUẢN LÝ CỬA HÀNG (STORE MANAGER / ADMIN)
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
        element: <Navigate to={ROUTES.STORE_MANAGER.HOME_CONTENT} replace />,
      },
      {
        path: ROUTES.STORE_MANAGER.SUB_PATHS.HOME_CONTENT,
        element: <HomePageConfig />,
      },
      {
        path: ROUTES.STORE_MANAGER.SUB_PATHS.HOME_CONFIG,
        element: <HomePageConfig />,
      },
      {
        path: ROUTES.STORE_MANAGER.SUB_PATHS.DASHBOARD,
        element: <Navigate to={ROUTES.STORE_MANAGER.HOME_CONTENT} replace />,
      },
      {
        path: ROUTES.STORE_MANAGER.SUB_PATHS.BLOGS,
        element: <BlogManagementPage />,
      },
      {
        path: ROUTES.STORE_MANAGER.SUB_PATHS.SETTINGS,
        element: <AccountSettingsPage />,
      },
    ],
  },

  // ==========================================
  // 4. ĐƯỜNG DẪN NHÂN VIÊN KỸ THUẬT
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
        path: ROUTES.TECH_STAFF.SUB_PATHS.SERIAL,
        element: <SerialCheck />,
      },
      {
        path: ROUTES.TECH_STAFF.SUB_PATHS.SETTINGS,
        element: <Settings />,
      },
    ],
  },

  // ==========================================
  // 5. ĐƯỜNG DẪN TRANG 404 KHÔNG TÌM THẤY TRANG
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
