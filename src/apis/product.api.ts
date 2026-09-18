import type { Product, ProductCategory } from '@/types/product.type'
import type { ApiResponse } from '@/types/api.type'
import { mockPcProducts, mockLaptopProducts, mockGearProducts } from '@/mocks/customer/product.mock'

export const productApi = {
  getProducts: async (category?: ProductCategory): Promise<ApiResponse<Product[]>> => {
    const allProducts = [...mockPcProducts, ...mockLaptopProducts, ...mockGearProducts]
    const filtered = category ? allProducts.filter((p) => p.category === category) : allProducts

    return {
      success: true,
      message: 'Lấy danh sách sản phẩm thành công',
      data: filtered,
      statusCode: 200,
    }
  },

  getProductBySlug: async (slug: string): Promise<ApiResponse<Product | null>> => {
    const allProducts = [...mockPcProducts, ...mockLaptopProducts, ...mockGearProducts]
    const product = allProducts.find((p) => p.slug === slug || p.id === slug) || null

    return {
      success: Boolean(product),
      message: product ? 'Lấy chi tiết sản phẩm thành công' : 'Không tìm thấy sản phẩm',
      data: product,
      statusCode: product ? 200 : 404,
    }
  },
}
