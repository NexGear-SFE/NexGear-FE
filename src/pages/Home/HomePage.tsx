import { Cpu, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'

export const HomePage = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Hero Section */}
        <section className="bg-[#040004] text-white rounded-[8px] p-8 md:p-12 relative overflow-hidden border border-zinc-800 shadow-md">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#E30019]/10 border border-[#E30019]/30 text-[#E30019] text-xs font-semibold px-3 py-1 rounded-[4px] uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> GAMING GEAR &amp; COMPONENTS 2025
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight leading-tight">
              Thế Giới Gaming Gear &amp; Linh Kiện Đỉnh Cao
            </h1>
            <p className="text-gray-300 text-base font-body leading-relaxed">
              Trải nghiệm hiệu năng vượt trội với các dòng Laptop, GPU RTX Series, Bàn phím cơ Custom và Tai nghe Hi-Res chính hãng.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="bg-[#E30019] hover:bg-[#B30014] text-white px-6 py-3 rounded-[4px] font-semibold text-sm transition-mechanical flex items-center gap-2 cursor-pointer"
              >
                <span>Khám phá ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="border border-zinc-700 hover:border-white text-white px-6 py-3 rounded-[4px] font-medium text-sm transition-mechanical cursor-pointer"
              >
                Xem danh mục
              </button>
            </div>
          </div>
        </section>

        {/* Feature Badges Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-[8px] border border-[#E0E0E0] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[4px] bg-[#E30019]/10 flex items-center justify-center text-[#E30019]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#040004] m-0">Bảo hành 1 đổi 1</h3>
              <p className="text-xs text-[#636363] m-0">Cam kết chính hãng 100%</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[8px] border border-[#E0E0E0] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[4px] bg-[#E30019]/10 flex items-center justify-center text-[#E30019]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#040004] m-0">Giao hàng siêu tốc</h3>
              <p className="text-xs text-[#636363] m-0">Nội thành trong 2 giờ</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[8px] border border-[#E0E0E0] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[4px] bg-[#E30019]/10 flex items-center justify-center text-[#E30019]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#040004] m-0">Hỗ trợ kỹ thuật</h3>
              <p className="text-xs text-[#636363] m-0">Tư vấn cấu hình PC 24/7</p>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-heading text-[#040004] m-0">
              Sản phẩm Nổi bật
            </h2>
            <a href="#all" className="text-xs font-semibold text-[#E30019] hover:underline">
              Xem tất cả &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              brand="INTEL CORE I9"
              name="CPU Intel Core i9-14900K (Up to 6.0GHz, 24 Nhân 32 Luồng)"
              price={14990000}
              icon={<Cpu className="w-16 h-16 text-gray-400" />}
            />
            <ProductCard
              brand="NVIDIA GEFORCE"
              name="VGA ASUS ROG Strix GeForce RTX 4080 SUPER 16GB GDDR6X"
              price={32490000}
              icon={<Cpu className="w-16 h-16 text-gray-400" />}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
