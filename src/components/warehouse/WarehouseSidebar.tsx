import { useEffect, useRef } from 'react'
import { Boxes, ClipboardList, FolderTree, LayoutDashboard, LogOut, PackageOpen, ReceiptText, UserRound, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

type WarehouseSidebarProps = { isOpen: boolean; onClose: () => void }
const navigation = [
  { label: 'Tổng quan', to: ROUTES.warehouse, icon: LayoutDashboard, end: true },
  { label: 'Đơn hàng', to: ROUTES.warehouseOrders, icon: ClipboardList },
  { label: 'Phiếu nhập kho', to: ROUTES.warehouseReceipts, icon: ReceiptText },
  { label: 'Sản phẩm', to: ROUTES.warehouseProducts, icon: PackageOpen },
  { label: 'Danh mục', to: ROUTES.warehouseCategories, icon: FolderTree },
  { label: 'Tồn kho', to: ROUTES.warehouseInventory, icon: Boxes },
]

export function WarehouseSidebar({ isOpen, onClose }: WarehouseSidebarProps) {
  const navigate = useNavigate()
  const drawerRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()
    const drawer = drawerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !drawer) return
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  return <>
    {isOpen && <button type="button" aria-label="Đóng menu kho" className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}
    <aside ref={drawerRef} aria-label="Khu vực điều hướng kho" aria-modal={isOpen ? true : undefined} role={isOpen ? 'dialog' : undefined} className={cn('fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-warehouse-950 text-white transition-standard lg:sticky lg:top-0 lg:h-screen lg:translate-x-0', isOpen ? 'translate-x-0' : '-translate-x-full')}>
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <NavLink to={ROUTES.warehouse} className="flex items-center gap-3" onClick={onClose}>
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-brand-500 font-heading text-sm font-bold">GG</span>
          <span><strong className="block font-heading text-sm">GearGo</strong><span className="text-caption text-slate-400">Warehouse</span></span>
        </NavLink>
        <button ref={closeButtonRef} type="button" aria-label="Đóng thanh điều hướng" className="flex h-11 w-11 items-center justify-center rounded-sm text-slate-300 hover:bg-white/10 focus-visible:outline-none focus-visible:shadow-focus lg:hidden" onClick={onClose}><X className="h-5 w-5" /></button>
      </div>
      <nav aria-label="Điều hướng quản lý kho" className="flex-1 overflow-y-auto px-3 py-6">
        <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Quản lý kho</p>
        <ul className="space-y-1">{navigation.map(({ label, to, icon: Icon, end }) => <li key={to}>
          <NavLink to={to} end={end} onClick={onClose} className={({ isActive }) => cn('flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm font-medium transition-mechanical focus-visible:outline-none focus-visible:shadow-focus', isActive ? 'bg-brand-500 text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white')}><Icon className="h-[18px] w-[18px]" />{label}</NavLink>
        </li>)}</ul>
      </nav>
      <div className="border-t border-white/10 p-3">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Tài khoản</p>
        <div className="flex min-h-11 w-full items-center gap-3 rounded-sm px-3 text-sm text-slate-300"><UserRound className="h-[18px] w-[18px]" /> Warehouse Staff</div>
        <button type="button" onClick={() => { window.localStorage.removeItem('warehouseSession'); navigate(ROUTES.home) }} className="flex min-h-11 w-full items-center gap-3 rounded-sm px-3 text-sm text-slate-300 hover:bg-white/8 hover:text-white"><LogOut className="h-[18px] w-[18px]" /> Đăng xuất</button>
        <div className="mt-3 flex items-center gap-3 rounded-md bg-white/6 p-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold">NB</span><span><strong className="block text-xs">Nguyễn Bảo</strong><span className="text-[11px] text-slate-400">Warehouse Staff</span></span></div>
      </div>
    </aside>
  </>
}
