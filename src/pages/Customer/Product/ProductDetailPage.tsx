import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, CheckCircle2, MessageSquare, ShieldCheck, Home } from 'lucide-react'
import { productApi } from '@/apis/product.api'
import type { Product, ProductDetail, ProductVariantOption } from '@/types/product.type'
import { cartStore } from '@/stores/cartStore'
import { useAuth } from '@/hooks/useAuth'

import { ProductImageGallery } from '@/components/customer/Product/ProductImageGallery'
import { ProductInfo } from '@/components/customer/Product/ProductInfo'
import { ProductVariantSelector } from '@/components/customer/Product/ProductVariantSelector'
import { ProductPurchaseActions } from '@/components/customer/Product/ProductPurchaseActions'
import { ProductHighlights } from '@/components/customer/Product/ProductHighlights'
import { ProductDescription } from '@/components/customer/Product/ProductDescription'
import { ProductSpecifications } from '@/components/customer/Product/ProductSpecifications'
import { ProductReviewSummary } from '@/components/customer/Product/ProductReviewSummary'
import { ProductReviewList } from '@/components/customer/Product/ProductReviewList'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { isAuthenticated, openLoginModal } = useAuth()

  const [loading, setLoading] = useState(true)
  const [productData, setProductData] = useState<{ product: Product; detail: ProductDetail } | null>(null)
  const [selectedVariantOptions, setSelectedVariantOptions] = useState<Record<string, ProductVariantOption>>({})
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!slug) return

    let isMounted = true

    const fetchProductDetail = async () => {
      const res = await productApi.getProductDetailBySlug(slug)
      if (!isMounted) return

      if (res.success && res.data) {
        setProductData(res.data)

        // Initialize default selected variant options
        const initialOptions: Record<string, ProductVariantOption> = {}
        res.data.detail.variantGroups?.forEach((group) => {
          if (group.options.length > 0) {
            initialOptions[group.id] = group.options[0]
          }
        })
        setSelectedVariantOptions(initialOptions)
      } else {
        setProductData(null)
      }
      setLoading(false)
    }

    fetchProductDetail()

    return () => {
      isMounted = false
    }
  }, [slug])

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Resolve current price, SKU, and stock based on selected variant options
  const resolveVariantDetails = () => {
    if (!productData) return { price: 0, sku: '', stock: 0 }
    let price = productData.product.price
    let sku = productData.detail.sku
    let stock = productData.detail.stockQuantity

    Object.values(selectedVariantOptions).forEach((opt) => {
      if (opt.price) price = opt.price
      if (opt.sku) sku = opt.sku
      if (opt.stock !== undefined) stock = opt.stock
    })

    return { price, sku, stock }
  }

  const handleSelectVariantOption = (groupId: string, option: ProductVariantOption) => {
    setSelectedVariantOptions((prev) => ({
      ...prev,
      [groupId]: option,
    }))
  }

  const handleAddToCart = (quantity: number) => {
    if (!productData) return
    const { price } = resolveVariantDetails()

    const productToAdd: Product = {
      ...productData.product,
      price,
    }

    cartStore.addItem(productToAdd, quantity)
    showToast(`Đã thêm ${quantity} x ${productData.product.name} vào giỏ hàng thành công!`)
  }

  const handleBuyNow = (quantity: number) => {
    if (!productData) return

    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để tiến hành mua ngay!')
      openLoginModal()
      return
    }

    const { price } = resolveVariantDetails()

    const productToAdd: Product = {
      ...productData.product,
      price,
    }

    cartStore.addItem(productToAdd, quantity)
    cartStore.openDrawer()
  }

  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className="bg-[#F4F5F7] min-h-screen py-8 font-body">
        <div className="max-w-7xl mx-auto px-4 space-y-8 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 aspect-square bg-gray-200 rounded-xl" />
            <div className="lg:col-span-7 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-12 bg-gray-200 rounded w-1/2" />
              <div className="h-24 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 2. Product Not Found 404 State
  if (!productData) {
    return (
      <div className="bg-[#F4F5F7] min-h-screen py-12 md:py-20 font-body">
        <div className="max-w-md mx-auto px-4 text-center space-y-5 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30019] mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 stroke-1.5" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold font-heading text-[#040004]">
              Không tìm thấy sản phẩm
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã ngừng kinh doanh.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-[6px] transition-all cursor-pointer shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Quay về Trang chủ</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { product, detail } = productData
  const { price: currentPrice, sku: currentSku, stock: currentStock } = resolveVariantDetails()

  const categoryLabelMap: Record<string, string> = {
    laptop: 'Laptop',
    pc: 'PC Gaming & Linh kiện',
    gear: 'Gaming Gear',
    screen: 'Màn hình',
  }

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
