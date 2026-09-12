import { StockStatusBadge } from '@/components/warehouse/StockStatusBadge'
import type { ProductSerial, VariantInventory } from '@/types/inventory.type'
import type { ProductVariant } from '@/types/variant.type'
import { getAvailableStock, getStockStatus } from '@/utils/inventory'

type ProductInventoryPanelProps = { inventory: VariantInventory[]; serials: ProductSerial[]; variants: ProductVariant[] }

export function ProductInventoryPanel({ inventory, serials, variants }: ProductInventoryPanelProps) {
  return <div className="overflow-x-auto rounded-md border border-surface-400">
    <table className="w-full min-w-[760px] text-left text-sm">
      <thead className="bg-surface-200 text-xs uppercase text-text-600"><tr><th className="p-3">SKU</th><th className="p-3">Biến thể</th><th className="p-3" title="Số lượng vật lý đang có trong kho">Tồn kho thực</th><th className="p-3" title="Số lượng đã gán cho đơn nhưng chưa xuất kho">Đã giữ</th><th className="p-3" title="Tồn kho thực trừ số lượng đã giữ">Có thể bán</th><th className="p-3">Ngưỡng nhập lại</th><th className="p-3">Serial khả dụng</th><th className="p-3">Trạng thái</th></tr></thead>
      <tbody className="divide-y divide-surface-400">{variants.map((variant) => {
        const stock = inventory.find((item) => item.variantId === variant.id)
        const onHand = stock?.onHand ?? 0
        const reserved = stock?.reserved ?? 0
        const available = getAvailableStock(onHand, reserved)
        const variantSerials = serials.filter((serial) => serial.variantId === variant.id)
        const availableSerials = variantSerials.filter((serial) => serial.status === 'AVAILABLE').length
        return <tr key={variant.id}>
          <td className="p-3 font-mono font-semibold">{variant.sku}</td>
          <td className="p-3 text-xs text-text-600">{variant.optionValues.map((option) => `${option.option}: ${option.value}`).join(' · ') || 'Mặc định'}</td>
          <td className="p-3">{onHand}</td><td className="p-3">{reserved}</td><td className="p-3 font-semibold">{available}</td><td className="p-3">{variant.reorderLevel}</td>
          <td className="p-3">{variant.serialTracking ? <span><strong>{availableSerials}</strong><span className="block text-xs text-text-600">/{variantSerials.length} tổng</span></span> : <span className="text-xs text-text-600">Không theo dõi</span>}</td>
          <td className="p-3"><StockStatusBadge status={getStockStatus(onHand, reserved, variant.reorderLevel)} /></td>
        </tr>
      })}</tbody>
    </table>
  </div>
}
