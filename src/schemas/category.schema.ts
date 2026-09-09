import { z } from 'zod'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const codePattern = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/

export const categorySchema = z.object({
  name: z.string().trim().min(2, 'Tên danh mục cần ít nhất 2 ký tự').max(80),
  code: z.string().trim().regex(codePattern, 'Code chỉ gồm chữ in hoa, số và dấu gạch ngang'),
  slug: z.string().trim().regex(slugPattern, 'Slug chỉ gồm chữ thường, số và dấu gạch ngang'),
  description: z.string().trim().max(240),
  parentId: z.string().nullable(),
  sortOrder: z.number().int().min(0),
  status: z.enum(['ACTIVE', 'INACTIVE']),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
