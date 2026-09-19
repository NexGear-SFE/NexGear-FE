import { useState } from 'react'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import type { ProductPurchaseActionsProps } from '@/types/customer/product.type'

export function ProductPurchaseActions({
  inStock,
  maxStock,
  onAddToCart,
  onBuyNow,
}: ProductPurchaseActionsProps) {
  const [quantity, setQuantity] = useState(1)

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const isOutOfStock = !inStock || maxStock === 0

  return (
    <div className="space-y-4 pt-3 border-t border-gray-100">
      {/* Quantity Selector & Label */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-slate-900 font-heading">Số lượng:</span>

        <div className="flex items-center border border-gray-300 rounded-[6px] bg-white overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Giảm số lượng"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-10 text-center text-xs font-bold text-gray-900 font-mono">
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            disabled={quantity >= maxStock || isOutOfStock}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Tăng số lượng"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {maxStock > 0 && maxStock <= 5 && (
          <span className="text-[11px] text-amber-700 font-semibold">
            (Còn lại {maxStock} sản phẩm)
          </span>
        )}
      </div>

      {/* Primary Actions Row */}
      {isOutOfStock ? (
        <div className="w-full bg-slate-100 text-slate-500 font-bold py-3.5 px-6 rounded-[8px] text-sm text-center border border-slate-200">
          Sản phẩm hiện đang hết hàng
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Add to Cart */}
          <button
            type="button"
            onClick={() => onAddToCart(quantity)}
            className="w-full border-2 border-[#E30019] text-[#E30019] hover:bg-red-50 font-bold py-3 px-5 rounded-[8px] text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Thêm vào giỏ hàng</span>
          </button>

          {/* Buy Now */}
          <button
            type="button"
            onClick={() => onBuyNow(quantity)}
            className="w-full bg-[#E30019] hover:bg-[#cc0016] text-white font-bold py-3 px-5 rounded-[8px] text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Mua ngay</span>
          </button>
        </div>
      )}
    </div>
  )
}
