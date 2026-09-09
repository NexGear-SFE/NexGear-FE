import { StatusBadge } from '@/components/warehouse/StatusBadge'
import type { ProductSerial, VariantInventory } from '@/types/inventory.type'
import type { ProductVariant } from '@/types/product.type'

type ProductInventoryPanelProps = { inventory: VariantInventory[]; serials: ProductSerial[]; variants: ProductVariant[] }

export function ProductInventoryPanel({ inventory, serials, variants }: ProductInventoryPanelProps) {
  return <div className="overflow-x-auto rounded-md border border-surface-400"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-surface-200 text-xs uppercase text-text-600"><tr><th className="p-3">SKU</th><th className="p-3">On hand</th><th className="p-3">Reserved</th><th className="p-3">Available</th><th className="p-3">Serial khả dụng</th><th className="p-3">Trạng thái</th></tr></thead><tbody className="divide-y divide-surface-400">{variants.map((variant) => { const stock = inventory.find((item) => item.variantId === variant.id); const available = Math.max(0, (stock?.onHand ?? 0) - (stock?.reserved ?? 0)); return <tr key={variant.id}><td className="p-3 font-mono font-semibold">{variant.sku}</td><td className="p-3">{stock?.onHand ?? 0}</td><td className="p-3">{stock?.reserved ?? 0}</td><td className="p-3 font-semibold">{available}</td><td className="p-3">{serials.filter((serial) => serial.variantId === variant.id && serial.status === 'AVAILABLE').length}</td><td className="p-3"><StatusBadge label={available > 0 ? 'Còn hàng' : 'Hết hàng'} tone={available > 0 ? 'success' : 'error'} /></td></tr> })}</tbody></table></div>
}
