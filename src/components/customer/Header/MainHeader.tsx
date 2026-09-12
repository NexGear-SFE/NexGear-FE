import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingCart, User, X, ChevronRight } from 'lucide-react'
import logoImg from '@/assets/images/Avatar.jpg'
import { useCartCount, cartStore } from '@/stores/cartStore'
import { useAuth } from '@/hooks/useAuth'
import { AccountDropdown } from '@/components/common/AccountDropdown'
import { CATEGORIES_DATA, type CategoryItem } from '@/mocks/customer/category.mock'

export const MainHeader = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCategoryActive, setIsCategoryActive] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<CategoryItem>(CATEGORIES_DATA[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const cartCount = useCartCount()
  const { isAuthenticated, user, openLoginModal } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleToggle = () => setIsCategoryActive((prev) => !prev)
    const handleClose = () => setIsCategoryActive(false)

    window.addEventListener('toggle-category-overlay', handleToggle)
    window.addEventListener('close-category-overlay', handleClose)
    return () => {
      window.removeEventListener('toggle-category-overlay', handleToggle)
      window.removeEventListener('close-category-overlay', handleClose)
    }
  }, [])

  const handleCategoryClick = () => {
    setIsCategoryActive((prev) => !prev)
    window.dispatchEvent(new CustomEvent('toggle-category-overlay'))
  }

  const handleSelectCategory = (catId: string) => {
    setIsCategoryActive(false)
    window.dispatchEvent(new CustomEvent('close-category-overlay'))

    let targetSectionId = 'pc-banchay'
    if (catId === 'laptop' || catId === 'laptop-gaming') {
      targetSectionId = 'laptop-banchay'
    } else if (['audio-gear', 'screen', 'gear', 'monitor', 'main-cpu-vga', 'storage', 'stream'].includes(catId)) {
      targetSectionId = 'gear-banchay'
    }

    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const targetEl = document.getElementById(targetSectionId)
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const targetEl = document.getElementById(targetSectionId)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 text-[#040004] py-3 relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <a href="/" className="flex items-center group shrink-0">
          <img
            src={logoImg}
            alt="NexGear Logo"
            className="h-11 sm:h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </a>

        {/* Center: Category Trigger Button + Search Bar */}
        <div className="flex-1 max-w-3xl mx-2 flex items-center gap-2.5">
          {/* Category Trigger Button */}
          <button
            type="button"
            onClick={handleCategoryClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-bold transition-all shadow-sm cursor-pointer shrink-0 ${
              isCategoryActive
                ? 'bg-[#E30019] text-white ring-2 ring-red-400/50 z-50'
                : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            {isCategoryActive ? (
              <X className="w-4 h-4 animate-in spin-in-90 duration-200" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
            <span>Danh mục</span>
          </button>

          {/* Search Input Bar */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex-1 flex items-center"
          >
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm laptop, PC, linh kiện gaming..."
              className="w-full bg-white border border-gray-200 rounded-[8px] py-2.5 pl-10 pr-9 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E30019] focus:ring-1 focus:ring-[#E30019] transition-all"
            />
            <kbd className="absolute right-3 px-1.5 py-0.5 text-xs text-gray-400 bg-gray-100 rounded border border-gray-200 font-mono">
              /
            </kbd>
          </form>
        </div>

        {/* Right: Actions (Cart & Account) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={() => cartStore.toggleDrawer(true)}
            className="flex items-center gap-2.5 border border-gray-200 hover:border-[#E30019] bg-white text-[#E30019] px-5 py-2.5 rounded-[8px] text-sm font-bold transition-all shadow-sm group cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-[#E30019] text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Giỏ hàng</span>
          </button>

          {/* User Account */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 border border-gray-200 hover:border-[#E30019] bg-white text-gray-800 px-4 py-2.5 rounded-[8px] text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-[#E30019]" />
                )}
                <span className="truncate max-w-[120px]">{user?.name || 'Tài khoản'}</span>
              </button>
              <AccountDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                onOpenSettings={() => {
                  if (user?.role === 'STORE_MANAGER') navigate('/storemanager/settings')
                  else if (user?.role === 'TECH_STAFF') navigate('/tech-staff/settings')
                  else navigate('/account/settings')
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={openLoginModal}
              className="flex items-center gap-2 border border-gray-200 hover:border-gray-400 bg-white text-gray-800 px-5 py-2.5 rounded-[8px] text-sm font-bold transition-all shadow-sm cursor-pointer"
            >
              <User className="w-4 h-4 text-gray-600" />
              <span>Đăng nhập</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Mega Menu Overlay Dropdown */}
      {isCategoryActive && (
        <>
          {/* Translucent Backdrop Overlay */}
          <div
            className="fixed inset-0 top-[110px] bg-black/50 z-40 transition-opacity duration-200"
            onClick={() => {
              setIsCategoryActive(false)
              window.dispatchEvent(new CustomEvent('close-category-overlay'))
            }}
          />

          {/* Mega Menu Dropdown Panel */}
          <div className="absolute top-full left-0 right-0 z-50 bg-white border-t border-b border-gray-200 shadow-2xl animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6 min-h-[360px]">
              {/* Left Column: Categories List */}
              <div className="col-span-12 lg:col-span-4 border-r border-gray-100 pr-4 space-y-1">
                <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Tất cả danh mục sản phẩm
                </div>
                {CATEGORIES_DATA.map((cat) => {
                  const Icon = cat.icon
                  const isHovered = hoveredCategory.id === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[6px] text-left transition-all cursor-pointer ${
                        isHovered
                          ? 'bg-red-50 text-[#E30019] font-bold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-black font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isHovered ? 'text-[#E30019]' : 'text-gray-500'}`} />
                        <span className="text-xs sm:text-sm truncate">{cat.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isHovered ? 'text-[#E30019]' : 'text-gray-300'}`} />
                    </button>
                  )
                })}
              </div>

              {/* Right Column: Active Category Subgroups */}
              <div className="col-span-12 lg:col-span-8 pl-2 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-base font-bold text-[#040004] font-heading flex items-center gap-2">
                    <span>{hoveredCategory.name}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(hoveredCategory.id)}
                    className="text-xs font-bold text-[#E30019] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem tất cả sản phẩm</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {hoveredCategory.subgroups?.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2.5">
                      <h4 className="font-bold text-xs text-slate-900 border-b border-gray-100 pb-1.5 font-heading">
                        {group.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.items.map((item, iIdx) => (
                          <li key={iIdx}>
                            <button
                              type="button"
                              onClick={() => handleSelectCategory(hoveredCategory.id)}
                              className="text-xs text-gray-600 hover:text-[#E30019] transition-colors cursor-pointer text-left block w-full hover:translate-x-0.5"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

