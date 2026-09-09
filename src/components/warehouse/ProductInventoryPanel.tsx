import { StockStatusBadge } from '@/components/warehouse/StockStatusBadge'
import type { ProductSerial, VariantInventory } from '@/types/inventory.type'
import type { ProductVariant } from '@/types/product.type'
import { getAvailableStock } from '@/utils/formatters'
import { getStockStatus } from '@/utils/inventory'

type ProductInventoryPanelProps = { inventory: VariantInventory[]; serials: ProductSerial[]; variants: ProductVariant[] }

export function ProductInventoryPanel({ inventory, serials, variants }: ProductInventoryPanelProps) {
  return <div className="overflow-x-auto rounded-md border border-surface-400">
    <table className="w-full min-w-[760px] text-left text-sm">
      <thead className="bg-surface-200 text-xs uppercase text-text-600"><tr><th className="p-3">SKU</th><th className="p-3">Biến thể</th><th className="p-3">On hand</th><th className="p-3">Reserved</th><th className="p-3">Available</th><th className="p-3">Serial</th><th className="p-3">Trạng thái</th></tr></thead>
      <tbody className="divide-y divide-surface-400">{variants.map((variant) => {
        const stock = inventory.find((item) => item.variantId === variant.id)
        const onHand = stock?.onHand ?? 0
        const reserved = stock?.reserved ?? 0
        const available = getAvailableStock(onHand, reserved)
        return <tr key={variant.id}>
          <td className="p-3 font-mono font-semibold">{variant.sku}</td>
          <td className="p-3 text-xs text-text-600">{variant.optionValues.map((option) => `${option.option}: ${option.value}`).join(' · ') || 'Mặc định'}</td>
          <td className="p-3">{onHand}</td><td className="p-3">{reserved}</td><td className="p-3 font-semibold">{available}</td>
          <td className="p-3">{variant.serialTracking ? serials.filter((serial) => serial.variantId === variant.id).length : '—'}</td>
          <td className="p-3"><StockStatusBadge status={getStockStatus(onHand, reserved, variant.reorderLevel)} /></td>
        </tr>
      })}</tbody>
    </table>
  </div>
}
