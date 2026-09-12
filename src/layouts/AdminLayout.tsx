import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Layers,
  Package,
  MessageSquare,
  Newspaper,
  Store,
  ChevronRight,
  Bell,
  ChevronDown,
  HelpCircle,
} from 'lucide-react'
import { AccountDropdown } from '@/components/common/AccountDropdown'
import { SidebarUserWidget } from '@/components/common/SidebarUserWidget'
import { QuickLoginModal } from '@/components/auth/QuickLoginModal'
import type { BlogPost } from '@/types/blog.type'

export type ViewMode = 'list' | 'create' | 'edit' | 'settings'

export interface AdminLayoutContext {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  editingPost: BlogPost | null
  setEditingPost: (post: BlogPost | null) => void
}

export const AdminLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const isSettingsPage = location.pathname.startsWith('/storemanager/settings')

  const handleOpenSettings = () => {
    navigate('/storemanager/settings')
  }

  const handleNavigateToBlogs = () => {
    setViewMode('list')
    setEditingPost(null)
  }

  const navItems = [
    { label: 'Trang chủ & Banner', path: '/storemanager/dashboard', icon: LayoutDashboard },
    { label: 'Danh mục & Hãng', path: '/storemanager/categories', icon: Layers },
    { label: 'Quản lý Sản phẩm', path: '/storemanager/products', icon: Package },
    { label: 'Liên hệ & Chat Widget', path: '/storemanager/contact', icon: MessageSquare },
    {
      label: 'Tin tức & Blog',
      path: '/storemanager/blogs',
      icon: Newspaper,
      isActive: true,
      onClick: handleNavigateToBlogs,
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#F4F5F7]">
      {/* 5.1 Sidebar (Bên trái) */}
      <aside className="w-64 bg-white border-r border-[#E0E0E0] flex flex-col justify-between shrink-0 sticky top-0 h-screen z-30 shadow-xs">
        <div>
          {/* Header Sidebar */}
          <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#E30019] text-white rounded font-bold text-sm flex items-center justify-center shadow-xs">
                SM
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#040004] leading-tight">
                  Store Manager
                </span>
                <span className="text-[11px] text-[#636363]">Bảng quản trị</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-3">
            <div className="text-[11px] text-[#636363] font-semibold tracking-wider px-3 mb-2 uppercase">
              ĐIỀU HƯỚNG
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active =
                  !isSettingsPage &&
                  (item.isActive || location.pathname.startsWith(item.path))

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={item.onClick}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-mechanical ${
                      active
                        ? 'bg-[#FEECEE] text-[#E30019] font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        active ? 'text-[#E30019]' : 'text-slate-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        <SidebarUserWidget settingsPath="/storemanager/settings" />
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* 5.2 Topbar & Breadcrumb */}
        <header className="h-16 bg-white border-b border-[#E0E0E0] px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          {/* Bên trái: Dynamic Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-md text-xs font-medium text-slate-600">
              <Store className="w-3.5 h-3.5 text-slate-500" />
              <span>storemanager</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />

              {isSettingsPage ? (
                <span className="text-[#040004] font-semibold">
                  Cài đặt tài khoản
                </span>
              ) : (
                <>
                  <Link
                    to="/storemanager/blogs"
                    onClick={handleNavigateToBlogs}
                    className="text-[#040004] font-semibold hover:underline"
                  >
                    blogs
                  </Link>
                  {viewMode === 'create' && (
                    <>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                      <span className="text-[#E30019] font-semibold">
                        Tạo bài viết
                      </span>
                    </>
                  )}
                  {viewMode === 'edit' && (
                    <>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                      <span className="text-[#E30019] font-semibold">
                        Chỉnh sửa bài viết
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Bên phải: Notification Bell & User Profile Dropdown */}
          <div className="flex items-center gap-3 relative">
            {/* Notification Bell */}
            <button
              type="button"
              aria-label="Thông báo"
              className="w-9 h-9 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center relative hover:bg-slate-50 transition-mechanical cursor-pointer shadow-xs text-slate-600"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E30019] rounded-full border border-white" />
            </button>

            {/* Profile Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 bg-white border border-[#E0E0E0] rounded-md px-3 py-1.5 shadow-xs hover:border-slate-300 transition-mechanical cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#E30019] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  SM
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#040004]">
                      Store Manager
                    </span>
                    <span className="bg-[#FEECEE] text-[#E30019] border border-red-200 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      Admin
                    </span>
                  </div>
                  <span className="text-[11px] text-[#636363]">
                    storemanager@gmail.com
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
              </button>

              {/* Account Dropdown Menu */}
              <AccountDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                onOpenSettings={handleOpenSettings}
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet
            context={{
              viewMode,
              setViewMode,
              editingPost,
              setEditingPost,
            }}
          />
        </main>
      </div>

      <QuickLoginModal />

      {/* 5.6 Floating Help Button */}
      <button
        type="button"
        aria-label="Trợ giúp"
        title="Trợ giúp & Hướng dẫn"
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full border border-[#E0E0E0] bg-white shadow-md flex items-center justify-center text-[#636363] hover:text-[#040004] hover:bg-slate-50 transition-mechanical cursor-pointer"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
    </div>
  )
}


