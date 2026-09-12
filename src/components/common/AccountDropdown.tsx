import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, LogOut, Shield, Package } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface AccountDropdownProps {
  isOpen: boolean
  onClose: () => void
  onOpenSettings: () => void
  onOpenOrders?: () => void
}

export const AccountDropdown = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenOrders,
}: AccountDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleLogout = () => {
    onClose()
    logout()
    navigate('/')
  }

  const handleOrdersClick = () => {
    onClose()
    if (onOpenOrders) {
      onOpenOrders()
    } else {
      navigate('/account/settings?tab=orders')
    }
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-50 p-3 animate-in fade-in zoom-in-95 duration-100"
    >
      {/* Thông tin người dùng (Top) */}
      <div className="flex items-center gap-3 p-1">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border border-[#E30019] shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#E30019] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-xs text-[#040004] truncate">
            {user?.name || 'Nguyễn Văn Khách'}
          </span>
          <span className="text-[11px] text-[#636363] truncate">
            {user?.email || 'user@gmail.com'}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`text-white text-[10px] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-0.5 ${user?.role === 'STORE_MANAGER' ? 'bg-[#E30019]' : 'bg-blue-600'}`}>
              <Shield className="w-2.5 h-2.5" /> {user?.role === 'STORE_MANAGER' ? 'ADMIN' : 'STAFF'}
            </span>
            <span className="text-[11px] text-[#636363] font-medium">
              {user?.roleName || 'Khách hàng'}
            </span>
          </div>
        </div>
      </div>

      {/* Phân cách */}
      <div className="border-b border-[#E0E0E0] my-2" />

      {/* Mục 1: Đơn hàng của tôi */}
      <button
        type="button"
        onClick={handleOrdersClick}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-semibold text-[#040004] hover:bg-slate-100 transition-mechanical cursor-pointer text-left"
      >
        <Package className="w-4 h-4 text-slate-600 shrink-0" />
        <span>Đơn hàng của tôi</span>
      </button>

      {/* Mục 2: Cài đặt tài khoản */}
      <button
        type="button"
        onClick={() => {
          onClose()
          onOpenSettings()
        }}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-semibold text-[#040004] hover:bg-slate-100 transition-mechanical cursor-pointer text-left"
      >
        <Settings className="w-4 h-4 text-slate-600 shrink-0" />
        <span>Cài đặt tài khoản</span>
      </button>

      {/* Phân cách */}
      <div className="border-b border-[#E0E0E0] my-2" />

      {/* Mục 2: Đăng xuất */}
      <button
        type="button"
        onClick={handleLogout}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-semibold text-[#E30019] hover:bg-red-50 transition-mechanical cursor-pointer text-left"
      >
        <LogOut className="w-4 h-4 text-[#E30019] shrink-0" />
        <span>Đăng xuất</span>
      </button>
    </div>
  )
}

