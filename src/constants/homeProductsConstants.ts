import React from 'react'
import {
  Laptop,
  Keyboard,
  Mouse,
  Monitor,
  Tv,
  Cpu,
  Headphones,
  Gamepad2,
  HardDrive,
  Speaker,
  type LucideIcon,
} from 'lucide-react'

export const HOME_PRODUCTS_INFO_TEXT =
  'Sản phẩm trong mỗi shelf được chọn tự động bởi thuật toán dựa trên: lượt xem, tỉ lệ chuyển đổi, và tồn kho khả dụng. Thứ tự danh mục tương ứng với thứ tự hiển thị trên trang chủ.'

export const HOME_PRODUCTS_SUBTITLE =
  'Chọn danh mục nào sẽ xuất hiện trên trang chủ. Mỗi danh mục được bật sẽ hiển thị shelf sản phẩm tự động bên dưới.'

/**
 * Mapping of category icons using Lucide React
 */
export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  Laptop,
  Keyboard,
  Mouse,
  Monitor,
  Tv,
  Cpu,
  Headphones,
  Gamepad2,
  HardDrive,
  Speaker,

  // Support emoji fallbacks mapped to Lucide icons
  '💻': Laptop,
  '⌨️': Keyboard,
  '🖱️': Mouse,
  '🖥️': Monitor,
  '📺': Tv,
  '🎧': Headphones,
  '🎮': Gamepad2,
}

export const resolveCategoryIcon = (icon: string): LucideIcon => {
  const trimmed = icon.trim()
  if (CATEGORY_ICON_MAP[trimmed]) {
    return CATEGORY_ICON_MAP[trimmed]
  }

  const lower = trimmed.toLowerCase()
  const found = Object.keys(CATEGORY_ICON_MAP).find(
    (k) => k.toLowerCase() === lower
  )
  if (found) {
    return CATEGORY_ICON_MAP[found]
  }

  return Monitor
}

export const CategoryIcon: React.FC<{ icon: string; className?: string }> = ({
  icon,
  className = 'w-4 h-4',
}) => {
  const iconComponent = resolveCategoryIcon(icon)
  return React.createElement(iconComponent, { className })
}

/**
 * Format number to Vietnamese Currency (VND)
 */
export const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)
}
