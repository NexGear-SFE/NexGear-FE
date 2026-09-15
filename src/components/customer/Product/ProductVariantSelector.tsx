import { Check } from 'lucide-react'
import type { ProductVariantGroup, ProductVariantOption } from '@/types/product.type'

interface ProductVariantSelectorProps {
  variantGroups: ProductVariantGroup[]
  selectedOptions: Record<string, ProductVariantOption>
  onSelectOption: (groupId: string, option: ProductVariantOption) => void
}

export function ProductVariantSelector({
  variantGroups,
  selectedOptions,
  onSelectOption,
}: ProductVariantSelectorProps) {
  if (!variantGroups || variantGroups.length === 0) return null

  return (
    <div className="space-y-4 pt-2 border-t border-gray-100">
      {variantGroups.map((group) => {
        const activeOption = selectedOptions[group.id] || group.options[0]

        return (
          <div key={group.id} className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 font-heading">
                {group.name}: <strong className="text-[#E30019]">{activeOption?.label}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {group.options.map((opt) => {
                const isSelected = activeOption?.id === opt.id
                const isOut = opt.stock === 0

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => !isOut && onSelectOption(group.id, opt)}
                    disabled={isOut}
                    className={`relative border px-3.5 py-2 rounded-[6px] text-xs font-semibold transition-all flex items-center gap-2 ${
                      isOut
                        ? 'border-gray-200 text-gray-400 bg-gray-50 opacity-60 cursor-not-allowed line-through'
                        : isSelected
                        ? 'border-[#E30019] text-[#E30019] bg-red-50/50 ring-1 ring-[#E30019] shadow-xs cursor-pointer'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isOut && <span className="text-[10px] text-gray-400 font-normal">(Hết hàng)</span>}
                    {isSelected && !isOut && <Check className="w-3.5 h-3.5 text-[#E30019] stroke-[3]" />}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
