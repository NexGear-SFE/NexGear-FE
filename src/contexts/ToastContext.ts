import { createContext } from 'react'
import type { ToastType } from '@/components/common/Toast'

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
