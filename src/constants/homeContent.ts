import type { HomeContentTab } from '@/types/homeContent.type'
import {
  Monitor,
  Laptop,
  Tv,
  Keyboard,
  Headphones,
  Mouse,
  Gamepad2,
  Cpu,
  HardDrive,
  Speaker,
  type LucideIcon,
} from 'lucide-react'

export const HOME_CONTENT_TABS: { key: HomeContentTab; label: string }[] = [
  { key: 'hero', label: 'Hero Banner / Slider' },
  { key: 'quick-access', label: 'Truy cập nhanh' },
  { key: 'commitments', label: 'Cam kết & Tiện ích' },
  { key: 'products', label: 'SP Trang chủ' },
  { key: 'footer', label: 'Cấu hình Footer' },
]

export const DEFAULT_HOME_TAB: HomeContentTab = 'hero'

export interface QuickAccessIconOption {
  key: string
  label: string
  icon: LucideIcon
}

export const QUICK_ACCESS_ICONS: QuickAccessIconOption[] = [
  { key: 'Monitor', label: 'Màn hình / PC', icon: Monitor },
  { key: 'Laptop', label: 'Laptop', icon: Laptop },
  { key: 'Tv', label: 'Màn hình TV', icon: Tv },
  { key: 'Keyboard', label: 'Bàn phím cơ', icon: Keyboard },
  { key: 'Headphones', label: 'Tai nghe gaming', icon: Headphones },
  { key: 'Mouse', label: 'Chuột gaming', icon: Mouse },
  { key: 'Gamepad2', label: 'Tay cầm chơi game', icon: Gamepad2 },
  { key: 'Cpu', label: 'Vi xử lý / Linh kiện', icon: Cpu },
  { key: 'HardDrive', label: 'Ổ cứng / Bộ nhớ', icon: HardDrive },
  { key: 'Speaker', label: 'Loa âm thanh', icon: Speaker },
]

export interface CategoryPreset {
  id: string
  label: string
  icon: string
  url: string
}

export const QUICK_ACCESS_CATEGORY_PRESETS: CategoryPreset[] = [
  { id: 'laptop-gaming', label: 'Laptop Gaming', icon: 'Laptop', url: '/category/laptop-gaming' },
  { id: 'pc-gaming', label: 'PC Gaming', icon: 'Monitor', url: '/category/pc-gaming' },
  { id: 'monitor', label: 'Màn hình', icon: 'Tv', url: '/category/monitor' },
  { id: 'co-keyboard', label: 'Bàn phím cơ', icon: 'Keyboard', url: '/category/co-keyboard' },
  { id: 'mouse', label: 'Chuột gaming', icon: 'Mouse', url: '/category/gaming-mouse' },
  { id: 'headset', label: 'Tai nghe gaming', icon: 'Headphones', url: '/category/gaming-headset' },
  { id: 'chair', label: 'Ghế gaming', icon: 'Armchair', url: '/category/gaming-chair' },
  { id: 'desk', label: 'Bàn gaming', icon: 'Layers', url: '/category/gaming-desk' },
]
