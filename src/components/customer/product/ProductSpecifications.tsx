import { useState } from 'react'
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import type { ProductSpecificationsProps } from '@/types/customer/product.type'

export function ProductSpecifications({ groups }: ProductSpecificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!groups || groups.length === 0) return null

  // Flatten or limit for collapsed state
  const displayedGroups = isExpanded ? groups : groups.slice(0, 2)

  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 sm:p-8 space-y-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#E30019]" />
          <h2 className="text-lg sm:text-xl font-bold font-heading text-[#040004]">
            Thông số kỹ thuật
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {displayedGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded border border-gray-200/60 font-heading">
              {group.groupName}
            </h3>

            <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden text-xs sm:text-sm">
              {group.specs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className={`grid grid-cols-1 sm:grid-cols-3 p-3 gap-1.5 ${
                    sIdx % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFD]'
                  }`}
                >
                  <span className="font-semibold text-slate-600 sm:col-span-1">{spec.label}</span>
                  <span className="font-medium text-slate-900 sm:col-span-2">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {groups.length > 2 && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E30019] hover:underline cursor-pointer border border-red-200 px-4 py-2 rounded-full bg-red-50/50 hover:bg-red-50 transition-colors"
          >
            <span>{isExpanded ? 'Thu gọn thông số kỹ thuật' : 'Xem đầy đủ thông số kỹ thuật'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  )
}
