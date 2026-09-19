import React from 'react'
import type { PolicyLink, PolicyLinkErrors } from '@/types/footerConfig'
import { FOOTER_FIELD_PLACEHOLDERS } from '@/constants/footerConfigConstants'
import { Trash2 } from 'lucide-react'

interface PolicyItemRowProps {
  policy: PolicyLink
  index: number
  onChange: (id: string, field: 'title' | 'url', value: string) => void
  onDelete: (id: string) => void
  errors?: PolicyLinkErrors
  isDeleteDisabled?: boolean
}

export const PolicyItemRow: React.FC<PolicyItemRowProps> = ({
  policy,
  index,
  onChange,
  onDelete,
  errors,
  isDeleteDisabled = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 py-1.5">
      {/* Input tiêu đề (~55-60% width) */}
      <div className="flex-[3] relative">
        <input
          type="text"
          value={policy.title}
          onChange={(e) => onChange(policy.id, 'title', e.target.value)}
          placeholder={FOOTER_FIELD_PLACEHOLDERS.policyTitle}
          aria-label={`Tiêu đề chính sách #${index + 1}`}
          className={`w-full rounded-lg border text-sm px-3.5 py-2 transition outline-none ${
            errors?.title
              ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
              : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
          }`}
        />
        {errors?.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      {/* Input URL (~35-40% width) */}
      <div className="flex-[2] relative">
        <input
          type="text"
          value={policy.url}
          onChange={(e) => onChange(policy.id, 'url', e.target.value)}
          placeholder={FOOTER_FIELD_PLACEHOLDERS.policyUrl}
          aria-label={`URL chính sách #${index + 1}`}
          className={`w-full rounded-lg border text-sm px-3.5 py-2 transition outline-none font-mono ${
            errors?.url
              ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
              : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
          }`}
        />
        {errors?.url && (
          <p className="text-xs text-red-500 mt-1">{errors.url}</p>
        )}
      </div>

      {/* Nút xóa */}
      <button
        type="button"
        onClick={() => onDelete(policy.id)}
        disabled={isDeleteDisabled}
        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center self-end sm:self-center"
        title="Xóa chính sách"
        aria-label={`Xóa chính sách #${index + 1}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
