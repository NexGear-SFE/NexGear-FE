import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { PasswordFieldProps } from '@/types/common/ui.type'

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  required = false,
  className = '',
  inputClassName = '',
}: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-[#040004] mb-1.5">
          {label} {required && <span className="text-[#E30019]">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`input-gaming w-full pr-11 py-3 px-4 text-sm sm:text-base font-medium ${inputClassName}`}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          className="absolute right-3 text-gray-400 hover:text-gray-700 transition-mechanical cursor-pointer p-1"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-xs text-[#E30019] font-medium">{error}</p>
      )}
    </div>
  )
}
