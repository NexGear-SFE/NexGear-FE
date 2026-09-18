import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
}

interface ToastItemProps {
  toast: ToastMessage
  onClose: (id: string) => void
}

export const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#00A859] shrink-0" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[#E30019] shrink-0" />
      case 'info':
        return <Info className="w-5 h-5 text-[#1E88E5] shrink-0" />
    }
  }

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-l-[#00A859]'
      case 'error':
        return 'border-l-[#E30019]'
      case 'info':
        return 'border-l-[#1E88E5]'
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-3 min-w-[300px] max-w-md bg-white text-[#040004] p-3.5 rounded-[4px] shadow-lg border border-[#E0E0E0] border-l-4 ${getBorderColor()} transition-mechanical animate-in slide-in-from-top-2 duration-200`}
    >
      <div className="flex items-center gap-2.5">
        {getIcon()}
        <span className="text-xs font-semibold leading-snug">{toast.message}</span>
      </div>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="p-1 text-gray-400 hover:text-gray-700 transition-mechanical cursor-pointer"
        aria-label="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
