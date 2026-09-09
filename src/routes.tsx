import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/Home/HomePage'
import { WarehouseLayout } from '@/layouts/WarehouseLayout'
import { WarehouseComingSoonPage } from '@/pages/Warehouse/WarehouseComingSoonPage'
import { WarehouseRouteGuard } from '@/components/warehouse/WarehouseRouteGuard'
import { CategoryManagementPage } from '@/pages/Warehouse/Categories/CategoryManagementPage'
import { ProductDetailPage } from '@/pages/Warehouse/Products/ProductDetailPage'
import { ProductListPage } from '@/pages/Warehouse/Products/ProductListPage'
import { ProductWizardPage } from '@/pages/Warehouse/Products/ProductWizardPage'
import { InventoryDetailPage } from '@/pages/Warehouse/Inventory/InventoryDetailPage'
import { InventoryListPage } from '@/pages/Warehouse/Inventory/InventoryListPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <WarehouseRouteGuard />,
    children: [{
      path: '/admin/warehouse',
      element: <WarehouseLayout />,
      children: [
        { index: true, element: <WarehouseComingSoonPage title="Tổng quan kho" description="Theo dõi nhanh các công việc vận hành trong ngày." /> },
        { path: 'orders', element: <WarehouseComingSoonPage title="Đơn hàng" description="Xử lý quy trình xuất kho và bàn giao vận chuyển." /> },
        { path: 'orders/:orderId', element: <WarehouseComingSoonPage title="Chi tiết đơn hàng" description="Theo dõi và cập nhật từng bước xử lý đơn." /> },
        { path: 'receipts', element: <WarehouseComingSoonPage title="Phiếu nhập kho" description="Quản lý các lần nhập hàng và kiểm đếm serial." /> },
        { path: 'receipts/new', element: <WarehouseComingSoonPage title="Tạo phiếu nhập" description="Ghi nhận lô hàng mới vào kho." /> },
        { path: 'receipts/:receiptId', element: <WarehouseComingSoonPage title="Chi tiết phiếu nhập" description="Kiểm tra thông tin và trạng thái phiếu nhập." /> },
        { path: 'products', element: <ProductListPage /> },
        { path: 'products/new', element: <ProductWizardPage /> },
        { path: 'products/:productId', element: <ProductDetailPage /> },
        { path: 'products/:productId/edit', element: <ProductWizardPage /> },
        { path: 'categories', element: <CategoryManagementPage /> },
        { path: 'inventory', element: <InventoryListPage /> },
        { path: 'inventory/:productId', element: <InventoryDetailPage /> },
      ],
    }],
  },
])
