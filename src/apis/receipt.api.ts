import { initialReceipts } from '@/constants/warehouseMockData'
import type { StockReceipt } from '@/types/receipt.type'
import { mockResponse } from '@/apis/mockResponse'

export function getReceipts() { return mockResponse<StockReceipt[]>(initialReceipts) }
