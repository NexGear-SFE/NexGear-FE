import { useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, FolderPlus, RefreshCw, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import type { Category } from '@/types/category.type'
import { buildCategoryTree, filterCategoryOptions, flattenCategoryTree } from '@/utils/buildCategoryTree'
import { cn } from '@/utils/cn'

type CategorySelectProps = {
  categories: Category[]
  error?: string
  isLoading?: boolean
  label?: string
  onChange: (categoryId: string) => void
  onRefresh?: () => void
  value: string
}

export function CategorySelect({ categories, error, isLoading = false, label = 'Danh mục', onChange, onRefresh, value }: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const options = useMemo(() => {
    const activeCategories = categories.filter((category) => category.status === 'ACTIVE')
    const flattened = flattenCategoryTree(buildCategoryTree(activeCategories))
    const normalizedQuery = query.trim().toLocaleLowerCase('vi')
    if (!normalizedQuery) return flattened
    return filterCategoryOptions(flattened, query).concat(flattened.filter((option) => {
      const category = activeCategories.find((item) => item.id === option.id)
      return category?.code.toLocaleLowerCase('vi').includes(normalizedQuery)
    })).filter((option, index, all) => all.findIndex((candidate) => candidate.id === option.id) === index)
  }, [categories, query])
  const selected = flattenCategoryTree(buildCategoryTree(categories)).find((option) => option.id === value)

  const open = () => {
    setIsOpen(true)
    setActiveIndex(Math.max(0, options.findIndex((option) => option.id === value)))
    window.requestAnimationFrame(() => searchRef.current?.focus())
  }

  const choose = (categoryId: string) => {
    onChange(categoryId)
    setIsOpen(false)
    setQuery('')
  }

  return <div className="relative" onKeyDown={(event) => { if (event.key === 'Escape' && isOpen) { event.preventDefault(); setIsOpen(false) } }}>
    <label className="mb-2 block text-sm font-medium" id="category-select-label">{label}</label>
    <button type="button" aria-expanded={isOpen} aria-haspopup="listbox" aria-label={`${label}: ${selected?.breadcrumb ?? 'Chọn danh mục'}`} onClick={() => isOpen ? setIsOpen(false) : open()} className="input-gaming flex min-h-11 w-full items-center justify-between gap-2 text-left">
      <span className={cn('truncate', !selected && 'text-text-600')}>{selected?.breadcrumb ?? 'Chọn danh mục'}</span><ChevronDown className="h-4 w-4 shrink-0" />
    </button>
    {isOpen && <div className="absolute z-30 mt-2 w-full min-w-72 rounded-md border border-surface-400 bg-white p-2 shadow-clay-md">
      <label className="relative block"><span className="sr-only">Tìm danh mục</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-600" /><input ref={searchRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} onKeyDown={(event) => {
        if (event.key === 'Escape') setIsOpen(false)
        if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, options.length - 1)) }
        if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)) }
        if (event.key === 'Enter' && options[activeIndex]) { event.preventDefault(); choose(options[activeIndex].id) }
      }} className="input-gaming w-full pl-10" placeholder="Tên, code hoặc breadcrumb…" role="combobox" aria-controls="category-options" aria-activedescendant={options[activeIndex] ? `category-option-${options[activeIndex].id}` : undefined} /></label>
      <div id="category-options" role="listbox" className="mt-2 max-h-64 overflow-y-auto">
        {isLoading && <p role="status" className="p-4 text-center text-sm text-text-600">Đang tải danh mục…</p>}
        {!isLoading && error && <div className="p-4 text-center text-sm text-error-700"><p>{error}</p>{onRefresh && <button type="button" className="btn-outlined mt-3" onClick={onRefresh}><RefreshCw className="h-4 w-4" /> Thử lại</button>}</div>}
        {!isLoading && !error && options.map((option, index) => <button id={`category-option-${option.id}`} role="option" aria-selected={option.id === value} type="button" key={option.id} onMouseEnter={() => setActiveIndex(index)} onClick={() => choose(option.id)} className={cn('flex min-h-11 w-full items-center gap-2 rounded-sm px-3 text-left text-sm', activeIndex === index && 'bg-surface-200', option.id === value && 'text-brand-500')}><span className="min-w-0 flex-1"><span className="block font-medium">{option.name}</span><span className="block truncate text-xs text-text-600">{option.breadcrumb}</span></span>{option.id === value && <Check className="h-4 w-4" />}</button>)}
        {!isLoading && !error && options.length === 0 && <div className="p-4 text-center text-sm text-text-600"><p>Không tìm thấy danh mục hoạt động.</p><Link to={ROUTES.warehouseCategories} className="btn-outlined mt-3"><FolderPlus className="h-4 w-4" /> Quản lý danh mục</Link>{onRefresh && <button type="button" className="mt-3 block w-full text-xs font-semibold text-brand-500" onClick={onRefresh}>Làm mới danh sách</button>}</div>}
      </div>
    </div>}
  </div>
}
