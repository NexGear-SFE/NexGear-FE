import React from 'react'
import type { CategoryToggleCardProps } from '@/types/admin/homeProductsConfig.type'
import { CategoryIcon } from '@/constants/homeProductsConstants'

export const CategoryToggleCard: React.FC<CategoryToggleCardProps> = ({
  category,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onToggle(category.id, !category.enabled)}
      className={`rounded-xl p-3.5 transition-all duration-150 cursor-pointer select-none flex flex-col justify-between ${
        category.enabled
          ? 'border-2 border-red-500 bg-white shadow-sm'
          : 'border border-slate-200 bg-white opacity-70 hover:opacity-100'
      }`}
    >
      {/* Top Row: Icon, Name & Toggle Switch */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`p-1.5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              category.enabled
                ? 'bg-red-50 text-red-600'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            <CategoryIcon icon={category.icon} className="w-4 h-4" />
          </span>
          <span className="text-slate-800 text-sm font-semibold truncate" title={category.name}>
            {category.name}
          </span>
        </div>


        {/* Custom Compact Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={category.enabled}
          aria-label={`Bật tắt danh mục ${category.name}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggle(category.id, !category.enabled)
          }}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            category.enabled ? 'bg-red-600' : 'bg-slate-300'
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              category.enabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Bottom Row: Count & Top Product */}
      <div className="mt-3">
        <p className="text-xs text-slate-400 truncate" title={`${category.count} SP · Top: ${category.topProduct}`}>
          {category.count} SP · Top: {category.topProduct}
        </p>
      </div>
    </div>
  )
}
