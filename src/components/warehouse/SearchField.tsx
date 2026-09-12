import { Search, X } from 'lucide-react'

type SearchFieldProps = {
  label: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  value: string
}

export function SearchField({ label, onChange, onSubmit, placeholder, value }: SearchFieldProps) {
  return <label className="relative block min-w-0 flex-1">
    <span className="sr-only">{label}</span>
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-600" />
    <input type="search" value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') onSubmit?.() }} placeholder={placeholder} className="input-gaming w-full pl-10 pr-10" />
    {value && <button type="button" aria-label={`Xóa ${label.toLowerCase()}`} onClick={() => onChange('')} className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm text-text-600 focus-visible:outline-none focus-visible:shadow-focus"><X className="h-4 w-4" /></button>}
  </label>
}
