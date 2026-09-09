import type { RefObject } from 'react'
import { Bell, Menu, Search } from 'lucide-react'
import { WarehouseUserMenu } from '@/components/warehouse/WarehouseUserMenu'

type WarehouseHeaderProps = {
  menuButtonRef: RefObject<HTMLButtonElement | null>
  onOpenMenu: () => void
}

export function WarehouseHeader({ menuButtonRef, onOpenMenu }: WarehouseHeaderProps) {
  return <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-surface-400 bg-white px-4 md:px-6">
    <button ref={menuButtonRef} type="button" aria-label="Mở menu kho" aria-haspopup="dialog" className="flex h-11 w-11 items-center justify-center rounded-sm border border-surface-400 focus-visible:outline-none focus-visible:shadow-focus lg:hidden" onClick={onOpenMenu}><Menu className="h-5 w-5" /></button>
    <label className="relative hidden w-full max-w-sm md:block"><span className="sr-only">Tìm trong khu vực kho</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-600" /><input className="input-gaming w-full pl-10" placeholder="Tìm đơn hàng, SKU, sản phẩm…" /></label>
    <div className="ml-auto flex items-center gap-2"><button type="button" aria-label="Thông báo kho" className="relative flex h-11 w-11 items-center justify-center rounded-sm border border-surface-400 bg-white hover:border-brand-500 focus-visible:outline-none focus-visible:shadow-focus"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500" /></button><WarehouseUserMenu /></div>
  </header>
}
