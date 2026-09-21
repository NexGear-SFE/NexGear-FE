import type { HomeConfigTab, HomeConfigTabId, BadgeTheme } from '@/types/admin/homeConfig.type'
import {
  icons,
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
  BadgeCheck,
  ShieldAlert,
  Verified,
  Package,
  MapPin,
  Send,
  Box,
  Cpu,
  Monitor,
  Laptop,
  Gamepad2,
  Keyboard,
  Mouse,
  HardDrive,
  Flame,
  Fan,
  HeartHandshake,
  CreditCard,
  Percent,
  Gift,
  LifeBuoy,
  Banknote,
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

export const LUCIDE_ICONS_LIBRARY_URL = 'https://lucide.dev/icons'

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
  category: 'warranty' | 'shipping' | 'tech' | 'service'
  categoryLabel: string
  icon: LucideIcon
  emojiEquivalent?: string
}

export const TRUST_BADGE_PRESET_ICONS: LucideIconOption[] = [
  // 1. Bảo hành & Cam kết uy tín
  { key: 'ShieldCheck', name: 'Bảo hành chính hãng', category: 'warranty', categoryLabel: 'Bảo hành & Uy tín', icon: ShieldCheck, emojiEquivalent: '🛡️' },
  { key: 'BadgeCheck', name: 'Chính hãng 100%', category: 'warranty', categoryLabel: 'Bảo hành & Uy tín', icon: BadgeCheck },
  { key: 'CheckCircle2', name: 'Cam kết chất lượng', category: 'warranty', categoryLabel: 'Bảo hành & Uy tín', icon: CheckCircle2, emojiEquivalent: '✅' },
  { key: 'Award', name: 'Top thương hiệu', category: 'warranty', categoryLabel: 'Bảo hành & Uy tín', icon: Award, emojiEquivalent: '🏆' },
  { key: 'Sparkles', name: 'Hàng tuyển chọn', category: 'warranty', categoryLabel: 'Bảo hành & Uy tín', icon: Sparkles, emojiEquivalent: '✨' },
  { key: 'Star', name: 'Đánh giá 5 sao', category: 'warranty', categoryLabel: 'Bảo hành & Uy tín', icon: Star, emojiEquivalent: '⭐' },
  { key: 'ShieldAlert', name: 'Bảo hiểm toàn diện', category: 'warranty', categoryLabel: 'Bảo hành & Uy tín', icon: ShieldAlert },
  { key: 'Verified', name: 'Chứng thực ủy quyền', category: 'warranty', categoryLabel: 'Bảo hành & Uy tín', icon: Verified },

  // 2. Giao hàng & Đổi trả
  { key: 'Truck', name: 'Giao hàng hỏa tốc', category: 'shipping', categoryLabel: 'Vận chuyển & Đổi trả', icon: Truck, emojiEquivalent: '🚚' },
  { key: 'PackageCheck', name: 'Hàng nguyên seal', category: 'shipping', categoryLabel: 'Vận chuyển & Đổi trả', icon: PackageCheck, emojiEquivalent: '📦' },
  { key: 'RotateCcw', name: '1 đổi 1 30 ngày', category: 'shipping', categoryLabel: 'Vận chuyển & Đổi trả', icon: RotateCcw, emojiEquivalent: '🔄' },
  { key: 'Package', name: 'Đóng gói chuẩn quy cách', category: 'shipping', categoryLabel: 'Vận chuyển & Đổi trả', icon: Package },
  { key: 'Clock', name: 'Phục vụ 24/7', category: 'shipping', categoryLabel: 'Vận chuyển & Đổi trả', icon: Clock, emojiEquivalent: '⏰' },
  { key: 'MapPin', name: 'Giao toàn quốc', category: 'shipping', categoryLabel: 'Vận chuyển & Đổi trả', icon: MapPin },
  { key: 'Send', name: 'Giao siêu tốc 2h', category: 'shipping', categoryLabel: 'Vận chuyển & Đổi trả', icon: Send },
  { key: 'Box', name: 'Bảo vệ kiện hàng', category: 'shipping', categoryLabel: 'Vận chuyển & Đổi trả', icon: Box },

  // 3. Linh kiện & Gaming Gear (Domain NexGear)
  { key: 'Cpu', name: 'Linh kiện cao cấp', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Cpu },
  { key: 'Monitor', name: 'Màn hình Gaming 240Hz', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Monitor, emojiEquivalent: '🖥️' },
  { key: 'Laptop', name: 'Laptop Gaming RTX', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Laptop, emojiEquivalent: '💻' },
  { key: 'Gamepad2', name: 'Gear chiến game', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Gamepad2, emojiEquivalent: '🎮' },
  { key: 'Keyboard', name: 'Bàn phím cơ Custom', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Keyboard, emojiEquivalent: '⌨️' },
  { key: 'Mouse', name: 'Chuột Esports siêu nhẹ', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Mouse, emojiEquivalent: '🖱️' },
  { key: 'HardDrive', name: 'Ổ cứng SSD Gen4/Gen5', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: HardDrive },
  { key: 'Zap', name: 'Tốc độ xử lý đỉnh cao', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Zap, emojiEquivalent: '⚡' },
  { key: 'Flame', name: 'Hiệu năng cực đỉnh', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Flame, emojiEquivalent: '🔥' },
  { key: 'Fan', name: 'Tản nhiệt tối ưu', category: 'tech', categoryLabel: 'Công nghệ & Gear', icon: Fan },

  // 4. CSKH & Dịch vụ hỗ trợ
  { key: 'Headphones', name: 'Tư vấn kỹ thuật', category: 'service', categoryLabel: 'Dịch vụ & CSKH', icon: Headphones, emojiEquivalent: '🎧' },
  { key: 'Wrench', name: 'Lắp ráp theo yêu cầu', category: 'service', categoryLabel: 'Dịch vụ & CSKH', icon: Wrench, emojiEquivalent: '🔧' },
  { key: 'HeartHandshake', name: 'Tận tâm chu đáo', category: 'service', categoryLabel: 'Dịch vụ & CSKH', icon: HeartHandshake },
  { key: 'CreditCard', name: 'Trả góp 0% tiện lợi', category: 'service', categoryLabel: 'Dịch vụ & CSKH', icon: CreditCard },
  { key: 'Percent', name: 'Ưu đãi thành viên', category: 'service', categoryLabel: 'Dịch vụ & CSKH', icon: Percent },
  { key: 'Gift', name: 'Quà tặng hấp dẫn', category: 'service', categoryLabel: 'Dịch vụ & CSKH', icon: Gift, emojiEquivalent: '🎁' },
  { key: 'LifeBuoy', name: 'Cứu hộ phần mềm', category: 'service', categoryLabel: 'Dịch vụ & CSKH', icon: LifeBuoy },
  { key: 'Banknote', name: 'Cam kết giá tốt', category: 'service', categoryLabel: 'Dịch vụ & CSKH', icon: Banknote },
]

/**
 * Ánh xách từ biểu tượng emoji sang Lucide icon component tương ứng
 */
export const EMOJI_ICON_MAP: Record<string, LucideIcon> = {
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
  '🔥': Flame,
  '🎁': Gift,
  '🖥️': Monitor,
  '💻': Laptop,
  '⌨️': Keyboard,
  '🖱️': Mouse,
  '🎮': Gamepad2,
}

/**
 * Hàm hỗ trợ chuyển đổi chuỗi dạng kebab-case, snake_case hoặc văn bản thường thành PascalCase.
 * Ví dụ: "shield-check" -> "ShieldCheck", "cpu" -> "Cpu", "gamepad-2" -> "Gamepad2"
 */
export const toPascalCase = (str: string): string => {
  return str
    .trim()
    .replace(/[-_ ]+([a-zA-Z0-9])/g, (_, char) => char.toUpperCase())
    .replace(/^[a-z]/, (char) => char.toUpperCase())
}

/**
 * Kiểm tra xem tên icon có tồn tại trong thư viện Lucide React hay không.
 * Trả về tên chuẩn định dạng và component nếu hợp lệ, ngược lại trả về null.
 */
export const getLucideIconIfValid = (
  iconInput: string
): { name: string; icon: LucideIcon } | null => {
  const trimmed = iconInput.trim()
  if (!trimmed) return null

  // 1. Kiểm tra nếu là emoji
  if (EMOJI_ICON_MAP[trimmed]) {
    const foundPreset = TRUST_BADGE_PRESET_ICONS.find((p) => p.emojiEquivalent === trimmed)
    return {
      name: foundPreset ? foundPreset.key : trimmed,
      icon: EMOJI_ICON_MAP[trimmed],
    }
  }

  const iconRegistry = icons as unknown as Record<string, LucideIcon | undefined>

  // 2. Tra cứu trực tiếp theo dạng PascalCase
  const pascalName = toPascalCase(trimmed)
  if (iconRegistry[pascalName]) {
    return { name: pascalName, icon: iconRegistry[pascalName]! }
  }

  // 3. Tra cứu khớp chính xác tên gốc
  if (iconRegistry[trimmed]) {
    return { name: trimmed, icon: iconRegistry[trimmed]! }
  }

  // 4. Tra cứu không phân biệt hoa thường trong toàn bộ thư viện Lucide
  const cleanLower = trimmed.toLowerCase().replace(/[-_ ]/g, '')
  const foundKey = Object.keys(icons).find(
    (key) => key.toLowerCase().replace(/[-_ ]/g, '') === cleanLower
  )
  if (foundKey && iconRegistry[foundKey]) {
    return { name: foundKey, icon: iconRegistry[foundKey]! }
  }

  return null
}

/**
 * Tìm kiếm component LucideIcon dựa trên chuỗi tên (tên Lucide, kebab-case, hoặc emoji).
 * Nếu không tìm thấy trong thư viện Lucide, tự động fallback an toàn về CheckCircle2.
 */
export const resolveLucideIcon = (iconInput: string): LucideIcon => {
  const matched = getLucideIconIfValid(iconInput)
  if (matched) {
    return matched.icon
  }

  return CheckCircle2
}
