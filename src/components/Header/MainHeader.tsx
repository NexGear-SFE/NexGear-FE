import { useState } from 'react'
import { Menu, Search, ShoppingCart, User } from 'lucide-react'

export const MainHeader = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white border-b border-[#E0E0E0] py-3 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 lg:gap-6">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 bg-[#E30019] rounded-[4px] flex items-center justify-center text-white font-bold text-xl tracking-tighter shadow-sm transition-mechanical group-hover:bg-[#B30014]">
            GG
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg text-[#040004] tracking-tight font-heading">
              GearGo
            </span>
            <span className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase">
              Gaming Store
            </span>
          </div>
        </a>

        {/* Category Button */}
        <button
          type="button"
          className="hidden sm:flex items-center gap-2 bg-[#040004] text-white px-3.5 py-2.5 rounded-[4px] font-medium text-sm transition-mechanical hover:bg-[#1f191f] cursor-pointer"
        >
          <Menu className="w-4 h-4 text-white" />
          <span>Danh mục</span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm laptop, PC, linh kiện gaming..."
              className="w-full bg-white border border-[#E0E0E0] rounded-[4px] pl-10 pr-10 py-2 text-sm text-[#040004] placeholder:text-gray-400 focus:outline-none focus:border-[#E30019] focus:ring-1 focus:ring-[#E30019]/20 transition-mechanical"
            />
            <kbd className="hidden md:inline-flex items-center absolute right-3 text-[11px] font-mono text-gray-500 bg-[#F4F5F7] border border-[#E0E0E0] rounded px-1.5 py-0.5 pointer-events-none">
              /
            </kbd>
          </div>
        </div>

        {/* Action Buttons: Cart & Login */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Cart Button */}
          <button
            type="button"
            className="flex items-center gap-2 border border-[#E0E0E0] text-[#E30019] px-3.5 py-2 rounded-[4px] text-sm font-semibold transition-mechanical hover:border-[#E30019] hover:bg-[#FEECEE]/30 relative cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-[#E30019]" />
              <span className="absolute -top-2.5 -right-2.5 bg-[#E30019] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                1
              </span>
            </div>
            <span className="hidden md:inline text-[#040004]">Giỏ hàng</span>
          </button>

          {/* Login Button */}
          <button
            type="button"
            className="flex items-center gap-2 border border-[#E0E0E0] text-[#040004] px-3.5 py-2 rounded-[4px] text-sm font-medium transition-mechanical hover:border-[#E30019] hover:text-[#E30019] cursor-pointer"
          >
            <User className="w-4 h-4 text-gray-700" />
            <span className="hidden md:inline">Đăng nhập</span>
          </button>
        </div>
      </div>
    </header>
  )
}
