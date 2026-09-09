import { ChevronDown, LogOut, UserRound } from 'lucide-react'

export function WarehouseUserMenu() {
  return <details className="group relative hidden sm:block">
    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 border-l border-surface-400 pl-3 focus-visible:outline-none focus-visible:shadow-focus">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">NB</span>
      <span><strong className="block text-xs">Nguyễn Bảo</strong><span className="text-[11px] text-text-600">Warehouse Staff</span></span>
      <ChevronDown className="h-4 w-4 text-text-600 transition-transform group-open:rotate-180" />
    </summary>
    <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-52 rounded-md border border-surface-400 bg-white p-1 shadow-clay-md">
      <button type="button" className="flex min-h-11 w-full items-center gap-2 rounded-sm px-3 text-sm hover:bg-surface-200 focus-visible:outline-none focus-visible:shadow-focus"><UserRound className="h-4 w-4" /> Hồ sơ</button>
      <button type="button" className="flex min-h-11 w-full items-center gap-2 rounded-sm px-3 text-sm text-error-700 hover:bg-error-50 focus-visible:outline-none focus-visible:shadow-focus"><LogOut className="h-4 w-4" /> Đăng xuất</button>
    </div>
  </details>
}
