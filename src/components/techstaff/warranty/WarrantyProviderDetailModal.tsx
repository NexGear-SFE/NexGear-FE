import { X, ExternalLink } from 'lucide-react'
import type { WarrantyProvider } from '@/types/admin/staff.type'

interface WarrantyProviderDetailModalProps {
  provider: WarrantyProvider | null
  onClose: () => void
  onOpenEdit: (provider: WarrantyProvider) => void
  onDisable: (provider: WarrantyProvider) => void
  onEnable: (id: string) => void
}

export function WarrantyProviderDetailModal({
  provider,
  onClose,
  onOpenEdit,
  onDisable,
  onEnable,
}: WarrantyProviderDetailModalProps) {
  if (!provider) return null

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-5">
        <div className="bg-white border border-[var(--surface-400)] rounded-2xl p-7 w-full max-w-[460px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-[52px] h-[52px] rounded-xl flex items-center justify-center border-[1.5px]"
              style={{ backgroundColor: provider.bg, borderColor: `${provider.color}33` }}
            >
              <span
                className="text-[13px] font-black font-heading"
                style={{ color: provider.color }}
              >
                {provider.name}
              </span>
            </div>
            <div>
              <h3 className="m-0 text-[18px] font-bold text-[var(--text-900)] font-heading">
                {provider.name}
              </h3>
              <div className="text-[12px] text-[var(--text-600)] font-body mt-0.5">
                {provider.pageName}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto w-8 h-8 border-none bg-[var(--surface-400)] rounded-md cursor-pointer text-[var(--text-600)] flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-3.5">
            {[
              {
                label: 'Trạng thái',
                value: (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full inline-block ${
                        provider.active ? 'bg-green-500' : 'bg-red-600'
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        provider.active ? 'text-green-500' : 'text-red-600'
                      }`}
                    >
                      {provider.active ? 'Đang hoạt động' : 'Vô hiệu'}
                    </span>
                  </span>
                ),
              },
              {
                label: 'URL tra cứu',
                value: (
                  <span className="font-mono text-[11px] text-[var(--text-600)] break-all">
                    {provider.url}
                  </span>
                ),
              },
              {
                label: 'Mô tả',
                value:
                  'Trang tra cứu bảo hành chính hãng — kỹ thuật viên nhập Serial Number trực tiếp trên website.',
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[11px] font-semibold text-[var(--text-400)] uppercase tracking-[0.05em] font-body mb-1">
                  {label}
                </div>
                <div className="text-[13px] text-[var(--text-900)] font-body">
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-6 pt-5 border-t border-black/5">
            <button
              type="button"
              className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
              onClick={() => {
                onClose()
                onOpenEdit(provider)
              }}
            >
              Chỉnh sửa
            </button>
            <a
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body flex items-center gap-1.5 no-underline hover:bg-[var(--surface-400)] transition-colors"
            >
              Mở website <ExternalLink size={14} />
            </a>
            {provider.active ? (
              <button
                type="button"
                className="ml-auto h-10 px-5 bg-white text-orange-500 border border-orange-200 rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-orange-50 transition-colors"
                onClick={() => {
                  onClose()
                  onDisable(provider)
                }}
              >
                Vô hiệu hóa
              </button>
            ) : (
              <button
                type="button"
                className="ml-auto h-10 px-5 bg-white text-green-500 border border-green-200 rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-green-50 transition-colors"
                onClick={() => {
                  onEnable(provider.id)
                  onClose()
                }}
              >
                Kích hoạt lại
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
