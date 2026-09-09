import { initialOrders } from '@/constants/warehouseMockData'
import type { WarehouseOrder } from '@/types/warehouseOrder.type'
import { mockResponse } from '@/apis/mockResponse'

export function getWarehouseOrders() { return mockResponse<WarehouseOrder[]>(initialOrders) }
