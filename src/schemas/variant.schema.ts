import { z } from 'zod'
import { SKU_MAX_LENGTH, SKU_PATTERN } from '@/utils/generateSkuPreview'

export const skuSchema = z.string().trim().max(SKU_MAX_LENGTH).regex(SKU_PATTERN, 'SKU không đúng định dạng')

export const variantSchema = z.object({
  sku: skuSchema,
  skuSource: z.enum(['AUTO', 'MANUAL']),
  optionValues: z.array(z.object({ option: z.string().min(1), optionCode: z.string().min(1).optional(), value: z.string().min(1), code: z.string().min(1) })),
  serialTracking: z.boolean(),
  reorderLevel: z.number().int().min(0),
  status: z.enum(['ACTIVE', 'INACTIVE']),
})

export const variantCollectionSchema = z.array(variantSchema).superRefine((variants, context) => {
  const combinations = new Set<string>()
  const expectedOptions = variants[0]?.optionValues.map((value) => value.optionCode ?? value.option).sort().join('|') ?? ''
  variants.forEach((variant, index) => {
    const variantOptions = variant.optionValues.map((value) => value.optionCode ?? value.option).sort().join('|')
    if (variantOptions !== expectedOptions) context.addIssue({ code: 'custom', path: [index, 'optionValues'], message: 'Mỗi cấu hình phải chọn đủ tất cả thuộc tính' })
    const key = variant.optionValues.map((value) => `${value.optionCode ?? value.option}:${value.code}`).sort().join('|')
    if (combinations.has(key)) context.addIssue({ code: 'custom', path: [index, 'optionValues'], message: 'Tổ hợp biến thể bị trùng' })
    combinations.add(key)
  })
})
