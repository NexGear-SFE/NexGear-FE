import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/Home/HomePage'
import { WarehouseLayout } from '@/layouts/WarehouseLayout'
import { WarehouseComingSoonPage } from '@/pages/Warehouse/WarehouseComingSoonPage'
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
        { index: true, element: <WarehouseComingSoonPage title="Tổng quan kho" description="Theo dõi nhanh các công việc vận hành trong ngày." /> },
        { path: 'orders', element: <WarehouseComingSoonPage title="Đơn hàng" description="Xử lý quy trình xuất kho và bàn giao vận chuyển." /> },
        { path: 'orders/:orderId', element: <WarehouseComingSoonPage title="Chi tiết đơn hàng" description="Theo dõi và cập nhật từng bước xử lý đơn." /> },
        { path: 'receipts', element: <WarehouseComingSoonPage title="Phiếu nhập kho" description="Quản lý các lần nhập hàng và kiểm đếm serial." /> },
        { path: 'receipts/new', element: <WarehouseComingSoonPage title="Tạo phiếu nhập" description="Ghi nhận lô hàng mới vào kho." /> },
        { path: 'receipts/:receiptId', element: <WarehouseComingSoonPage title="Chi tiết phiếu nhập" description="Kiểm tra thông tin và trạng thái phiếu nhập." /> },
        { path: 'products', element: <WarehouseComingSoonPage title="Sản phẩm" description="Quản lý thông tin sản phẩm và biến thể SKU." /> },
        { path: 'products/new', element: <WarehouseComingSoonPage title="Tạo sản phẩm" description="Khai báo sản phẩm và ma trận biến thể." /> },
        { path: 'products/:productId', element: <WarehouseComingSoonPage title="Chi tiết sản phẩm" description="Tra cứu toàn bộ thông tin sản phẩm." /> },
        { path: 'products/:productId/edit', element: <WarehouseComingSoonPage title="Chỉnh sửa sản phẩm" description="Cập nhật thông tin và trạng thái sản phẩm." /> },
        { path: 'categories', element: <WarehouseComingSoonPage title="Danh mục" description="Quản lý cấu trúc danh mục nhiều cấp." /> },
        { path: 'inventory', element: <WarehouseComingSoonPage title="Tồn kho" description="Tra cứu tồn kho theo sản phẩm và SKU." /> },
        { path: 'inventory/:productId', element: <WarehouseComingSoonPage title="Chi tiết tồn kho" description="Xem số lượng, serial và lịch sử biến động." /> },
      ],
    }],
  },
])
