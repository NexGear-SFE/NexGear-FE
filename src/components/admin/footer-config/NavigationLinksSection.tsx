import React from 'react'
import type {
  NavigationColumns,
  NavColumnLinkErrors,
} from '@/types/footerConfig'
import { NavItemRow } from '@/components/admin/footer-config/NavItemRow'
import { Plus } from 'lucide-react'

interface NavigationLinksSectionProps {
  navColumns: NavigationColumns
  onLinkChange: (
    column: 'left' | 'right',
    id: string,
    field: 'label' | 'url',
    value: string
  ) => void
  onAddLink: (column: 'left' | 'right') => void
  onDeleteLink: (column: 'left' | 'right', id: string) => void
  errors?: {
    left?: Record<string, NavColumnLinkErrors>
    right?: Record<string, NavColumnLinkErrors>
  }
}

export const NavigationLinksSection: React.FC<NavigationLinksSectionProps> = ({
  navColumns,
  onLinkChange,
  onAddLink,
  onDeleteLink,
  errors,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <span className="w-1 h-5 bg-red-600 rounded-full inline-block mr-2" />
        <h3 className="font-semibold text-slate-900 text-base">
          2. Cột điều hướng (Links)
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cột trái — Danh mục sản phẩm */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-600 font-medium">
              Cột trái — Danh mục sản phẩm
            </span>
            <span className="text-[11px] text-slate-400">
              {navColumns.left.length} liên kết
            </span>
          </div>

          <div className="space-y-1">
            {navColumns.left.map((item, index) => (
              <NavItemRow
                key={item.id}
                item={item}
                index={index}
                onChange={(id, field, value) =>
                  onLinkChange('left', id, field, value)
                }
                onDelete={(id) => onDeleteLink('left', id)}
                errors={errors?.left?.[item.id]}
                isDeleteDisabled={navColumns.left.length <= 1}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => onAddLink('left')}
            className="border border-dashed border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 text-xs font-medium px-3.5 py-2 rounded-lg mt-3 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm mục mới</span>
          </button>
        </div>

        {/* Cột phải — Về chúng tôi / Dịch vụ */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-600 font-medium">
              Cột phải — Về chúng tôi / Dịch vụ
            </span>
            <span className="text-[11px] text-slate-400">
              {navColumns.right.length} liên kết
            </span>
          </div>

          <div className="space-y-1">
            {navColumns.right.map((item, index) => (
              <NavItemRow
                key={item.id}
                item={item}
                index={index}
                onChange={(id, field, value) =>
                  onLinkChange('right', id, field, value)
                }
                onDelete={(id) => onDeleteLink('right', id)}
                errors={errors?.right?.[item.id]}
                isDeleteDisabled={navColumns.right.length <= 1}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => onAddLink('right')}
            className="border border-dashed border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 text-xs font-medium px-3.5 py-2 rounded-lg mt-3 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm mục mới</span>
          </button>
        </div>
      </div>
    </div>
  )
}
