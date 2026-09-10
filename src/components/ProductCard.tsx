import { useState } from 'react'
import { Cpu, HardDrive, Monitor, ShoppingCart, ImageOff } from 'lucide-react'
import type { Product } from '@/types/product.type'
import { formatCurrency } from '@/utils/formatCurrency'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  className?: string
}

export const ProductCard = ({
  product,
  onAddToCart,
  className,
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false)

  // Dynamic icon helper for product specs
  const renderSpecIcon = (label: string) => {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes('cpu') || lowerLabel.includes('processor')) {
      return <Cpu className="w-3.5 h-3.5 text-gray-500 shrink-0" />
    }
    if (lowerLabel.includes('ram') || lowerLabel.includes('gpu') || lowerLabel.includes('vga')) {
      return <Cpu className="w-3.5 h-3.5 text-gray-500 shrink-0" />
    }
    if (lowerLabel.includes('ssd') || lowerLabel.includes('hdd') || lowerLabel.includes('storage')) {
      return <HardDrive className="w-3.5 h-3.5 text-gray-500 shrink-0" />
    }
    return <Monitor className="w-3.5 h-3.5 text-gray-500 shrink-0" />
  }

  return (
    <div
      className={cn(
        'bg-white border border-[#E0E0E0] rounded-[8px] p-4 flex flex-col justify-between space-y-3.5 shadow-sm transition-mechanical hover:border-[#E30019] group relative',
        className
      )}
    >
      {/* Product Image Area */}
      <div className="w-full aspect-square bg-[#F4F5F7] rounded-[4px] flex items-center justify-center overflow-hidden relative">
        {/* Stock Status Tag */}
        <span className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm border border-[#E0E0E0] text-[10px] font-semibold px-2 py-0.5 rounded-[2px] flex items-center gap-1 text-[#00A859] z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
          {product.inStock !== false ? 'Còn hàng' : 'Liên hệ'}
        </span>

        {imageError || !product.image ? (
          <div className="flex flex-col items-center gap-1.5 text-gray-400">
            <ImageOff className="w-10 h-10 stroke-1" />
            <span className="text-[11px] text-gray-400">Hình ảnh sản phẩm</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="font-semibold text-sm text-[#040004] leading-snug line-clamp-2 min-h-[40px]" title={product.name}>
            {product.name}
          </h3>
        </div>

        {/* Surface Specs Box */}
        {product.specs && product.specs.length > 0 && (
          <div className="bg-[#F8F9FA] border border-[#E0E0E0]/60 rounded-[4px] p-2 space-y-1 my-1">
            {product.specs.slice(0, 3).map((spec, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                {renderSpecIcon(spec.label)}
                <span className="font-medium text-gray-700 truncate">
                  {spec.label}: <strong className="text-[#040004] font-semibold">{spec.value}</strong>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Price Section */}
        <div className="pt-1 flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-[#E30019]">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>

      {/* Full-width Add to Cart Button */}
      <Button
        variant="primary"
        size="md"
        className="w-full mt-2 text-xs py-2.5 rounded-[4px]"
        onClick={() => onAddToCart?.(product)}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Thêm vào giỏ</span>
      </Button>
    </div>
  )
}
