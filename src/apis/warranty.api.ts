import type { CustomerWarrantyRequest, WarrantyEligibleProduct } from '@/types/customerWarranty.type'
import type { ApiResponse } from '@/types/api.type'
import { MOCK_CUSTOMER_WARRANTY_REQUESTS, MOCK_ELIGIBLE_WARRANTY_PRODUCTS } from '@/mocks/customer/warranty.mock'


export const warrantyApi = {
  getWarrantyRequests: async (): Promise<ApiResponse<CustomerWarrantyRequest[]>> => {
    return {
      success: true,
      message: 'Lấy danh sách yêu cầu bảo hành thành công',
      data: MOCK_CUSTOMER_WARRANTY_REQUESTS,
      statusCode: 200,
    }
  },

  getEligibleProducts: async (): Promise<ApiResponse<WarrantyEligibleProduct[]>> => {
    return {
      success: true,
      message: 'Lấy danh sách sản phẩm đủ điều kiện bảo hành thành công',
      data: MOCK_ELIGIBLE_WARRANTY_PRODUCTS,
      statusCode: 200,
    }
  },

  createWarrantyRequest: async (
    payload: Omit<CustomerWarrantyRequest, 'id' | 'requestCode' | 'createdAt' | 'status' | 'statusLabel' | 'timeline'>,
  ): Promise<ApiResponse<CustomerWarrantyRequest>> => {
    const newRequest: CustomerWarrantyRequest = {
      ...payload,
      id: `bh-${Date.now()}`,
      requestCode: `BH-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      statusLabel: 'Chờ tiếp nhận',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      timeline: [
        { title: 'Tạo yêu cầu', timestamp: new Date().toLocaleDateString('vi-VN'), completed: true, current: true },
        { title: 'Tiếp nhận thiết bị', completed: false, current: false },
        { title: 'Kiểm tra kỹ thuật', completed: false, current: false },
        { title: 'Xử lý & Sửa chữa', completed: false, current: false },
        { title: 'Hoàn tất bàn giao', completed: false, current: false },
      ],
    }

    return {
      success: true,
      message: 'Gửi yêu cầu bảo hành thành công',
      data: newRequest,
      statusCode: 201,
    }
  },
}
