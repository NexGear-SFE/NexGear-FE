import type { ReactNode } from 'react'
import { Eye, Pencil, ExternalLink, Ban, CheckCircle } from 'lucide-react'
import type { WarrantyProvider } from '@/types/admin/staff.type'

interface WarrantyProviderRowProps {
  provider: WarrantyProvider
  isLast: boolean
  onView: () => void
  onEdit: () => void
  onDisable: () => void
  onEnable: () => void
}

export function WarrantyProviderRow({
  provider: p,
  isLast,
  onView,
  onEdit,
  onDisable,
  onEnable,
}: WarrantyProviderRowProps) {
  const iconBtn = (
    title: string,
    icon: ReactNode,
    onClick: () => void,
    hoverClass: string
  ) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-[30px] h-[30px] border border-[var(--surface-400)] rounded-md bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-600)] transition-colors duration-100 ${hoverClass} hover:text-[var(--text-900)]`}
    >
      {icon}
    </button>
  )

  return (
    <div
      className={`grid grid-cols-[40px_1fr_1fr_100px_130px] gap-0 px-4 py-[13px] items-center transition-colors duration-100 hover:bg-black/5 ${
        !isLast ? 'border-b border-[var(--surface-400)]' : ''
      } ${p.active ? 'opacity-100' : 'opacity-[0.65]'}`}
    >
      {/* Brand mark */}
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center border"
        style={{ backgroundColor: p.bg, borderColor: `${p.color}33` }}
      >
        <span
          className="text-[9px] font-black font-heading leading-none"
          style={{ color: p.color }}
        >
          {p.name.slice(0, 4)}
        </span>
      </div>

      {/* Name + description */}
      <div>
        <div className="text-[var(--text-900)] text-[13px] font-bold font-heading">
          {p.name}
        </div>
        <div className="text-[var(--text-600)] text-[11px] font-body mt-[1px]">
          {p.pageName}
        </div>
      </div>

      {/* URL */}
      <div className="text-[var(--text-400)] text-[11px] font-mono overflow-hidden text-ellipsis whitespace-nowrap pr-3">
        {p.url}
      </div>

      {/* Status */}
      <div>
        <div
          className={`inline-flex items-center gap-[5px] px-2 py-[3px] rounded-full border ${
            p.active
              ? 'bg-green-50 border-green-200/50'
              : 'bg-red-50 border-red-500'
          }`}
        >
          <div
            className={`w-[5px] h-[5px] rounded-full ${
              p.active ? 'bg-green-500' : 'bg-red-600'
            }`}
          />
          <span
            className={`text-[10px] font-semibold font-body ${
              p.active ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {p.active ? 'Hoạt động' : 'Vô hiệu'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1">
        {iconBtn(
          'Xem chi tiết',
          <Eye size={14} />,
          onView,
          'hover:bg-blue-50 hover:border-blue-200'
        )}
        {iconBtn(
          'Chỉnh sửa',
          <Pencil size={13} />,
          onEdit,
          'hover:bg-[var(--surface-400)]'
        )}
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Mở website"
          className="w-[30px] h-[30px] border border-[var(--surface-400)] rounded-md bg-transparent flex items-center justify-center text-[var(--text-600)] no-underline transition-colors duration-100 hover:bg-[var(--surface-400)] hover:text-[var(--text-900)]"
        >
          <ExternalLink size={13} />
        </a>
        {p.active
          ? iconBtn(
              'Vô hiệu hóa',
              <Ban size={13} />,
              onDisable,
              'hover:bg-orange-50 hover:border-orange-200 hover:text-orange-500'
            )
          : iconBtn(
              'Kích hoạt',
              <CheckCircle size={13} />,
              onEnable,
              'hover:bg-green-50 hover:border-green-200 hover:text-green-500'
            )}
      </div>
    </div>
  )
}
