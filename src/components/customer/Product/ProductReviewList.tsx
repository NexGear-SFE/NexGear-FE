import { useState, useMemo } from 'react'
import { Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductReview } from '@/types/product.type'

interface ProductReviewListProps {
  reviews: ProductReview[]
}

const REVIEWS_PER_PAGE = 3

export function ProductReviewList({ reviews }: ProductReviewListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Sort reviews newest first (default descending order)
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      // Parse date DD/MM/YYYY
      const parseDate = (dStr: string) => {
        const parts = dStr.split('/')
        if (parts.length === 3) {
          return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).getTime()
        }
        return new Date(dStr).getTime() || 0
      }
      return parseDate(b.date) - parseDate(a.date)
    })
  }, [reviews])

  const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE)
  const paginatedReviews = useMemo(() => {
    const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE
    return sortedReviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE)
  }, [sortedReviews, currentPage])

  // Empty state handling
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 space-y-3 bg-[#FAFBFD] rounded-xl border border-dashed border-gray-300 p-6">
        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto stroke-1" />
        <div className="space-y-1">
          <p className="text-sm font-bold text-gray-700 font-heading">
            Chưa có đánh giá cho sản phẩm này
          </p>
          <p className="text-xs text-gray-500">
            Hãy là người đầu tiên đánh giá sản phẩm.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header bar: Sorting Indicator */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs text-gray-500">
        <span className="font-semibold text-gray-700">
          Hiển thị {sortedReviews.length} nhận xét
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
          Sắp xếp: <strong>Mới nhất</strong>
        </span>
      </div>

      {/* Review List Cards */}
      <div className="space-y-3.5">
        {paginatedReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white border border-[#E0E0E0] rounded-xl p-4 sm:p-5 space-y-2.5 shadow-2xs"
          >
            {/* Reviewer Header */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                {rev.avatarUrl ? (
                  <img
                    src={rev.avatarUrl}
                    alt={rev.customerName}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#E30019] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {rev.customerName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#040004]">
                    {rev.customerName}
                  </h4>

                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-gray-400 font-mono">{rev.date}</span>
            </div>

            {/* Review Content */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
              {rev.content}
            </p>

            {/* Review Images */}
            {rev.images && rev.images.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                {rev.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Ảnh đánh giá"
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Trang trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1
            const isActive = currentPage === pageNum
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E30019] text-white shadow-xs'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            )
          })}

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Trang sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
