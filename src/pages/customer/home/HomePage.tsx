import { useState, useEffect } from 'react'
import { Zap, ArrowRight, ChevronRight } from 'lucide-react'
import type { Product } from '@/types/customer/product.type'
import { ProductCard } from '@/components/customer/product/ProductCard'
import { TrustBadges } from '@/components/customer/home/TrustBadges'
import { CategorySidebar } from '@/components/customer/home/CategorySidebar'
import { QuickAccess } from '@/components/customer/home/QuickAccess'
import { TechNews } from '@/components/customer/home/TechNews'
import { Button } from '@/components/ui/Button'
import { mockPcProducts, mockLaptopProducts, mockGearProducts } from '@/mocks/customer/product.mock'

import { useToast } from '@/hooks/useToast'
import { cartStore } from '@/stores/cartStore'

export const HomePage = () => {
  const { success } = useToast()
  const [activePcFilter, setActivePcFilter] = useState('all')
  const [activeLaptopFilter, setActiveLaptopFilter] = useState('all')
  const [activeGearFilter, setActiveGearFilter] = useState('all')
  const [isOverlayActive, setIsOverlayActive] = useState(false)

  useEffect(() => {
    const handleToggle = () => setIsOverlayActive((prev) => !prev)
    const handleClose = () => setIsOverlayActive(false)

    window.addEventListener('toggle-category-overlay', handleToggle)
    window.addEventListener('close-category-overlay', handleClose)
    return () => {
      window.removeEventListener('toggle-category-overlay', handleToggle)
      window.removeEventListener('close-category-overlay', handleClose)
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    cartStore.addItem(product)
    success(`Đã thêm ${product.name} vào giỏ hàng thành công!`)
  }

  const handleSelectSidebarCategory = (catId: string) => {
    let targetSectionId = 'pc-banchay'
    if (catId === 'laptop' || catId === 'laptop-gaming') {
      targetSectionId = 'laptop-banchay'
    } else if (catId === 'audio-gear' || catId === 'screen') {
      targetSectionId = 'gear-banchay'
    }
    window.dispatchEvent(new CustomEvent('close-category-overlay'))

    const targetEl = document.getElementById(targetSectionId)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="py-8 relative">
      {/* Màn phủ nền mờ khi danh mục sản phẩm được chọn */}
      {isOverlayActive && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-30 transition-opacity duration-200"
          onClick={() => window.dispatchEvent(new CustomEvent('close-category-overlay'))}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 space-y-12 relative">
        {/* Phần Danh mục bên và Hero Banner */}
        <section
          id="category-section"
          className={`grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch scroll-mt-24 transition-all duration-300 relative ${isOverlayActive ? 'z-40' : ''
            }`}
        >
          {/* Thanh danh mục bên */}
          <div className={`lg:col-span-1 relative transition-all duration-300 ${isOverlayActive ? 'z-40 ring-2 ring-[#E30019] rounded-[8px] shadow-2xl' : ''}`}>
            <CategorySidebar onSelectCategory={handleSelectSidebarCategory} />
          </div>

          {/* Hero Banner chính */}
          <div className="lg:col-span-3">
            <div className="bg-[#040004] text-white rounded-[8px] p-8 md:p-12 relative overflow-hidden border border-zinc-800 shadow-md h-full flex flex-col justify-center min-h-[360px]">
              {/* Hình nền & Màn phủ chuyển màu */}
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80"
                alt="Gaming Setup Banner"
                className="absolute inset-0 w-full h-full object-cover object-right opacity-40 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#040004] via-[#040004]/90 to-transparent z-0" />

              {/* Nội dung Banner */}
              <div className="max-w-2xl relative z-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-[#E30019]/10 border border-[#E30019]/30 text-[#E30019] text-xs font-semibold px-3 py-1 rounded-[4px] uppercase tracking-wider backdrop-blur-sm">
                  <Zap className="w-3.5 h-3.5" /> GAMING GEAR & COMPONENTS 2025
                </span>
                <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight leading-tight">
                  Thế Giới Gaming Gear & Linh Kiện Đỉnh Cao
                </h1>
                <p className="text-gray-300 text-base font-body leading-relaxed">
                  Trải nghiệm hiệu năng vượt trội với các dòng Laptop, GPU RTX Series, Bàn phím cơ Custom và Tai nghe Hi-Res chính hãng.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="lg">
                    <span>Khám phá ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-700 text-white hover:border-white hover:text-white backdrop-blur-sm"
                    onClick={() => {
                      const el = document.getElementById('pc-banchay')
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                  >
                    Xem danh mục
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phần 4 Cam kết & Tiện ích */}
        <TrustBadges />

        {/* Truy cập nhanh & Thương hiệu đối tác */}
        <QuickAccess />

        {/* SECTION 1: PC BÁN CHẠY */}
        <section id="pc-banchay" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E0E0E0] pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold font-heading text-[#040004]">
                PC Bán Chạy
              </h2>
            </div>

            {/* Các nút lọc chip & Liên kết Xem tất cả */}
            <div className="flex items-center gap-3 flex-wrap justify-between md:justify-end w-full md:w-auto">
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="chip"
                  isActive={activePcFilter === 'ai'}
                  onClick={() => setActivePcFilter(activePcFilter === 'ai' ? 'all' : 'ai')}
                >
                  PC AI
                </Button>
                <Button
                  variant="chip"
                  isActive={activePcFilter === 'i5'}
                  onClick={() => setActivePcFilter(activePcFilter === 'i5' ? 'all' : 'i5')}
                >
                  PC Core i5
                </Button>
                <Button
                  variant="chip"
                  isActive={activePcFilter === 'i7'}
                  onClick={() => setActivePcFilter(activePcFilter === 'i7' ? 'all' : 'i7')}
                >
                  PC Core i7
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setActivePcFilter('all')}
                className="inline-flex items-center gap-1 text-sm font-bold text-[#E30019] hover:underline transition-mechanical cursor-pointer shrink-0"
              >
                <span>Xem tất cả </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPcProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* SECTION 2: LAPTOP BÁN CHẠY */}
        <section id="laptop-banchay" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E0E0E0] pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold font-heading text-[#040004]">
                Laptop Bán Chạy
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-between md:justify-end w-full md:w-auto">
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="chip"
                  isActive={activeLaptopFilter === 'rog'}
                  onClick={() => setActiveLaptopFilter(activeLaptopFilter === 'rog' ? 'all' : 'rog')}
                >
                  ASUS ROG
                </Button>
                <Button
                  variant="chip"
                  isActive={activeLaptopFilter === 'nitro'}
                  onClick={() => setActiveLaptopFilter(activeLaptopFilter === 'nitro' ? 'all' : 'nitro')}
                >
                  Acer Predator
                </Button>
                <Button
                  variant="chip"
                  isActive={activeLaptopFilter === 'msi'}
                  onClick={() => setActiveLaptopFilter(activeLaptopFilter === 'msi' ? 'all' : 'msi')}
                >
                  MSI Gaming
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setActiveLaptopFilter('all')}
                className="inline-flex items-center gap-1 text-sm font-bold text-[#E30019] hover:underline transition-mechanical cursor-pointer shrink-0"
              >
                <span>Xem tất cả </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockLaptopProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* SECTION 3: LINH KIỆN & GAMING GEAR BÁN CHẠY */}
        <section id="gear-banchay" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E0E0E0] pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold font-heading text-[#040004]">
                Linh Kiện & Gear Bán Chạy
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-between md:justify-end w-full md:w-auto">
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="chip"
                  isActive={activeGearFilter === 'keyboard'}
                  onClick={() => setActiveGearFilter(activeGearFilter === 'keyboard' ? 'all' : 'keyboard')}
                >
                  Bàn Phím Cơ
                </Button>
                <Button
                  variant="chip"
                  isActive={activeGearFilter === 'mouse'}
                  onClick={() => setActiveGearFilter(activeGearFilter === 'mouse' ? 'all' : 'mouse')}
                >
                  Chuột Gaming
                </Button>
                <Button
                  variant="chip"
                  isActive={activeGearFilter === 'screen'}
                  onClick={() => setActiveGearFilter(activeGearFilter === 'screen' ? 'all' : 'screen')}
                >
                  Màn Hình
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setActiveGearFilter('all')}
                className="inline-flex items-center gap-1 text-sm font-bold text-[#E30019] hover:underline transition-mechanical cursor-pointer shrink-0"
              >
                <span>Xem tất cả </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockGearProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Phần Tin tức công nghệ & Đánh giá */}
        <TechNews />
      </div>
    </div>
  )
}
