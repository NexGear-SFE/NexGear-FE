import React, { useState } from 'react'
import type { CategoryToggle, ShelfProduct } from '@/types/admin/homeProductsConfig.type'
import { ShelfProductTable } from '@/components/admin/home-products/ShelfProductTable'
import { CategoryIcon } from '@/constants/homeProductsConstants'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CategoryShelfAccordionProps {
  category: CategoryToggle
  products: ShelfProduct[]
  defaultOpen?: boolean
}

export const CategoryShelfAccordion: React.FC<CategoryShelfAccordionProps> = ({
  category,
  products,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-5 overflow-hidden transition-shadow hover:shadow-md">
      {/* Header */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-5 flex items-center justify-between cursor-pointer select-none bg-white hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center">
            <span className="w-1 h-5 bg-red-600 rounded-full inline-block mr-2.5" />
            <span className="p-1.5 rounded-lg bg-red-50 text-red-600 inline-flex items-center justify-center mr-2">
              <CategoryIcon icon={category.icon} className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {category.name}
            </h3>
          </div>


          <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
            {products.length} sản phẩm
          </span>
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Thu gọn shelf' : 'Mở rộng shelf'}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="border-t border-slate-100 p-1 bg-white">
          <ShelfProductTable products={products} />
        </div>
      )}
    </div>
  )
}
