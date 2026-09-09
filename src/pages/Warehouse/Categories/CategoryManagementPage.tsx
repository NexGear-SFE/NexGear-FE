import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown, FolderPlus, MoveDown, MoveUp, Pencil, Plus, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { saveCategoryDraft } from '@/apis/category.api'
import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { SearchField } from '@/components/warehouse/SearchField'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { WarehouseStatCard } from '@/components/warehouse/WarehouseStatCard'
import { categorySchema, type CategoryFormValues } from '@/schemas/category.schema'
import { useWarehouseStore } from '@/stores/warehouseStore'
import type { Category } from '@/types/category.type'
import { buildCategoryBreadcrumb, buildCategoryTree, canUseCategoryParent, flattenCategoryTree, MAX_CATEGORY_DEPTH } from '@/utils/buildCategoryTree'
import { cn } from '@/utils/cn'
import { normalizeSkuSegment } from '@/utils/generateSkuPreview'

type FormErrors = Partial<Record<keyof CategoryFormValues | 'form', string>>

function toFormValues(category?: Partial<Category>, parentId: string | null = null): CategoryFormValues {
  return {
    name: category?.name ?? '', code: category?.code ?? '', slug: category?.slug ?? '', description: category?.description ?? '',
    parentId: category?.parentId ?? parentId, sortOrder: category?.sortOrder ?? 0, status: category?.status ?? 'ACTIVE',
  }
}

export function CategoryManagementPage() {
  const { categories, products, createCategory, updateCategory, toggleCategoryStatus, moveCategory } = useWarehouseStore()
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? '')
  const [isCreating, setIsCreating] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [query, setQuery] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(categories.filter((category) => !category.parentId).map((category) => category.id)))
  const [formValues, setFormValues] = useState<CategoryFormValues>(() => toFormValues(categories[0]))
  const [errors, setErrors] = useState<FormErrors>({})
  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null)
  const selected = categories.find((category) => category.id === selectedId)
  const tree = useMemo(() => buildCategoryTree(categories), [categories])
  const options = useMemo(() => flattenCategoryTree(tree), [tree])
  const filteredOptions = useMemo(() => options.filter((option) => {
    const category = categories.find((item) => item.id === option.id)
    const normalizedQuery = query.trim().toLocaleLowerCase('vi')
    return !normalizedQuery || Boolean(category && `${category.name} ${category.code} ${category.slug} ${option.breadcrumb}`.toLocaleLowerCase('vi').includes(normalizedQuery))
  }), [categories, options, query])

  const visibleOptions = query ? filteredOptions : options.filter((option) => {
    const category = categories.find((item) => item.id === option.id)
    let parentId = category?.parentId
    while (parentId) {
      if (!expandedIds.has(parentId)) return false
      parentId = categories.find((item) => item.id === parentId)?.parentId ?? null
    }
    return true
  })
  const parentOptions = options.filter((option) => canUseCategoryParent(categories, isCreating ? undefined : selected?.id, option.id))
  const rootCount = categories.filter((category) => !category.parentId).length
  const activeCount = categories.filter((category) => category.status === 'ACTIVE').length

  function selectCategory(category: Category) {
    setSelectedId(category.id)
    setIsCreating(false)
    setFormValues(toFormValues(category))
    setErrors({})
    setIsDetailOpen(true)
  }

  function openCreate(parentId: string | null = null) {
    setIsCreating(true)
    setSelectedId(parentId ?? '')
    setFormValues(toFormValues({ sortOrder: categories.filter((category) => category.parentId === parentId).length + 1 }, parentId))
    setErrors({})
    setIsDetailOpen(true)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    const normalized = { ...formValues, code: normalizeSkuSegment(formValues.code), slug: formValues.slug.trim().toLowerCase() }
    const result = categorySchema.safeParse(normalized)
    if (!result.success) {
      const fieldErrors: FormErrors = {}
      result.error.issues.forEach((issue) => { const field = issue.path[0] as keyof CategoryFormValues; fieldErrors[field] ??= issue.message })
      setErrors(fieldErrors)
      return
    }
    if (categories.some((category) => category.id !== selected?.id && (category.code === result.data.code || category.slug === result.data.slug))) {
      setErrors({ form: 'Code hoặc slug đã tồn tại.' })
      return
    }
    if (!canUseCategoryParent(categories, isCreating ? undefined : selected?.id, result.data.parentId)) {
      setErrors({ parentId: `Danh mục chỉ tối đa ${MAX_CATEGORY_DEPTH} cấp và không được tạo cycle.` })
      return
    }
    setIsSubmitting(true)
    try {
      await saveCategoryDraft(result.data)
      if (isCreating) {
        const id = createCategory(result.data)
        setSelectedId(id)
        setIsCreating(false)
        setExpandedIds((current) => new Set([...current, ...(result.data.parentId ? [result.data.parentId] : [])]))
        window.requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-category-id="${id}"]`)?.focus())
      } else if (selected) updateCategory(selected.id, result.data)
      setFormValues(result.data)
      setIsDetailOpen(false)
    } catch {
      setErrors({ form: 'Không thể lưu danh mục. Dữ liệu bạn nhập vẫn được giữ lại để thử lại.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = <Key extends keyof CategoryFormValues>(key: Key, value: CategoryFormValues[Key]) => {
    setFormValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  return <div className="space-y-6">
    <WarehousePageHeader eyebrow="Product taxonomy" title="Quản lý danh mục" description={`Cấu trúc nhiều root, tối đa ${MAX_CATEGORY_DEPTH} cấp; sản phẩm chỉ lưu categoryId.`} actions={<button type="button" className="btn-primary" onClick={() => openCreate()}><Plus className="h-4 w-4" /> Tạo danh mục gốc</button>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><WarehouseStatCard icon={FolderPlus} label="Tổng danh mục" value={categories.length} /><WarehouseStatCard icon={ChevronsUpDown} label="Danh mục gốc" value={rootCount} /><WarehouseStatCard icon={ChevronDown} label="Đang hoạt động" value={activeCount} /><WarehouseStatCard icon={ChevronRight} label="Ngừng hoạt động" value={categories.length - activeCount} /></div>
    <div className="grid gap-6 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)]">
      <section className="card-gaming p-4">
        <div className="mb-4 flex flex-col gap-3"><div className="flex items-center justify-between"><h2 className="font-heading text-base font-semibold">Cây danh mục</h2><button type="button" className="btn-outlined px-3" onClick={() => setExpandedIds(expandedIds.size ? new Set() : new Set(categories.map((category) => category.id)))}>{expandedIds.size ? <ChevronsDownUp className="h-4 w-4" /> : <ChevronsUpDown className="h-4 w-4" />} {expandedIds.size ? 'Thu gọn' : 'Mở tất cả'}</button></div><SearchField label="Tìm danh mục" value={query} onChange={setQuery} placeholder="Tên, code, slug…" /></div>
        <div className="space-y-1">{visibleOptions.map((option) => {
          const category = categories.find((item) => item.id === option.id)
          if (!category) return null
          const hasChildren = categories.some((item) => item.parentId === category.id)
          const productCount = products.filter((product) => product.categoryId === category.id).length
          return <div key={category.id} className={cn('group flex min-h-12 items-center rounded-sm', selectedId === category.id && !isCreating ? 'bg-error-50' : 'hover:bg-surface-200')} style={{ paddingLeft: `${4 + option.depth * 18}px` }}>
            <button type="button" aria-label={`${expandedIds.has(category.id) ? 'Thu gọn' : 'Mở'} ${category.name}`} disabled={!hasChildren} onClick={() => setExpandedIds((current) => { const next = new Set(current); if (next.has(category.id)) next.delete(category.id); else next.add(category.id); return next })} className="flex h-10 w-8 shrink-0 items-center justify-center disabled:opacity-20">{expandedIds.has(category.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</button>
            <button data-category-id={category.id} type="button" onClick={() => selectCategory(category)} className="min-w-0 flex-1 py-2 text-left focus-visible:outline-none focus-visible:shadow-focus"><span className="block truncate text-sm font-semibold">{category.name}</span><span className="block truncate text-[11px] text-text-600">{category.code} · {productCount} SP · {category.status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng'}</span></button>
            <button type="button" aria-label={`Thêm danh mục con cho ${category.name}`} disabled={option.depth + 1 >= MAX_CATEGORY_DEPTH} onClick={() => openCreate(category.id)} className="mr-1 flex h-10 w-9 items-center justify-center rounded-sm opacity-0 focus:opacity-100 group-hover:opacity-100 disabled:hidden"><FolderPlus className="h-4 w-4" /></button>
          </div>
        })}{visibleOptions.length === 0 && <p className="p-8 text-center text-sm text-text-600">Không tìm thấy danh mục phù hợp.</p>}</div>
      </section>
      <section className={cn('card-gaming p-5 md:p-6', isDetailOpen ? 'fixed inset-0 z-50 overflow-y-auto rounded-none lg:static lg:z-auto lg:rounded-md' : 'hidden lg:block')}>
        {(selected || isCreating) ? <><div className="mb-5 flex items-start justify-between gap-3"><div><p className="text-caption uppercase tracking-wider text-text-600">{isCreating ? 'Danh mục mới' : buildCategoryBreadcrumb(categories, selectedId)}</p><h2 className="mt-1 font-heading text-xl font-semibold">{isCreating ? 'Tạo danh mục' : selected?.name}</h2></div><button type="button" aria-label="Đóng biểu mẫu" className="flex h-11 w-11 items-center justify-center rounded-sm lg:hidden" onClick={() => setIsDetailOpen(false)}><X className="h-5 w-5" /></button></div>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">Tên danh mục<input value={formValues.name} onChange={(event) => { const previousAutoCode = normalizeSkuSegment(formValues.name); const nextName = event.target.value; setFormValues((current) => ({ ...current, name: nextName, code: !current.code || current.code === previousAutoCode ? normalizeSkuSegment(nextName) : current.code, slug: !current.slug || current.slug === previousAutoCode.toLowerCase() ? normalizeSkuSegment(nextName).toLowerCase() : current.slug })) }} className="input-gaming mt-2 w-full" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="mt-1 block text-xs text-error-700">{errors.name}</span>}</label>
            <label className="text-sm font-medium">Code<input value={formValues.code} onChange={(event) => updateField('code', event.target.value.toUpperCase())} onBlur={() => updateField('code', normalizeSkuSegment(formValues.code))} className="input-gaming mt-2 w-full" aria-invalid={Boolean(errors.code)} />{errors.code && <span className="mt-1 block text-xs text-error-700">{errors.code}</span>}</label>
            <label className="text-sm font-medium">Slug<input value={formValues.slug} onChange={(event) => updateField('slug', event.target.value.toLowerCase())} className="input-gaming mt-2 w-full" aria-invalid={Boolean(errors.slug)} />{errors.slug && <span className="mt-1 block text-xs text-error-700">{errors.slug}</span>}</label>
            <label className="text-sm font-medium">Danh mục cha<select value={formValues.parentId ?? ''} onChange={(event) => updateField('parentId', event.target.value || null)} className="input-gaming mt-2 w-full" aria-invalid={Boolean(errors.parentId)}><option value="">Danh mục gốc</option>{parentOptions.map((option) => <option key={option.id} value={option.id}>{option.breadcrumb}</option>)}</select>{errors.parentId && <span className="mt-1 block text-xs text-error-700">{errors.parentId}</span>}</label>
            <label className="text-sm font-medium">Thứ tự<input value={formValues.sortOrder} onChange={(event) => updateField('sortOrder', Number(event.target.value))} type="number" min="0" className="input-gaming mt-2 w-full" /></label>
            <label className="text-sm font-medium">Trạng thái<select value={formValues.status} onChange={(event) => updateField('status', event.target.value as CategoryFormValues['status'])} className="input-gaming mt-2 w-full"><option value="ACTIVE">Hoạt động</option><option value="INACTIVE">Ngừng hoạt động</option></select></label>
            <label className="text-sm font-medium sm:col-span-2">Mô tả<textarea value={formValues.description} onChange={(event) => updateField('description', event.target.value)} rows={4} className="input-gaming mt-2 w-full resize-y" /></label>
            <div className="rounded-sm bg-surface-200 p-3 text-xs text-text-600 sm:col-span-2"><strong className="text-text-900">Breadcrumb preview:</strong> {formValues.parentId ? `${buildCategoryBreadcrumb(categories, formValues.parentId)} / ` : ''}{formValues.name || 'Tên danh mục'}</div>
            {errors.form && <p role="alert" className="rounded-sm bg-error-50 p-3 text-sm text-error-700 sm:col-span-2">{errors.form}</p>}
            <div className="flex flex-wrap justify-between gap-2 sm:col-span-2"><div className="flex gap-2">{!isCreating && selected && <><button type="button" aria-label="Di chuyển lên" className="btn-outlined px-3" onClick={() => moveCategory(selected.id, 'up')}><MoveUp className="h-4 w-4" /></button><button type="button" aria-label="Di chuyển xuống" className="btn-outlined px-3" onClick={() => moveCategory(selected.id, 'down')}><MoveDown className="h-4 w-4" /></button></>}</div><div className="flex gap-2">{!isCreating && selected && <button type="button" className="btn-outlined" onClick={() => setPendingStatusId(selected.id)}>{selected.status === 'ACTIVE' ? 'Ngừng hoạt động' : 'Kích hoạt'}</button>}<button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60"><Pencil className="h-4 w-4" /> {isSubmitting ? 'Đang lưu…' : isCreating ? 'Tạo danh mục' : 'Lưu thay đổi'}</button></div></div>
          </form></> : <div className="flex min-h-80 items-center justify-center text-sm text-text-600">Chọn một danh mục để xem chi tiết.</div>}
      </section>
    </div>
    <ConfirmDialog isOpen={Boolean(pendingStatusId)} title="Xác nhận đổi trạng thái" description="Danh mục không bị xóa. Quan hệ cây và sản phẩm đang tham chiếu vẫn được giữ nguyên." confirmLabel="Đổi trạng thái" onCancel={() => setPendingStatusId(null)} onConfirm={() => { if (pendingStatusId) { toggleCategoryStatus(pendingStatusId); setFormValues((current) => ({ ...current, status: current.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })) } setPendingStatusId(null) }} />
  </div>
}
