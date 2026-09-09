import { initialProducts, initialVariants } from '@/constants/warehouseMockData'
import type { Product, ProductVariant } from '@/types/product.type'
import { mockResponse } from '@/apis/mockResponse'

export function getProducts() { return mockResponse<Product[]>(initialProducts) }
export function getProductVariants(productId: string) { return mockResponse<ProductVariant[]>(initialVariants.filter((variant) => variant.productId === productId)) }
