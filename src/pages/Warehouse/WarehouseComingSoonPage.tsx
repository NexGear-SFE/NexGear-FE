import { Construction } from 'lucide-react'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'

type WarehouseComingSoonPageProps = { description: string; title: string }

export function WarehouseComingSoonPage({ description, title }: WarehouseComingSoonPageProps) {
  return <div className="space-y-6"><WarehousePageHeader eyebrow="Warehouse" title={title} description={description} /><div className="flex min-h-80 flex-col items-center justify-center rounded-md border border-dashed border-surface-400 bg-white p-8 text-center"><span className="flex h-12 w-12 items-center justify-center rounded-sm bg-error-50 text-brand-500"><Construction className="h-6 w-6" /></span><h2 className="mt-4 font-heading text-lg font-semibold">Đang triển khai theo checklist</h2><p className="mt-2 max-w-md text-sm text-text-600">Route đã sẵn sàng trong warehouse shell và sẽ được thay bằng module nghiệp vụ ở commit kế tiếp.</p></div></div>
}
