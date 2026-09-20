import { Link } from 'react-router-dom'
import { ChevronRight, CheckCircle2, MessageSquare, Home } from 'lucide-react'
import { useProductDetail } from '@/hooks/useProductDetail'
import { ProductDetailSkeleton } from '@/components/common/ProductDetailSkeleton'
import { NotFoundPage } from '@/pages/common/NotFoundPage'

import { ProductImageGallery } from '@/components/customer/Product/ProductImageGallery'
import { ProductInfo } from '@/components/customer/Product/ProductInfo'
import { ProductVariantSelector } from '@/components/customer/Product/ProductVariantSelector'
import { ProductPurchaseActions } from '@/components/customer/Product/ProductPurchaseActions'
import { ProductHighlights } from '@/components/customer/Product/ProductHighlights'
import { ProductDescription } from '@/components/customer/Product/ProductDescription'
import { ProductSpecifications } from '@/components/customer/Product/ProductSpecifications'
import { ProductReviewSummary } from '@/components/customer/Product/ProductReviewSummary'
import { ProductReviewList } from '@/components/customer/Product/ProductReviewList'

const categoryLabelMap: Record<string, string> = {
  laptop: 'Laptop',
  pc: 'PC Gaming & Linh kiện',
  gear: 'Gaming Gear',
  screen: 'Màn hình',
}

export function ProductDetailPage() {
  const {
    loading,
    productData,
    selectedVariantOptions,
    toastMessage,
    currentPrice,
    currentSku,
    currentStock,
    handleSelectVariantOption,
    handleAddToCart,
    handleBuyNow,
    showToast,
  } = useProductDetail()

  // 1. Loading Skeleton State
  if (loading) {
    return <ProductDetailSkeleton />
  }

  // 2. Product Not Found 404 State
  if (!productData) {
    return <NotFoundPage />
  }

  const { product, detail } = productData

  return (
    <div className="bg-[#F4F5F7] min-h-screen py-6 md:py-8 font-body relative">
      {/* Floating Add-to-Cart Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#040004] text-white px-5 py-3 rounded-[8px] border border-[#E30019] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#00A859] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* A. Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-[#E30019] transition-colors flex items-center gap-1 shrink-0">
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="hover:text-[#E30019] transition-colors shrink-0">
            {categoryLabelMap[product.category] || product.category}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-semibold truncate">{product.name}</span>
        </nav>

        {/* B. Overview Section: Two-column Desktop Layout */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Product Image Gallery (5 cols) */}
            <div className="lg:col-span-5">
              <ProductImageGallery images={detail.images} productName={product.name} />
            </div>

            {/* Right Column: Product Purchasing Panel (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <ProductInfo
                product={product}
                detail={detail}
                currentPrice={currentPrice}
                currentSku={currentSku}
                currentStock={currentStock}
              />

              {detail.variantGroups && detail.variantGroups.length > 0 && (
                <ProductVariantSelector
                  variantGroups={detail.variantGroups}
                  selectedOptions={selectedVariantOptions}
                  onSelectOption={handleSelectVariantOption}
                />
              )}

              <ProductPurchaseActions
                inStock={product.inStock && currentStock > 0}
                maxStock={currentStock}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />

              <ProductHighlights highlights={detail.highlights} />
            </div>
          </div>
        </div>

        {/* C. Product Description Section */}
        {detail.descriptionSections && detail.descriptionSections.length > 0 && (
          <ProductDescription sections={detail.descriptionSections} />
        )}

        {/* D. Technical Specifications Section */}
        {detail.specificationGroups && detail.specificationGroups.length > 0 && (
          <ProductSpecifications groups={detail.specificationGroups} />
        )}

        {/* E. Product Reviews & Ratings Section */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#E30019]" />
              <h2 className="text-lg sm:text-xl font-bold font-heading text-[#040004]">
                Đánh giá từ khách hàng ({detail.ratingSummary.totalReviews})
              </h2>
            </div>

            <button
              type="button"
              onClick={() => showToast('Cảm ơn bạn! Chức năng gửi đánh giá sẽ được mở sau khi bạn hoàn tất đơn hàng.')}
              className="text-xs font-bold text-[#E30019] hover:underline cursor-pointer"
            >
              Viết đánh giá
            </button>
          </div>

          <ProductReviewSummary summary={detail.ratingSummary} />

          <ProductReviewList reviews={detail.reviews} />
        </div>
      </div>
    </div>
  )
}
