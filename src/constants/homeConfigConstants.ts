import type { HomeConfigTab, HomeConfigTabId, BadgeTheme } from '@/types/homeConfig'
import {
  CheckCircle2,
  Zap,
  Wrench,
  RotateCcw,
  ShieldCheck,
  Truck,
  Clock,
  Headphones,
  Award,
  Star,
  Sparkles,
  PackageCheck,
  type LucideIcon,
} from 'lucide-react'

export const HOME_CONFIG_TABS: HomeConfigTab[] = [
  { id: 'hero', label: 'Hero Banner / Slider' },
  { id: 'quick-access', label: 'Truy cập nhanh' },
  { id: 'commitments', label: 'Cam kết & Tiện ích' },
  { id: 'products', label: 'SP Trang chủ' },
  { id: 'footer', label: 'Cấu hình Footer' },
]

export const DEFAULT_HOME_CONFIG_TAB: HomeConfigTabId = 'commitments'

export const BADGE_THEMES: Record<number, BadgeTheme> = {
  0: {
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
  1: {
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  2: {
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
  },
  3: {
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
}

export interface LucideIconOption {
  key: string
  name: string
  icon: LucideIcon
  emojiEquivalent?: string
}

export const TRUST_BADGE_PRESET_ICONS: LucideIconOption[] = [
  { key: 'CheckCircle2', name: 'Check xanh', icon: CheckCircle2, emojiEquivalent: '✅' },
  { key: 'Zap', name: 'Sấm sét', icon: Zap, emojiEquivalent: '⚡' },
  { key: 'Wrench', name: 'Cờ lê', icon: Wrench, emojiEquivalent: '🔧' },
  { key: 'RotateCcw', name: 'Đổi mới / Xoay vòng', icon: RotateCcw, emojiEquivalent: '🔄' },
  { key: 'ShieldCheck', name: 'Bảo hành / Khiên', icon: ShieldCheck, emojiEquivalent: '🛡️' },
  { key: 'Truck', name: 'Giao hàng', icon: Truck, emojiEquivalent: '🚚' },
  { key: 'Clock', name: 'Thời gian 24/7', icon: Clock, emojiEquivalent: '⏰' },
  { key: 'Headphones', name: 'Hỗ trợ kỹ thuật', icon: Headphones, emojiEquivalent: '🎧' },
  { key: 'Award', name: 'Chứng nhận', icon: Award, emojiEquivalent: '🏆' },
  { key: 'Star', name: 'Uy tín / Đánh giá', icon: Star, emojiEquivalent: '⭐' },
  { key: 'Sparkles', name: 'Chất lượng cao', icon: Sparkles, emojiEquivalent: '✨' },
  { key: 'PackageCheck', name: 'Hàng nguyên seal', icon: PackageCheck, emojiEquivalent: '📦' },
]

/**
 * Mapping from icon key / name / emoji to LucideIcon component
 */
export const LUCIDE_ICON_MAP: Record<string, LucideIcon> = {
  // Direct Lucide names
  CheckCircle2,
  Zap,
  Wrench,
  RotateCcw,
  ShieldCheck,
  Truck,
  Clock,
  Headphones,
  Award,
  Star,
  Sparkles,
  PackageCheck,

  // Emoji shortcuts to Lucide icons
  '✅': CheckCircle2,
  '⚡': Zap,
  '🔧': Wrench,
  '🔄': RotateCcw,
  '🛡️': ShieldCheck,
  '🚚': Truck,
  '⏰': Clock,
  '🎧': Headphones,
  '🏆': Award,
  '⭐': Star,
  '✨': Sparkles,
  '📦': PackageCheck,
}

/**
 * Resolve an icon string (Lucide name or emoji) to a LucideIcon.
 * If not found in map, falls back to CheckCircle2 or matches case-insensitively.
 */
export const resolveLucideIcon = (iconInput: string): LucideIcon => {
  const trimmed = iconInput.trim()
  if (!trimmed) {
    return CheckCircle2
  }

  // Exact match
  if (LUCIDE_ICON_MAP[trimmed]) {
    return LUCIDE_ICON_MAP[trimmed]
  }

  // Case-insensitive match for Lucide names
  const lower = trimmed.toLowerCase()
  const foundKey = Object.keys(LUCIDE_ICON_MAP).find(
    (k) => k.toLowerCase() === lower
  )
  if (foundKey) {
    return LUCIDE_ICON_MAP[foundKey]
  }

  return CheckCircle2
}
