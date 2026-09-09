import { StatusBadge } from '@/components/warehouse/StatusBadge'
import type { StockStatus } from '@/types/inventory.type'

const labels: Record<StockStatus, string> = {
  IN_STOCK: 'Còn hàng',
  LOW_STOCK: 'Sắp hết',
  OUT_OF_STOCK: 'Hết hàng',
}

export function StockStatusBadge({ status }: { status: StockStatus }) {
  const tone = status === 'IN_STOCK' ? 'success' : status === 'LOW_STOCK' ? 'warning' : 'error'
  return <StatusBadge label={labels[status]} tone={tone} />
}
