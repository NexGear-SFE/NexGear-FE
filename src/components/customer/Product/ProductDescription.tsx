import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp } from 'lucide-react'
import type { ProductDescriptionSection } from '@/types/product.type'

interface ProductDescriptionProps {
  sections: ProductDescriptionSection[]
}

export function ProductDescription({ sections }: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!sections || sections.length === 0) return null

  const displayedSections = isExpanded ? sections : sections.slice(0, 2)
  const canExpand = sections.length > 2

  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
        <FileText className="w-5 h-5 text-[#E30019]" />
        <h2 className="text-lg sm:text-xl font-bold font-heading text-[#040004]">
          Đánh giá &amp; Mô tả chi tiết
        </h2>
      </div>

      <div className="space-y-6">
        {displayedSections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
              {section.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
              {section.content}
            </p>

            {section.image && (
              <div className="rounded-lg overflow-hidden border border-gray-200 my-4 max-w-2xl mx-auto">
                <img src={section.image} alt={section.title} className="w-full object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {canExpand && (
        <div className="pt-2 text-center border-t border-gray-100">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E30019] hover:underline cursor-pointer border border-red-200 px-4 py-2 rounded-full bg-red-50/50 hover:bg-red-50 transition-colors"
          >
            <span>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  )
}
