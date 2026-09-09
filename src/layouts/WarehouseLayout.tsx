import { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { WarehouseHeader } from '@/components/warehouse/WarehouseHeader'
import { WarehouseSidebar } from '@/components/warehouse/WarehouseSidebar'

export function WarehouseLayout() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeSidebar = () => {
    setOpen(false)
    window.requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  return <div className="min-h-screen bg-surface-200 lg:flex">
    <WarehouseSidebar isOpen={open} onClose={closeSidebar} />
    <div className="min-w-0 flex-1">
      <WarehouseHeader menuButtonRef={menuButtonRef} onOpenMenu={() => setOpen(true)} />
      <main className="mx-auto w-full max-w-[1440px] p-4 md:p-6 lg:p-8"><Outlet /></main>
    </div>
  </div>
}
