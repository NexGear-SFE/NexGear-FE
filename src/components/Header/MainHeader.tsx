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
              Tech Store
            </span>
          </div>
        </a>

        {/* Categories Menu Trigger Button */}
        <button
          type="button"
          className="hidden sm:flex items-center gap-2 bg-[#040004] text-white px-3 py-2 rounded-[4px] text-sm font-semibold transition-mechanical hover:bg-[#1a171a] cursor-pointer"
        >
          <Menu className="w-4 h-4 text-[#E30019]" />
          <span>Danh mục</span>
        </button>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Tìm kiếm linh kiện, PC, Laptop, Gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-gaming w-full pl-3 pr-10 py-2 text-sm focus:outline-none"
          />
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#E30019] text-white rounded-[2px] hover:bg-[#B30014] transition-mechanical cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Drawer Trigger */}
          <button
            type="button"
            className="flex items-center gap-2 border border-[#E0E0E0] text-[#040004] px-3 py-2 rounded-[4px] text-sm font-semibold transition-mechanical hover:border-[#E30019] hover:text-[#E30019] cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-[#E30019]" />
              <span className="absolute -top-2.5 -right-2.5 bg-[#E30019] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                1
              </span>
            </div>
            <span className="hidden md:inline">Giỏ hàng</span>
          </button>

          {/* User Avatar Button */}
          <button
            type="button"
            className="flex items-center gap-2 border border-[#E0E0E0] text-[#040004] px-2.5 py-1.5 rounded-[4px] text-sm font-medium transition-mechanical hover:border-[#E30019] hover:text-[#E30019] cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-[#E30019] text-white flex items-center justify-center text-[10px] font-bold">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="hidden md:inline">Tài khoản</span>
          </button>
        </div>
      </div>
    </header>
  )
}
