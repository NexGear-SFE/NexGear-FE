import { packingSchema } from '@/schemas/warehouseOrder.schema'
import type { WarehouseOrder, WarehouseOrderState } from '@/types/warehouseOrder.type'

export const orderStateLabels: Record<WarehouseOrderState, string> = {
  WAITING_ACCEPTANCE: 'Chờ tiếp nhận', PICKING: 'Đang soạn hàng', WAITING_SERIAL: 'Chờ gán serial', READY_TO_PACK: 'Sẵn sàng đóng gói', WAITING_GHTK_PICKUP: 'Chờ Đơn Vị Vận Chuyển Lấy', ISSUE: 'Có sự cố', COMPLETED: 'Đã hoàn tất',
}

export const orderActionLabels: Record<WarehouseOrderState, string> = {
  WAITING_ACCEPTANCE: 'Bắt đầu soạn hàng', PICKING: 'Tiếp tục soạn', WAITING_SERIAL: 'Gán serial', READY_TO_PACK: 'Đóng gói', WAITING_GHTK_PICKUP: 'Theo dõi lấy hàng', ISSUE: 'Xử lý sự cố', COMPLETED: 'Xem chi tiết',
}

const priorities: Record<WarehouseOrderState, number> = { ISSUE: 0, WAITING_ACCEPTANCE: 1, PICKING: 2, WAITING_SERIAL: 3, READY_TO_PACK: 4, WAITING_GHTK_PICKUP: 5, COMPLETED: 6 }
export function sortOrders(orders: WarehouseOrder[], sort: string): WarehouseOrder[] {
  return [...orders].sort((first, second) => sort === 'oldest' ? first.createdAt.localeCompare(second.createdAt) : sort === 'newest' ? second.createdAt.localeCompare(first.createdAt) : priorities[first.state] - priorities[second.state] || second.createdAt.localeCompare(first.createdAt))
}

export function getOrderProgressIndex(order: WarehouseOrder, _requiresSerial?: boolean): number {
  const state = order.state === 'ISSUE' ? order.issue?.resumeState ?? 'WAITING_ACCEPTANCE' : order.state
  if (state === 'WAITING_ACCEPTANCE') return 0
  if (state === 'PICKING' || state === 'WAITING_SERIAL' || state === 'READY_TO_PACK') return 1
  if (state === 'WAITING_GHTK_PICKUP') return 2
  if (state === 'COMPLETED') return 3
  return 0
}

export function validateParcel(parcel: { weightGrams: number; lengthCm: number; widthCm: number; heightCm: number }): string[] {
  const result = packingSchema.safeParse(parcel)
  return result.success ? [] : result.error.issues.map((issue) => issue.message)
}
