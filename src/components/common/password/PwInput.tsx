import { Eye, EyeOff, AlertTriangle } from 'lucide-react'

interface PwInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggle: () => void
  error?: string
  placeholder?: string
}

export function PwInput({
  label,
  value,
  onChange,
  show,
  onToggle,
  error,
  placeholder,
}: PwInputProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#040004] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`input-gaming w-full pr-11 ${
            error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
          }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 p-1 flex items-center justify-center hover:text-slate-600 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && (
        <div className="text-[12px] text-red-400 mt-1.5 font-body flex items-center gap-1.5">
          <AlertTriangle size={14} /> {error}
        </div>
      )}
    </div>
  )
}
