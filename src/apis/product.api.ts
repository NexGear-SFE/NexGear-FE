import { initialProducts, initialVariants } from '@/constants/warehouseMockData'
import type { Product } from '@/types/product.type'
import type { ProductVariant } from '@/types/variant.type'
import { mockResponse } from '@/apis/mockResponse'

export function getProducts() { return mockResponse<Product[]>(initialProducts) }
export function getProductVariants(productId: string) { return mockResponse<ProductVariant[]>(initialVariants.filter((variant) => variant.productId === productId)) }
