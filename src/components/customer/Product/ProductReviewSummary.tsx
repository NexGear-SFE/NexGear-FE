import { Star } from 'lucide-react'
import type { ProductRatingSummary } from '@/types/product.type'

interface ProductReviewSummaryProps {
  summary: ProductRatingSummary
}

export function ProductReviewSummary({ summary }: ProductReviewSummaryProps) {
  const { average, totalReviews, distribution } = summary

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        className={`w-4 h-4 ${
          idx < Math.floor(rating)
            ? 'fill-amber-400 text-amber-400'
            : idx < rating
            ? 'fill-amber-200 text-amber-400'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="bg-[#FAFBFD] border border-[#E0E0E0] rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-2xs">
      {/* Left Column: Average Score */}
      <div className="flex flex-col items-center justify-center text-center space-y-1.5 md:border-r md:border-gray-200 pr-0 md:pr-6">
        <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          {average.toFixed(1)}
        </span>
        <div className="flex items-center gap-1">{renderStars(average)}</div>
        <p className="text-xs text-gray-500 font-medium">
          Dựa trên <strong>{totalReviews}</strong> đánh giá từ khách hàng
        </p>
      </div>

      {/* Center & Right Column: Star Distribution Bars */}
      <div className="md:col-span-2 space-y-2">
        {[5, 4, 3, 2, 1].map((starCount) => {
          const count = distribution[starCount as 1 | 2 | 3 | 4 | 5] || 0
          const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0

          return (
            <div key={starCount} className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 w-12 shrink-0 font-bold text-gray-700">
                <span>{starCount}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>

              <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="w-12 text-right text-gray-500 font-mono font-semibold shrink-0">
                {count}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
