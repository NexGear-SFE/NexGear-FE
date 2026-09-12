import { type RefObject, useState } from 'react'
import { Bell, Menu } from 'lucide-react'
import { WarehouseUserMenu } from '@/components/warehouse/WarehouseUserMenu'

type WarehouseHeaderProps = {
  menuButtonRef: RefObject<HTMLButtonElement | null>
  onOpenMenu: () => void
}

export function WarehouseHeader({ menuButtonRef, onOpenMenu }: WarehouseHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  return <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-surface-400 bg-white px-4 md:px-6">
    <button ref={menuButtonRef} type="button" aria-label="Mở menu kho" aria-haspopup="dialog" className="flex h-11 w-11 items-center justify-center rounded-sm border border-surface-400 focus-visible:outline-none focus-visible:shadow-focus lg:hidden" onClick={onOpenMenu}><Menu className="h-5 w-5" /></button>
    <div className="hidden md:block"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-600">Vận hành kho</p><p className="text-sm font-semibold">Kho trung tâm TP.HCM</p></div>
    <div className="relative ml-auto flex items-center gap-2"><button type="button" aria-label="Thông báo kho" aria-expanded={showNotifications} onClick={() => setShowNotifications((current) => !current)} className="relative flex h-11 w-11 items-center justify-center rounded-sm border border-surface-400 bg-white hover:border-brand-500 focus-visible:outline-none focus-visible:shadow-focus"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500" /></button>{showNotifications && <div role="status" className="absolute right-14 top-12 z-30 w-64 rounded-md border border-surface-400 bg-white p-4 text-sm shadow-clay-md"><strong>Thông báo vận hành</strong><p className="mt-1 text-text-600">Có đơn hàng và SKU cần xử lý trên Dashboard.</p></div>}<WarehouseUserMenu /></div>
  </header>
}
