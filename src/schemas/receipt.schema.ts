import { z } from 'zod'

export const receiptLineSchema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().positive('Số lượng phải lớn hơn 0'),
  unitCost: z.number().positive('Giá nhập phải lớn hơn 0'),
  serials: z.array(z.string().trim().min(1)),
})

export const receiptSchema = z.object({
  supplier: z.string().trim().min(2, 'Vui lòng nhập nhà cung cấp'),
  receiptDate: z.string().min(1),
  invoiceCode: z.string().trim().min(1, 'Vui lòng nhập mã chứng từ'),
  notes: z.string().trim().max(500),
  lines: z.array(receiptLineSchema).min(1, 'Phiếu nhập cần ít nhất một SKU'),
})

export const packingSchema = z.object({
  weightGrams: z.number().positive('Khối lượng phải lớn hơn 0'),
  lengthCm: z.number().positive('Chiều dài phải lớn hơn 0'),
  widthCm: z.number().positive('Chiều rộng phải lớn hơn 0'),
  heightCm: z.number().positive('Chiều cao phải lớn hơn 0'),
})
