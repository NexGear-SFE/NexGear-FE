import type { VariantOptionValue } from '@/types/product.type'

export interface VariantOptionInput {
  name: string
  code?: string
  values: Array<{ value: string; code: string }>
}

export function generateVariantCombinations(options: VariantOptionInput[]): VariantOptionValue[][] {
  if (options.length === 0) return [[]]
  if (options.some((option) => option.values.length === 0)) return []
  return options.reduce<VariantOptionValue[][]>(
    (combinations, option) => combinations.flatMap((combination) =>
      option.values.map((value) => [...combination, { option: option.name, optionCode: option.code, ...value }]),
    ),
    [[]],
  )
}
