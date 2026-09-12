import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingCart, User as UserIcon, LogOut, Shield, ChevronDown, UserCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const MainHeader = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, isAuthenticated, openLoginModal, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="bg-white border-b border-[#E0E0E0] py-3 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 lg:gap-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
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
        </Link>

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

          {/* User Auth Section */}
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={openLoginModal}
              className="flex items-center gap-2 border border-[#E0E0E0] text-[#040004] px-3 py-1.5 rounded-[4px] text-sm font-semibold transition-mechanical hover:border-[#E30019] hover:text-[#E30019] cursor-pointer bg-white"
            >
              <div className="w-6 h-6 rounded-full bg-[#E30019] text-white flex items-center justify-center text-[10px] font-bold">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <span className="hidden md:inline">Đăng nhập</span>
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 border border-[#E0E0E0] bg-white text-[#040004] px-2.5 py-1.5 rounded-[4px] text-xs font-semibold transition-mechanical hover:border-[#E30019] cursor-pointer"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#E30019]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#E30019] text-white flex items-center justify-center text-[10px] font-bold">
                    {user?.name ? user.name.charAt(0) : 'U'}
                  </div>
                )}
                <div className="hidden md:flex flex-col items-start leading-none text-left">
                  <span className="font-bold text-xs truncate max-w-[120px]">{user?.name}</span>
                  <span className="text-[10px] text-[#E30019] font-medium">{user?.roleName}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {/* User Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E0E0E0] rounded-md shadow-xl z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-2 border-b border-[#E0E0E0]">
                    <div className="font-bold text-xs text-[#040004] truncate">{user?.name}</div>
                    <div className="text-[11px] text-gray-500 truncate">{user?.email}</div>
                    <div className="inline-flex items-center gap-1 bg-red-50 text-[#E30019] text-[10px] font-bold px-2 py-0.5 rounded mt-1.5">
                      <Shield className="w-3 h-3" />
                      <span>{user?.roleName}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false)
                        navigate(user?.redirectPath || '/')
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded text-xs font-medium text-[#040004] hover:bg-gray-100 transition-mechanical cursor-pointer text-left"
                    >
                      <UserCheck className="w-4 h-4 text-gray-600" />
                      <span>{user?.role === 'USER' ? 'Trang thông tin cá nhân' : 'Màn hình Quản Trị'}</span>
                    </button>
                  </div>

                  <div className="border-t border-[#E0E0E0] pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false)
                        logout()
                        navigate('/')
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded text-xs font-bold text-[#E30019] hover:bg-red-50 transition-mechanical cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-[#E30019]" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
