import type { Order } from '@/types/order.type'
import type { ApiResponse } from '@/types/api.type'
import { MOCK_ORDERS } from '@/mocks/customer/order.mock'

export const orderApi = {
  getOrders: async (): Promise<ApiResponse<Order[]>> => {
    return {
      success: true,
      message: 'Lấy danh sách đơn hàng thành công',
      data: MOCK_ORDERS,
      statusCode: 200,
    }
  },

  getOrderById: async (id: string): Promise<ApiResponse<Order | null>> => {
    const found = MOCK_ORDERS.find((o) => o.id === id || o.orderCode === id) || null
    return {
      success: Boolean(found),
      message: found ? 'Lấy chi tiết đơn hàng thành công' : 'Không tìm thấy đơn hàng',
      data: found,
      statusCode: found ? 200 : 404,
    }
  },

  cancelOrder: async (id: string, reason?: string): Promise<ApiResponse<Order | null>> => {
    const order = MOCK_ORDERS.find((o) => o.id === id)
    if (!order) {
      return {
        success: false,
        message: 'Đơn hàng không tồn tại',
        data: null,
        statusCode: 404,
      }
    }

    const updatedOrder: Order = {
      ...order,
      status: 'cancelled',
      statusLabel: 'Đã hủy',
      cancelReason: reason || 'Khách hàng hủy đơn',
    }

    return {
      success: true,
      message: 'Hủy đơn hàng thành công',
      data: updatedOrder,
      statusCode: 200,
    }
  },
}
