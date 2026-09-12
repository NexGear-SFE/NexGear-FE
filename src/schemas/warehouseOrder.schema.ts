import { z } from 'zod'

export const packingSchema = z.object({
  weightGrams: z.number().positive('Khối lượng phải lớn hơn 0.'),
  lengthCm: z.number().positive('Chiều dài phải lớn hơn 0.'),
  widthCm: z.number().positive('Chiều rộng phải lớn hơn 0.'),
  heightCm: z.number().positive('Chiều cao phải lớn hơn 0.'),
})
