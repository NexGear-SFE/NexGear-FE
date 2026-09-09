import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().trim().min(3, 'Tên sản phẩm cần ít nhất 3 ký tự').max(160),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug chưa đúng định dạng'),
  productCode: z.string().trim().regex(/^[A-Z0-9-]{2,32}$/, 'Product code chỉ gồm chữ in hoa, số và dấu gạch ngang'),
  modelCode: z.string().trim().min(1).max(24),
  brand: z.string().trim().min(2),
  brandCode: z.string().trim().regex(/^[A-Z0-9]{2,8}$/, 'Brand code gồm 2–8 chữ in hoa hoặc số'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục'),
  shortDescription: z.string().trim().max(500),
  warrantyMonths: z.number().int().min(0).max(120),
  unit: z.string().trim().min(1),
  origin: z.string().trim().max(80),
  weightGrams: z.number().min(0),
  dimensions: z.object({
    lengthMm: z.number().min(0),
    widthMm: z.number().min(0),
    heightMm: z.number().min(0),
  }),
  status: z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']),
})

export type ProductFormValues = z.infer<typeof productSchema>
