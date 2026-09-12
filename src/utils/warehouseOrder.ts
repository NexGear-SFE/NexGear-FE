import { packingSchema } from '@/schemas/warehouseOrder.schema'
import type { WarehouseOrder, WarehouseOrderState } from '@/types/warehouseOrder.type'

export const orderStateLabels: Record<WarehouseOrderState, string> = {
  WAITING_ACCEPTANCE: 'Chờ tiếp nhận', PICKING: 'Đang soạn hàng', WAITING_SERIAL: 'Chờ gán serial', READY_TO_PACK: 'Sẵn sàng đóng gói', WAITING_GHTK_PICKUP: 'Chờ GHTK lấy', ISSUE: 'Có sự cố', COMPLETED: 'Đã hoàn tất',
}

export const orderActionLabels: Record<WarehouseOrderState, string> = {
  WAITING_ACCEPTANCE: 'Bắt đầu soạn hàng', PICKING: 'Tiếp tục soạn', WAITING_SERIAL: 'Gán serial', READY_TO_PACK: 'Đóng gói', WAITING_GHTK_PICKUP: 'Theo dõi lấy hàng', ISSUE: 'Xử lý sự cố', COMPLETED: 'Xem chi tiết',
}

const priorities: Record<WarehouseOrderState, number> = { ISSUE: 0, WAITING_ACCEPTANCE: 1, PICKING: 2, WAITING_SERIAL: 3, READY_TO_PACK: 4, WAITING_GHTK_PICKUP: 5, COMPLETED: 6 }
export function sortOrders(orders: WarehouseOrder[], sort: string): WarehouseOrder[] {
  return [...orders].sort((first, second) => sort === 'oldest' ? first.createdAt.localeCompare(second.createdAt) : sort === 'newest' ? second.createdAt.localeCompare(first.createdAt) : priorities[first.state] - priorities[second.state] || second.createdAt.localeCompare(first.createdAt))
}

export function getOrderProgressIndex(order: WarehouseOrder, requiresSerial: boolean): number {
  const state = order.state === 'ISSUE' ? order.issue?.resumeState ?? 'WAITING_ACCEPTANCE' : order.state
  const states: WarehouseOrderState[] = requiresSerial ? ['WAITING_ACCEPTANCE', 'PICKING', 'WAITING_SERIAL', 'READY_TO_PACK', 'WAITING_GHTK_PICKUP', 'COMPLETED'] : ['WAITING_ACCEPTANCE', 'PICKING', 'READY_TO_PACK', 'WAITING_GHTK_PICKUP', 'COMPLETED']
  return Math.max(0, states.indexOf(state))
}

export function validateParcel(parcel: { weightGrams: number; lengthCm: number; widthCm: number; heightCm: number }): string[] {
  const result = packingSchema.safeParse(parcel)
  return result.success ? [] : result.error.issues.map((issue) => issue.message)
}
