import type { VariantOptionValue } from '@/types/variant.type'

export const SKU_PATTERN = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/
export const SKU_MAX_LENGTH = 32

export function normalizeSkuSegment(value: string): string {
  return normalizeSkuInput(value)
    .replace(/^-+|-+$/g, '')
}

export function normalizeSkuInput(value: string): string {
  return value
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
}

export function generateSkuPreview(brandCode: string, modelCode: string, values: VariantOptionValue[]): string {
  return [brandCode, modelCode, ...values.map((value) => value.code)]
    .map(normalizeSkuSegment)
    .filter(Boolean)
    .join('-')
    .slice(0, SKU_MAX_LENGTH)
    .replace(/-+$/g, '')
}

export function isValidSku(sku: string): boolean {
  return sku.length > 0 && sku.length <= SKU_MAX_LENGTH && SKU_PATTERN.test(sku)
}
