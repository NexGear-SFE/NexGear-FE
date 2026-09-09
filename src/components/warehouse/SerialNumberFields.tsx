import { AlertTriangle } from 'lucide-react'
import type { ProductSerial } from '@/types/inventory.type'
import type { ProductVariant } from '@/types/product.type'
import { areSerialsUnique, hasRequiredReceiptSerials } from '@/utils/skuRules'

type SerialNumberFieldsProps = {
  inventorySerials: ProductSerial[]
  onChange: (serials: string[]) => void
  quantity: number
  serials: string[]
  variant: Pick<ProductVariant, 'serialTracking' | 'sku'>
}

export function SerialNumberFields({ inventorySerials, onChange, quantity, serials, variant }: SerialNumberFieldsProps) {
  if (!variant.serialTracking) return <p className="rounded-sm bg-surface-200 p-3 text-sm text-text-600">SKU {variant.sku} được quản lý theo số lượng, không nhập serial.</p>
  const values = Array.from({ length: Math.max(0, quantity) }, (_, index) => serials[index] ?? '')
  const isComplete = hasRequiredReceiptSerials(true, quantity, values)
  const isUnique = areSerialsUnique(values, inventorySerials)
  return <fieldset className="space-y-2"><legend className="text-sm font-semibold">Serial sản phẩm ({quantity})</legend><p className="text-xs text-text-600">Serial là định danh từng thiết bị, không phải SKU {variant.sku}.</p><div className="grid gap-2 sm:grid-cols-2">{values.map((value, index) => <label key={index} className="text-xs font-medium">Serial {index + 1}<input aria-label={`Serial ${index + 1}`} value={value} onChange={(event) => onChange(values.map((item, itemIndex) => itemIndex === index ? event.target.value.trim().toUpperCase() : item))} className="input-gaming mt-1 w-full font-mono" /></label>)}</div>{(!isComplete || !isUnique) && <p role="alert" className="flex gap-2 rounded-sm bg-error-50 p-3 text-sm text-error-700"><AlertTriangle className="h-4 w-4 shrink-0" />{!isComplete ? 'Số serial phải đúng bằng số lượng nhập.' : 'Serial bị trùng trong phiếu hoặc đã tồn tại trong kho.'}</p>}</fieldset>
}
