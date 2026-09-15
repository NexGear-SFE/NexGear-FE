import { useState } from 'react'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import type { ProductImage } from '@/types/product.type'

interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [imageError, setImageError] = useState<Record<string, boolean>>({})

  const currentImage = images[selectedIndex] || images[0]

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageError = (id: string) => {
    setImageError((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative w-full aspect-square bg-[#F8F9FA] rounded-xl border border-[#E0E0E0] overflow-hidden group shadow-xs">
        {imageError[currentImage?.id] || !currentImage?.url ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
            <ImageOff className="w-12 h-12 stroke-1" />
            <span className="text-xs font-medium">Hình ảnh sản phẩm</span>
          </div>
        ) : (
          <img
            src={currentImage.url}
            alt={currentImage.alt || productName}
            onError={() => handleImageError(currentImage.id)}
            className="w-full h-full object-contain p-4 transition-all duration-300 group-hover:scale-105"
          />
        )}

        {/* Previous / Next Floating Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              aria-label="Hình trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              aria-label="Hình tiếp theo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, idx) => {
            const isSelected = selectedIndex === idx
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 p-1 bg-white flex items-center justify-center overflow-hidden shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#E30019] ring-2 ring-red-100 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                }`}
              >
                {imageError[img.id] ? (
                  <ImageOff className="w-6 h-6 text-gray-300" />
                ) : (
                  <img
                    src={img.url}
                    alt={img.alt || `${productName} ${idx + 1}`}
                    onError={() => handleImageError(img.id)}
                    className="w-full h-full object-contain"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
