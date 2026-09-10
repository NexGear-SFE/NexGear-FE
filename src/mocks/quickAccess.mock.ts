import { Monitor, Gamepad2, Tv, Keyboard, Mouse, Headphones, Armchair, HardDrive } from 'lucide-react'

export interface QuickCategoryItem {
  id: string
  title: string
  icon: typeof Monitor
  targetId: string
}

export const quickCategories: QuickCategoryItem[] = [
  { id: 'pc-gaming', title: 'PC Gaming', icon: Monitor, targetId: 'pc-banchay' },
  { id: 'laptop-rtx', title: 'Laptop RTX 40', icon: Gamepad2, targetId: 'laptop-banchay' },
  { id: 'screen-240hz', title: 'Màn Hình 240Hz', icon: Tv, targetId: 'gear-banchay' },
  { id: 'keyboard-mech', title: 'Bàn Phím Cơ', icon: Keyboard, targetId: 'gear-banchay' },
  { id: 'mouse-gaming', title: 'Chuột Gaming', icon: Mouse, targetId: 'gear-banchay' },
  { id: 'headphones', title: 'Tai Nghe', icon: Headphones, targetId: 'gear-banchay' },
  { id: 'chair-ergo', title: 'Ghế Ergonomic', icon: Armchair, targetId: 'gear-banchay' },
  { id: 'ssd-nvme', title: 'SSD NVMe', icon: HardDrive, targetId: 'gear-banchay' },
]

export const brandPartners: string[] = [
  'ASUS ROG',
  'MSI',
  'Corsair',
  'Gigabyte',
  'Logitech',
  'Razer',
  'Intel',
  'AMD',
]
