import { useState } from 'react'
import { Zap, ArrowRight } from 'lucide-react'
import type { Product } from '@/types/product.type'
import { ProductCard } from '@/components/ProductCard'
import { TrustBadges } from '@/components/TrustBadges'
import { CategorySidebar } from '@/components/CategorySidebar'
import { Button } from '@/components/ui/Button'

export const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pc' | 'laptop' | 'gear'>('all')

  const mockProducts: Product[] = [
    {
      id: 'prod-1',
      name: 'CPU Intel Core i9-14900K (Up to 6.0GHz, 24 Nhân 32 Luồng)',
      slug: 'cpu-intel-core-i9-14900k',
      price: 14990000,
      image: '',
      category: 'pc',
      inStock: true,
      specs: [
        { label: 'CPU', value: 'i9-14900K' },
        { label: 'Cores', value: '24 Cores / 32 Threads' },
        { label: 'Clock', value: 'Up to 6.0GHz' },
      ],
    },
    {
      id: 'prod-2',
      name: 'VGA ASUS ROG Strix GeForce RTX 4080 SUPER 16GB GDDR6X',
      slug: 'vga-asus-rog-strix-geforce-rtx-4080-super-16gb',
      price: 32490000,
      image: '',
      category: 'pc',
      inStock: true,
      specs: [
        { label: 'GPU', value: 'RTX 4080 SUPER' },
        { label: 'VRAM', value: '16GB GDDR6X' },
        { label: 'Bus', value: '256-bit' },
      ],
    },
    {
      id: 'prod-3',
      name: 'Laptop Gaming ASUS ROG Strix G16 (i7-13650HX, 16GB RAM, RTX 4060)',
      slug: 'laptop-gaming-asus-rog-strix-g16',
      price: 38990000,
      image: '',
      category: 'laptop',
      inStock: true,
      specs: [
        { label: 'CPU', value: 'i7-13650HX' },
        { label: 'RAM', value: '16GB DDR5' },
        { label: 'GPU', value: 'RTX 4060 8GB' },
      ],
    },
    {
      id: 'prod-4',
      name: 'Bàn phím cơ Akko 3098B Multi-modes Wireless Mech Keyboard',
      slug: 'ban-phim-co-akko-3098b',
      price: 2450000,
      image: '',
      category: 'gear',
      inStock: true,
      specs: [
        { label: 'Switch', value: 'Akko CS Jelly Pink' },
        { label: 'Connect', value: 'Tri-Mode Wireless' },
        { label: 'Keycap', value: 'PBT Double-Shot' },
      ],
    },
  ]

  const handleAddToCart = (product: Product) => {
    alert(`Đã thêm sản phẩm "${product.name}" vào giỏ hàng thành công!`)
  }

  const handleSelectSidebarCategory = (catId: string) => {
    let mappedCategory: 'all' | 'pc' | 'laptop' | 'gear' = 'all'
    if (catId === 'laptop' || catId === 'laptop-gaming') {
      mappedCategory = 'laptop'
    } else if (catId === 'pc' || catId === 'components' || catId === 'case-power-cooling' || catId === 'storage-ram') {
      mappedCategory = 'pc'
    } else if (catId === 'audio-gear' || catId === 'screen') {
      mappedCategory = 'gear'
    }
    setActiveCategory(mappedCategory)

    const productsEl = document.getElementById('products-section')
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const filteredProducts =
    activeCategory === 'all'
      ? mockProducts
      : mockProducts.filter((p) => p.category === activeCategory)

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Category Sidebar & Hero Banner Section */}
        <section id="category-section" className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch scroll-mt-24">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar onSelectCategory={handleSelectSidebarCategory} />
          </div>

          {/* Hero Section */}
          <div className="lg:col-span-3">
            <div className="bg-[#040004] text-white rounded-[8px] p-8 md:p-12 relative overflow-hidden border border-zinc-800 shadow-md h-full flex flex-col justify-center">
              <div className="max-w-2xl relative z-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-[#E30019]/10 border border-[#E30019]/30 text-[#E30019] text-xs font-semibold px-3 py-1 rounded-[4px] uppercase tracking-wider">
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
                    className="border-zinc-700 text-white hover:border-white hover:text-white"
                    onClick={() => {
                      const el = document.getElementById('products-section')
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

        {/* 4 Trust Badges Section */}
        <TrustBadges />

        {/* Product Grid Section with Category Chip Filters */}
        <section id="products-section" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold font-heading text-[#040004]">
              Sản phẩm Nổi bật
            </h2>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="chip"
                isActive={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
              >
                Tất cả
              </Button>
              <Button
                variant="chip"
                isActive={activeCategory === 'pc'}
                onClick={() => setActiveCategory('pc')}
              >
                Linh kiện PC
              </Button>
              <Button
                variant="chip"
                isActive={activeCategory === 'laptop'}
                onClick={() => setActiveCategory('laptop')}
              >
                Laptop Gaming
              </Button>
              <Button
                variant="chip"
                isActive={activeCategory === 'gear'}
                onClick={() => setActiveCategory('gear')}
              >
                Gaming Gear
              </Button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
