import React from 'react'
import type { BottomBarSectionProps } from '@/types/admin/footerConfig.type'
import { PolicyItemRow } from '@/components/admin/footer-config/PolicyItemRow'
import { FOOTER_FIELD_PLACEHOLDERS } from '@/constants/footerConfigConstants'
import { Plus } from 'lucide-react'

export const BottomBarSection: React.FC<BottomBarSectionProps> = ({
  copyright,
  onCopyrightChange,
  policyLinks,
  onPolicyChange,
  onAddPolicy,
  onDeletePolicy,
  copyrightError,
  policyErrors,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <span className="w-1 h-5 bg-red-600 rounded-full inline-block mr-2" />
        <h3 className="font-semibold text-slate-900 text-base">
          4. Bản quyền & Dưới cùng
        </h3>
      </div>

      {/* Dòng bản quyền (Copyright) */}
      <div className="mb-5">
        <label
          htmlFor="footer-copyright"
          className="block text-xs text-slate-600 font-medium mb-1.5"
        >
          Dòng bản quyền (Copyright)
        </label>
        <input
          id="footer-copyright"
          type="text"
          value={copyright}
          onChange={(e) => onCopyrightChange(e.target.value)}
          placeholder={FOOTER_FIELD_PLACEHOLDERS.copyright}
          className={`w-full rounded-lg border text-sm px-3.5 py-2.5 transition outline-none ${copyrightError
              ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
              : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
            }`}
        />
        {copyrightError && (
          <p className="text-xs text-red-500 mt-1">{copyrightError}</p>
        )}
      </div>

      {/* Quản lý danh sách Policy Links */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mt-2 mb-2">
          <label className="block text-xs text-slate-600 font-medium">
            Liên kết chính sách
          </label>
          <span className="text-[11px] text-slate-400">
            {policyLinks.length} liên kết chính sách
          </span>
        </div>

        {/* Danh sách các dòng chính sách */}
        <div className="space-y-1">
          {policyLinks.map((policy, index) => (
            <PolicyItemRow
              key={policy.id}
              policy={policy}
              index={index}
              onChange={onPolicyChange}
              onDelete={onDeletePolicy}
              errors={policyErrors?.[policy.id]}
              isDeleteDisabled={policyLinks.length <= 1}
            />
          ))}
        </div>

        {/* Nút + Thêm chính sách */}
        <button
          type="button"
          onClick={onAddPolicy}
          className="border border-dashed border-red-500 text-red-600 hover:bg-red-50 font-medium text-xs px-3.5 py-2 rounded-xl mt-3 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm chính sách</span>
        </button>
      </div>
    </div>
  )
}
