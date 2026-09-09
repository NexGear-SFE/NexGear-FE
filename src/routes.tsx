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
import { ReceiptDetailPage } from '@/pages/Warehouse/Receipts/ReceiptDetailPage'
import { ReceiptListPage } from '@/pages/Warehouse/Receipts/ReceiptListPage'
import { ReceiptWizardPage } from '@/pages/Warehouse/Receipts/ReceiptWizardPage'
import { OrderDetailPage } from '@/pages/Warehouse/Orders/OrderDetailPage'
import { OrderListPage } from '@/pages/Warehouse/Orders/OrderListPage'

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
        { path: 'orders', element: <OrderListPage /> },
        { path: 'orders/:orderId', element: <OrderDetailPage /> },
        { path: 'receipts', element: <ReceiptListPage /> },
        { path: 'receipts/new', element: <ReceiptWizardPage /> },
        { path: 'receipts/:receiptId', element: <ReceiptDetailPage /> },
        { path: 'receipts/:receiptId/edit', element: <ReceiptWizardPage /> },
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
