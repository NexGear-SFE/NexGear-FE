import { type FormEvent, type RefObject, useState } from 'react'
import { Bell, Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { WarehouseUserMenu } from '@/components/warehouse/WarehouseUserMenu'
import { ROUTES } from '@/constants/routes'

type WarehouseHeaderProps = {
  menuButtonRef: RefObject<HTMLButtonElement | null>
  onOpenMenu: () => void
}

export function WarehouseHeader({ menuButtonRef, onOpenMenu }: WarehouseHeaderProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const value = query.trim()
    if (!value) return
    const target = value.toUpperCase().startsWith('PN-') ? ROUTES.warehouseReceipts : value.startsWith('#') ? ROUTES.warehouseOrders : ROUTES.warehouseProducts
    navigate(`${target}?q=${encodeURIComponent(value)}`)
  }
  return <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-surface-400 bg-white px-4 md:px-6">
    <button ref={menuButtonRef} type="button" aria-label="Mở menu kho" aria-haspopup="dialog" className="flex h-11 w-11 items-center justify-center rounded-sm border border-surface-400 focus-visible:outline-none focus-visible:shadow-focus lg:hidden" onClick={onOpenMenu}><Menu className="h-5 w-5" /></button>
    <form className="relative hidden w-full max-w-sm md:block" role="search" onSubmit={submitSearch}><label><span className="sr-only">Tìm nhanh trong kho</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-600" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="input-gaming w-full pl-10" placeholder="Mã đơn, mã phiếu, SKU hoặc sản phẩm…" /></label></form>
    <div className="ml-auto flex items-center gap-2"><button type="button" aria-label="Thông báo kho" className="relative flex h-11 w-11 items-center justify-center rounded-sm border border-surface-400 bg-white hover:border-brand-500 focus-visible:outline-none focus-visible:shadow-focus"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500" /></button><WarehouseUserMenu /></div>
  </header>
}
