import { useEffect, useRef } from 'react'
import { Settings, LogOut, Shield } from 'lucide-react'

interface AccountDropdownProps {
  isOpen: boolean
  onClose: () => void
  onOpenSettings: () => void
}

export const AccountDropdown = ({
  isOpen,
  onClose,
  onOpenSettings,
}: AccountDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-50 p-3 animate-in fade-in zoom-in-95 duration-100"
    >
      {/* Thông tin người dùng (Top) */}
      <div className="flex items-center gap-3 p-1">
        <div className="w-10 h-10 rounded-full bg-[#E30019] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
          SM
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-xs text-[#040004] truncate">
            Store Manager
          </span>
          <span className="text-[11px] text-[#636363] truncate">
            storemanager@gmail.com
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="bg-[#E30019] text-white text-[10px] font-bold px-1.5 py-0.2 rounded inline-flex items-center gap-0.5">
              <Shield className="w-2.5 h-2.5" /> ADMIN
            </span>
            <span className="text-[11px] text-[#636363] font-medium">
              Super Admin
            </span>
          </div>
        </div>
      </div>

      {/* Phân cách */}
      <div className="border-b border-[#E0E0E0] my-2" />

      {/* Mục 1: Cài đặt tài khoản */}
      <button
        type="button"
        onClick={() => {
          onClose()
          onOpenSettings()
        }}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium text-[#040004] hover:bg-slate-100 transition-mechanical cursor-pointer text-left"
      >
        <Settings className="w-4 h-4 text-slate-600 shrink-0" />
        <span>Cài đặt tài khoản</span>
      </button>

      {/* Phân cách */}
      <div className="border-b border-[#E0E0E0] my-2" />

      {/* Mục 2: Đăng xuất */}
      <button
        type="button"
        onClick={() => {
          onClose()
          alert('Đã đăng xuất tài khoản Store Manager!')
        }}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-semibold text-[#E30019] hover:bg-red-50 transition-mechanical cursor-pointer text-left"
      >
        <LogOut className="w-4 h-4 text-[#E30019] shrink-0" />
        <span>Đăng xuất</span>
      </button>
    </div>
  )
}
