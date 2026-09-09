import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/Home/HomePage'
import { WarehouseLayout } from '@/layouts/WarehouseLayout'
import { WarehouseRouteGuard } from '@/components/warehouse/WarehouseRouteGuard'

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
        { index: true, lazy: async () => ({ Component: (await import('@/pages/Warehouse/WarehouseDashboardPage')).WarehouseDashboardPage }) },
        { path: 'orders', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Orders/OrderListPage')).OrderListPage }) },
        { path: 'orders/:orderId', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Orders/OrderDetailPage')).OrderDetailPage }) },
        { path: 'receipts', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Receipts/ReceiptListPage')).ReceiptListPage }) },
        { path: 'receipts/new', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Receipts/ReceiptWizardPage')).ReceiptWizardPage }) },
        { path: 'receipts/:receiptId', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Receipts/ReceiptDetailPage')).ReceiptDetailPage }) },
        { path: 'receipts/:receiptId/edit', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Receipts/ReceiptWizardPage')).ReceiptWizardPage }) },
        { path: 'products', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Products/ProductListPage')).ProductListPage }) },
        { path: 'products/new', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Products/ProductWizardPage')).ProductWizardPage }) },
        { path: 'products/:productId', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Products/ProductDetailPage')).ProductDetailPage }) },
        { path: 'products/:productId/edit', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Products/ProductWizardPage')).ProductWizardPage }) },
        { path: 'categories', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Categories/CategoryManagementPage')).CategoryManagementPage }) },
        { path: 'inventory', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Inventory/InventoryListPage')).InventoryListPage }) },
        { path: 'inventory/:productId', lazy: async () => ({ Component: (await import('@/pages/Warehouse/Inventory/InventoryDetailPage')).InventoryDetailPage }) },
      ],
    }],
  },
])
