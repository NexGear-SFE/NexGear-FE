import React from 'react'
import type { QuickAccessIconProps } from '@/types/admin/quickAccess.type'
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
  Armchair,
  Layers,
  type LucideIcon,
} from 'lucide-react'

// Fallback lookup including potential emojis or lowercased strings
const ICON_MAP: Record<string, LucideIcon> = {
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
  Armchair,
  Layers,
  '🖥️': Monitor,
  '💻': Laptop,
  '⌨️': Keyboard,
  '🎧': Headphones,
  '🖱️': Mouse,
  '🎮': Gamepad2,
  '🪑': Armchair,
}

export const QuickAccessIcon: React.FC<QuickAccessIconProps> = ({
  name,
  className = 'w-4 h-4',
}) => {
  const IconComponent = ICON_MAP[name] || Monitor
  return <IconComponent className={className} />
}
