import type { Product, ProductCategory, ProductDetail } from '@/types/product.type'
import type { ApiResponse } from '@/types/api.type'
import { mockPcProducts, mockLaptopProducts, mockGearProducts } from '@/mocks/customer/product.mock'
import { MOCK_PRODUCT_DETAILS, generateFallbackProductDetail } from '@/mocks/customer/productDetail.mock'

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

  getProductDetailBySlug: async (
    slug: string
  ): Promise<ApiResponse<{ product: Product; detail: ProductDetail } | null>> => {
    const allProducts = [...mockPcProducts, ...mockLaptopProducts, ...mockGearProducts]
    const product = allProducts.find((p) => p.slug === slug || p.id === slug) || null

    if (!product) {
      return {
        success: false,
        message: 'Không tìm thấy sản phẩm',
        data: null,
        statusCode: 404,
      }
    }

    const detail =
      MOCK_PRODUCT_DETAILS[product.id] ||
      MOCK_PRODUCT_DETAILS[product.slug] ||
      generateFallbackProductDetail(product.id, product.name, product.category, product.id)

    return {
      success: true,
      message: 'Lấy chi tiết sản phẩm thành công',
      data: { product, detail },
      statusCode: 200,
    }
  },
}
