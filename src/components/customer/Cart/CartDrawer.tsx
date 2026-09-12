import { useEffect } from 'react'
import { ShoppingCart, X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartState, useCartTotal, useCartCount, cartStore } from '@/stores/cartStore'
import { formatCurrency } from '@/utils/formatCurrency'

export const CartDrawer = () => {
  const { items, isDrawerOpen } = useCartState()
  const totalCount = useCartCount()
  const totalPrice = useCartTotal()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        cartStore.closeDrawer()
      }
    }
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen])

  if (!isDrawerOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
        onClick={() => cartStore.closeDrawer()}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 className="text-lg font-bold text-[#040004]">Giỏ hàng của bạn</h2>
              <p className="text-xs text-gray-500 font-medium">{totalCount} sản phẩm</p>
            </div>
            <button
              onClick={() => cartStore.closeDrawer()}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-gray-400 stroke-1" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-700">Giỏ hàng của bạn đang trống</p>
                  <p className="text-xs text-gray-500">Hãy chọn sản phẩm bạn yêu thích và thêm vào giỏ nhé!</p>
                </div>
                <button
                  onClick={() => cartStore.closeDrawer()}
                  className="mt-4 px-4 py-2 bg-black text-white text-xs font-semibold rounded-[6px] hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Khám phá sản phẩm
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-[8px] p-3 flex gap-3 items-center bg-white hover:border-gray-300 transition-colors"
                >
                  {/* Thumbnail Image */}
                  <div className="w-16 h-16 bg-[#F4F5F7] rounded-[6px] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  {/* Title, Price & Stepper */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h4
                      className="text-xs font-semibold text-[#040004] leading-snug line-clamp-2"
                      title={product.name}
                    >
                      {product.name}
                    </h4>
                    <div className="text-sm font-bold text-[#E30019]">
                      {formatCurrency(product.price)}
                    </div>

                    {/* Stepper buttons */}
                    <div className="flex items-center gap-1">
                      <div className="inline-flex items-center border border-gray-200 rounded-[4px] bg-gray-50">
                        <button
                          type="button"
                          onClick={() => cartStore.updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors rounded-l-[4px] cursor-pointer"
                          aria-label="Giảm số lượng"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-800 min-w-[24px] text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => cartStore.updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors rounded-r-[4px] cursor-pointer"
                          aria-label="Tăng số lượng"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => cartStore.removeItem(product.id)}
                    className="p-1.5 text-gray-400 hover:text-[#E30019] transition-colors rounded-full hover:bg-red-50 cursor-pointer shrink-0"
                    title="Xóa khỏi giỏ hàng"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-white shrink-0">
              <button
                type="button"
                onClick={() => {
                  cartStore.closeDrawer()
                  // Navigate to checkout or cart page
                }}
                className="w-full bg-[#E30019] hover:bg-[#cc0016] text-white font-bold py-3.5 px-4 rounded-[6px] flex items-center justify-center gap-2 shadow-md transition-all text-sm cursor-pointer"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                <span>Xem giỏ hàng — {formatCurrency(totalPrice)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
