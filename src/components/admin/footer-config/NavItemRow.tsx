import React from 'react'
import type { NavItemRowProps } from '@/types/admin/footerConfig.type'
import { FOOTER_FIELD_PLACEHOLDERS } from '@/constants/footerConfigConstants'
import { Trash2 } from 'lucide-react'

export const NavItemRow: React.FC<NavItemRowProps> = ({
  item,
  index,
  onChange,
  onDelete,
  errors,
  isDeleteDisabled = false,
}) => {
  return (
    <div className="flex items-center gap-2 py-1">
      {/* Input tiêu đề */}
      <div className="flex-[1.2] relative">
        <input
          type="text"
          value={item.label}
          onChange={(e) => onChange(item.id, 'label', e.target.value)}
          placeholder={FOOTER_FIELD_PLACEHOLDERS.navLabel}
          aria-label={`Tiêu đề liên kết #${index + 1}`}
          className={`w-full rounded-lg border text-sm px-3 py-2 transition outline-none ${
            errors?.label
              ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
              : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
          }`}
        />
        {errors?.label && (
          <p className="text-[11px] text-red-500 mt-0.5">{errors.label}</p>
        )}
      </div>

      {/* Input URL */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={item.url}
          onChange={(e) => onChange(item.id, 'url', e.target.value)}
          placeholder={FOOTER_FIELD_PLACEHOLDERS.navUrl}
          aria-label={`URL liên kết #${index + 1}`}
          className={`w-full rounded-lg border text-sm px-3 py-2 font-mono transition outline-none ${
            errors?.url
              ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
              : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
          }`}
        />
        {errors?.url && (
          <p className="text-[11px] text-red-500 mt-0.5">{errors.url}</p>
        )}
      </div>

      {/* Nút xóa */}
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        disabled={isDeleteDisabled}
        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
        title="Xóa mục này"
        aria-label={`Xóa mục #${index + 1}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
