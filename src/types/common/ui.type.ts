import type { ReactNode } from 'react'
import type { User, UserRole } from './auth.type'

export type UnderDevelopmentPageProps = {
  title?: string
  description?: string
  backPath?: string
  backText?: string
}

export type ProtectedRouteProps = {
  children?: ReactNode
  allowedRoles?: UserRole[]
}

export type AccountDropdownProps = {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onLogout: () => void
}

export type ProfileSectionProps = {
  user: User | null
  isCollapsed: boolean
}

export type SidebarUserWidgetProps = {
  isCollapsed: boolean
}

export type CategorySidebarProps = {
  activeCategory?: string
  onSelectCategory?: (category: string) => void
}

export type PasswordFieldProps = {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  autoComplete?: string
}

export type QuickLoginModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelectUser: (user: User) => void
}

export type TicketBadgeProps = {
  status: string
}
