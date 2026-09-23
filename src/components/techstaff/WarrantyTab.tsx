import { useState } from 'react'
import type { WarrantyProvider } from '@/types/admin/staff.type'
import { Info, Plus, Check } from 'lucide-react'
import {
  WarrantyFilterBar,
  type WarrantyStatusFilter,
} from './warranty/WarrantyFilterBar'
import { WarrantyProviderTable } from './warranty/WarrantyProviderTable'
import { WarrantyProviderDetailModal } from './warranty/WarrantyProviderDetailModal'
import { WarrantyProviderFormModal } from './warranty/WarrantyProviderFormModal'
import { DisableProviderConfirmModal } from './warranty/DisableProviderConfirmModal'

export type ProviderModal =
  | { type: 'add' }
  | { type: 'edit'; provider: WarrantyProvider }
  | { type: 'disable'; provider: WarrantyProvider }
  | null

export function WarrantyTab({
  providers,
  setProviders,
}: {
  providers: WarrantyProvider[]
  setProviders: React.Dispatch<React.SetStateAction<WarrantyProvider[]>>
}) {
  const [modal, setModal] = useState<ProviderModal>(null)
  const [formName, setFormName] = useState('')
  const [formUrl, setFormUrl] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [warrantySuccess, setWarrantySuccess] = useState('')
  const [urlError, setUrlError] = useState(false)
  const [providerSearch, setProviderSearch] = useState('')
  const [providerStatusFilter, setProviderStatusFilter] = useState<WarrantyStatusFilter>('all')
  const [viewingProvider, setViewingProvider] = useState<WarrantyProvider | null>(null)

  function isValidUrl(s: string) {
    try {
      new URL(s)
      return true
    } catch {
      return false
    }
  }

  function openAdd() {
    setFormName('')
    setFormUrl('')
    setFormActive(true)
    setUrlError(false)
    setModal({ type: 'add' })
  }

  function openEdit(p: WarrantyProvider) {
    setFormName(p.name)
    setFormUrl(p.url)
    setFormActive(p.active)
    setUrlError(false)
    setModal({ type: 'edit', provider: p })
  }

  function saveAdd() {
    if (!formName.trim() || !formUrl.trim()) return
    if (!isValidUrl(formUrl.trim())) {
      setUrlError(true)
      return
    }
    const colors = ['#1E88E5', '#34D399', '#F472B6', '#A78BFA', '#FBBF24', '#FB923C']
    const c = colors[providers.length % colors.length]
    const newP: WarrantyProvider = {
      id: Date.now().toString(),
      name: formName.trim(),
      pageName: 'Warranty Lookup',
      url: formUrl.trim(),
      active: formActive,
      color: c,
      bg: c + '15',
    }
    setProviders((prev) => [...prev, newP])
    setModal(null)
    setWarrantySuccess('✓ Đã thêm nhà cung cấp thành công')
    setTimeout(() => setWarrantySuccess(''), 3000)
  }

  function saveEdit() {
    if (modal?.type !== 'edit') return
    if (!formName.trim() || !formUrl.trim()) return
    if (!isValidUrl(formUrl.trim())) {
      setUrlError(true)
      return
    }
    setProviders((prev) =>
      prev.map((p) =>
        p.id === modal.provider.id
          ? {
              ...p,
              name: formName.trim(),
              url: formUrl.trim(),
              active: formActive,
            }
          : p
      )
    )
    setModal(null)
    setWarrantySuccess('✓ Đã cập nhật nhà cung cấp thành công')
    setTimeout(() => setWarrantySuccess(''), 3000)
  }

  function confirmDisable() {
    if (modal?.type !== 'disable') return
    setProviders((prev) =>
      prev.map((p) => (p.id === modal.provider.id ? { ...p, active: false } : p))
    )
    setModal(null)
    setWarrantySuccess('✓ Đã vô hiệu hóa nhà cung cấp')
    setTimeout(() => setWarrantySuccess(''), 3000)
  }

  function enableProvider(id: string) {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: true } : p))
    )
    setWarrantySuccess('Đã kích hoạt lại nhà cung cấp')
    setTimeout(() => setWarrantySuccess(''), 3000)
  }

  const filtered = providers.filter((p) => {
    const matchSearch =
      !providerSearch.trim() ||
      p.name.toLowerCase().includes(providerSearch.toLowerCase())
    const matchStatus =
      providerStatusFilter === 'all' ||
      (providerStatusFilter === 'active' ? p.active : !p.active)
    return matchSearch && matchStatus
  })

  return (
    <div className="max-w-[780px]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold tracking-[0.1em] text-[var(--text-400)] uppercase font-body mb-1">
            Cấu hình hệ thống
          </div>
          <h2 className="m-0 text-[20px] font-bold text-[var(--text-900)] font-heading tracking-[-0.02em]">
            Bảo hành & Cấu hình hệ thống
          </h2>
          <p className="m-0 mt-1 text-[13px] text-[var(--text-600)] font-body">
            Quản lý các trang web tra cứu bảo hành chính hãng được sử dụng trong tính năng Kiểm tra Serial.
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body flex items-center gap-[7px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors"
          onClick={openAdd}
        >
          <Plus size={16} /> Thêm nhà cung cấp
        </button>
      </div>

      {/* Info note */}
      <div className="flex gap-3 px-4 py-3 bg-blue-50 border border-blue-200/50 rounded-lg mb-5">
        <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
        <div className="text-[12px] text-[var(--text-600)] font-body leading-[1.6]">
          GearGo không tích hợp trực tiếp với API của nhà sản xuất. Kỹ thuật viên tra cứu bảo hành thủ công trên website chính hãng bằng cách nhập Serial Number.
        </div>
      </div>

      {warrantySuccess && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-green-50 border border-green-200/50 rounded-lg mb-5">
          <Check className="text-green-500" size={16} />
          <span className="text-green-500 text-[13px] font-body font-semibold">
            {warrantySuccess}
          </span>
        </div>
      )}

      {/* Search + filter bar */}
      {providers.length > 0 && (
        <WarrantyFilterBar
          search={providerSearch}
          statusFilter={providerStatusFilter}
          onSearchChange={setProviderSearch}
          onStatusFilterChange={setProviderStatusFilter}
        />
      )}

      {/* Provider Table */}
      <WarrantyProviderTable
        totalProvidersCount={providers.length}
        filteredProviders={filtered}
        onOpenAdd={openAdd}
        onView={setViewingProvider}
        onEdit={openEdit}
        onDisable={(p) => setModal({ type: 'disable', provider: p })}
        onEnable={enableProvider}
      />

      {/* Modals */}
      <WarrantyProviderDetailModal
        provider={viewingProvider}
        onClose={() => setViewingProvider(null)}
        onOpenEdit={openEdit}
        onDisable={(p) => setModal({ type: 'disable', provider: p })}
        onEnable={enableProvider}
      />

      <WarrantyProviderFormModal
        isOpen={modal?.type === 'add' || modal?.type === 'edit'}
        mode={modal?.type === 'edit' ? 'edit' : 'add'}
        providerNameForEdit={modal?.type === 'edit' ? modal.provider.name : undefined}
        formName={formName}
        formUrl={formUrl}
        formActive={formActive}
        urlError={urlError}
        isValidUrl={isValidUrl}
        onChangeName={setFormName}
        onChangeUrl={(val) => {
          setFormUrl(val)
          setUrlError(false)
        }}
        onChangeActive={setFormActive}
        onClose={() => setModal(null)}
        onSubmit={modal?.type === 'add' ? saveAdd : saveEdit}
      />

      <DisableProviderConfirmModal
        provider={modal?.type === 'disable' ? modal.provider : null}
        onClose={() => setModal(null)}
        onConfirm={confirmDisable}
      />
    </div>
  )
}
