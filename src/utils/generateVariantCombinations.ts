import type { VariantOption, VariantOptionValue } from '@/types/variant.type'

export type VariantOptionInput = VariantOption

export function generateVariantCombinations(options: VariantOption[]): VariantOptionValue[][] {
  if (options.length === 0) return [[]]
  if (options.some((option) => option.values.length === 0)) return []
  return options.reduce<VariantOptionValue[][]>(
    (combinations, option) => combinations.flatMap((combination) =>
      option.values.map((value) => [...combination, { option: option.name, optionCode: option.code, ...value }]),
    ),
    [[]],
  )
}
