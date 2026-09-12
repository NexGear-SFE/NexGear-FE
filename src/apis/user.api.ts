import type { UserProfile } from '@/types/account.type'
import type { ApiResponse } from '@/types/api.type'
import { DEFAULT_CUSTOMER_PROFILE } from '@/constants/customerAccount.constant'

export const userApi = {
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    return {
      success: true,
      message: 'Lấy thông tin cá nhân thành công',
      data: DEFAULT_CUSTOMER_PROFILE,
      statusCode: 200,
    }
  },

  updateProfile: async (payload: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    const updatedProfile: UserProfile = {
      ...DEFAULT_CUSTOMER_PROFILE,
      ...payload,
    }

    return {
      success: true,
      message: 'Cập nhật thông tin cá nhân thành công',
      data: updatedProfile,
      statusCode: 200,
    }
  },
}
