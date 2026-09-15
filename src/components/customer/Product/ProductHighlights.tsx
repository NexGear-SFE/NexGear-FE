import { ShieldCheck, RotateCcw, Truck, Headphones } from 'lucide-react'
import type { ProductHighlight } from '@/types/product.type'

interface ProductHighlightsProps {
  highlights: ProductHighlight[]
}

export function ProductHighlights({ highlights }: ProductHighlightsProps) {
  if (!highlights || highlights.length === 0) return null

  const getHighlightIcon = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return <ShieldCheck className="w-5 h-5 text-[#E30019] shrink-0" />
      case 1:
        return <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0" />
      case 2:
        return <Truck className="w-5 h-5 text-blue-600 shrink-0" />
      default:
        return <Headphones className="w-5 h-5 text-amber-600 shrink-0" />
    }
  }

  return (
    <div className="bg-[#FAFBFD] border border-[#E0E0E0] rounded-xl p-4 sm:p-5 space-y-3 shadow-2xs">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider font-heading">
        Quyền lợi khách hàng tại NexGear
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-200/70">
            {getHighlightIcon(idx)}
            <div className="space-y-0.5 min-w-0">
              <h4 className="font-bold text-xs text-[#040004] font-heading leading-snug">{item.title}</h4>
              {item.description && (
                <p className="text-[11px] text-gray-500 leading-normal">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
