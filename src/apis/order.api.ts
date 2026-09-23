import type { Order } from '@/types/customer/order.type'
import type { ApiResponse } from '@/types/common/api.type'
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

  getOrderById: async (id?: string): Promise<ApiResponse<Order | null>> => {
    const found = id
      ? MOCK_ORDERS.find((o) => o.id === id || o.orderCode === id)
      : MOCK_ORDERS[0]
    const targetOrder = found || MOCK_ORDERS[0]
    return {
      success: Boolean(targetOrder),
      message: targetOrder ? 'Lấy chi tiết đơn hàng thành công' : 'Không tìm thấy đơn hàng',
      data: targetOrder || null,
      statusCode: targetOrder ? 200 : 404,
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
