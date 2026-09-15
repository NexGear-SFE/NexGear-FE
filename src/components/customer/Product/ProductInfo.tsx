import { Star, ShieldCheck, Truck, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import type { Product, ProductDetail } from '@/types/product.type'
import { formatCurrency } from '@/utils/formatCurrency'

interface ProductInfoProps {
  product: Product
  detail: ProductDetail
  currentPrice?: number
  currentSku?: string
  currentStock?: number
}

export function ProductInfo({ product, detail, currentPrice, currentSku, currentStock }: ProductInfoProps) {
  const priceToDisplay = currentPrice || product.price
  const skuToDisplay = currentSku || detail.sku
  const stockToDisplay = currentStock !== undefined ? currentStock : detail.stockQuantity

  const stockStatus = () => {
    if (!product.inStock || stockToDisplay === 0) {
      return (
        <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-2.5 py-1 rounded-[4px] inline-flex items-center gap-1.5">
          <XCircle className="w-3.5 h-3.5" />
          Hết hàng
        </span>
      )
    }
    if (stockToDisplay <= 3) {
      return (
        <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-[4px] inline-flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          Sắp hết hàng (Chỉ còn {stockToDisplay} sản phẩm)
        </span>
      )
    }
    return (
      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-[4px] inline-flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Còn hàng ({stockToDisplay} sản phẩm)
      </span>
    )
  }

  return (
    <div className="space-y-4">
      {/* Category, Brand, SKU & Rating Row */}
      <div className="flex items-center justify-between gap-3 text-xs text-gray-500 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-700 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
            Thương hiệu: <strong className="text-gray-900 font-bold">{detail.brand}</strong>
          </span>
          <span>·</span>
          <span className="font-mono">SKU: {skuToDisplay}</span>
        </div>

        {/* Rating Summary Badge */}
        {detail.ratingSummary.totalReviews > 0 ? (
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full text-amber-900">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-xs">{detail.ratingSummary.average}</span>
            <span className="text-[11px] text-amber-700 font-medium">({detail.ratingSummary.totalReviews} đánh giá)</span>
          </div>
        ) : (
          <div className="text-[11px] text-gray-400 font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
            Chưa có đánh giá
          </div>
        )}
      </div>

      {/* Product Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#040004] leading-tight">
        {product.name}
      </h1>

      {/* Selling Price Display Box */}
      <div className="bg-[#FAFBFD] border border-[#E0E0E0] rounded-xl p-4 sm:p-5 flex items-baseline gap-3 flex-wrap shadow-2xs">
        <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E30019] font-heading">
          {formatCurrency(priceToDisplay)}
        </span>
      </div>

      {/* Stock & Quick Badges */}
      <div className="flex items-center justify-between gap-4 pt-1 border-b border-gray-100 pb-4 flex-wrap">
        <div>{stockStatus()}</div>

        <div className="flex items-center gap-4 text-xs text-gray-600 font-medium">
          <span className="inline-flex items-center gap-1.5 text-gray-700">
            <ShieldCheck className="w-4 h-4 text-[#E30019]" />
            {detail.warrantyPeriod}
          </span>
        </div>
      </div>

      {/* Shipping Summary Notice */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 flex items-center gap-2.5">
        <Truck className="w-4 h-4 text-blue-600 shrink-0" />
        <span>{detail.shippingInfo}</span>
      </div>
    </div>
  )
}
