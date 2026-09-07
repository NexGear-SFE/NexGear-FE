import { Cpu, ShieldCheck, Zap, ArrowRight, ShoppingCart } from 'lucide-react'

export const HomePage = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Hero Section */}
        <section className="bg-[#040004] text-white rounded-[8px] p-8 md:p-12 relative overflow-hidden border border-zinc-800 shadow-md">
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
              <h3 className="font-bold text-sm text-[#040004]">Bảo hành 1 đổi 1</h3>
              <p className="text-xs text-[#636363]">Cam kết chính hãng 100%</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[8px] border border-[#E0E0E0] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[4px] bg-[#E30019]/10 flex items-center justify-center text-[#E30019]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#040004]">Giao hàng siêu tốc</h3>
              <p className="text-xs text-[#636363]">Nội thành trong 2 giờ</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[8px] border border-[#E0E0E0] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[4px] bg-[#E30019]/10 flex items-center justify-center text-[#E30019]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#040004]">Hỗ trợ kỹ thuật</h3>
              <p className="text-xs text-[#636363]">Tư vấn cấu hình PC 24/7</p>
            </div>
          </div>
        </section>

        {/* Product Cards Preview Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-heading text-[#040004]">
              Sản phẩm Nổi bật
            </h2>
            <a href="#all" className="text-xs font-semibold text-[#E30019] hover:underline">
              Xem tất cả &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Demo Product Card 1 */}
            <div className="bg-white rounded-[8px] border border-[#E0E0E0] p-4 flex flex-col justify-between space-y-3 relative group transition-mechanical hover:border-[#E30019]">
              <div className="w-full aspect-square bg-[#F4F5F7] rounded-[4px] flex items-center justify-center">
                <Cpu className="w-16 h-16 text-gray-400" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] text-gray-500 font-mono">INTEL CORE I9</span>
                <h3 className="font-semibold text-sm text-[#040004] line-clamp-2">
                  CPU Intel Core i9-14900K (Up to 6.0GHz, 24 Nhân 32 Luồng)
                </h3>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-base font-bold text-[#E30019]">
                    14.990.000 ₫
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="w-full bg-[#040004] hover:bg-[#E30019] text-white text-xs font-semibold py-2.5 rounded-[4px] transition-mechanical flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Thêm giỏ hàng</span>
              </button>
            </div>

            {/* Demo Product Card 2 */}
            <div className="bg-white rounded-[8px] border border-[#E0E0E0] p-4 flex flex-col justify-between space-y-3 relative group transition-mechanical hover:border-[#E30019]">
              <div className="w-full aspect-square bg-[#F4F5F7] rounded-[4px] flex items-center justify-center">
                <Cpu className="w-16 h-16 text-gray-400" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] text-gray-500 font-mono">NVIDIA GEFORCE</span>
                <h3 className="font-semibold text-sm text-[#040004] line-clamp-2">
                  VGA ASUS ROG Strix GeForce RTX 4080 SUPER 16GB GDDR6X
                </h3>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-base font-bold text-[#E30019]">
                    32.490.000 ₫
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="w-full bg-[#040004] hover:bg-[#E30019] text-white text-xs font-semibold py-2.5 rounded-[4px] transition-mechanical flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Thêm giỏ hàng</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
