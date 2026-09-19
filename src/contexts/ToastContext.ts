import { createContext } from 'react'
import type { ToastContextType } from '@/types/common/toast.type'

export type { ToastContextType }

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
