import type { ProductSerial } from '@/types/inventory.type'
import type { ProductVariant } from '@/types/variant.type'

export function findDuplicateSkus(currentSkus: string[], existingSkus: string[] = []): Set<string> {
  const counts = new Map<string, number>()
  ;[...existingSkus, ...currentSkus].filter(Boolean).forEach((sku) => counts.set(sku, (counts.get(sku) ?? 0) + 1))
  return new Set([...counts].filter(([, count]) => count > 1).map(([sku]) => sku))
}

export function isSkuEditable(variant: Pick<ProductVariant, 'skuLocked'>): boolean {
  return !variant.skuLocked
}

export function areSerialsUnique(serialValues: string[], inventorySerials: ProductSerial[]): boolean {
  const normalized = serialValues.map((value) => value.trim().toUpperCase()).filter(Boolean)
  const existing = new Set(inventorySerials.map((serial) => serial.value.trim().toUpperCase()))
  return new Set(normalized).size === normalized.length && normalized.every((value) => !existing.has(value))
}

export function hasRequiredReceiptSerials(serialTracking: boolean, quantity: number, serialValues: string[]): boolean {
  return serialTracking ? serialValues.filter((value) => value.trim()).length === quantity : serialValues.length === 0
}
