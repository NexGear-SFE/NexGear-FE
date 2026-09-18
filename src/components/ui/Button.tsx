import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'chip'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  isActive?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isActive = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-[#E30019] hover:bg-[#B30014] text-white border border-transparent shadow-sm focus:ring-2 focus:ring-[#E30019]/25',
      secondary:
        'bg-[#040004] hover:bg-[#1a171a] text-white border border-transparent focus:ring-2 focus:ring-black/20',
      outline:
        'bg-transparent border border-[#E0E0E0] text-[#040004] hover:border-[#E30019] hover:text-[#E30019] focus:ring-2 focus:ring-[#E30019]/20',
      chip: cn(
        'bg-white border border-[#E0E0E0] text-gray-700 rounded-full font-medium transition-mechanical',
        isActive
          ? 'border-[#E30019] text-[#E30019] bg-[#E30019]/5 font-semibold'
          : 'hover:border-gray-400 hover:text-[#040004]'
      ),
    }

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-[4px]',
      md: 'text-sm px-4 py-2 gap-2 rounded-[4px]',
      lg: 'text-base px-6 py-3 gap-2.5 rounded-[4px]',
    }

    const isButtonDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-mechanical cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          variantStyles[variant],
          variant !== 'chip' && sizeStyles[size],
          variant === 'chip' && (size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'),
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
