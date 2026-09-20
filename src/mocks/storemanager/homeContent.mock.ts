import type { BannerItem, QuickAccessItem } from '@/types/admin/homeContent.type'

export const INITIAL_HERO_BANNERS: BannerItem[] = [
  {
    id: 'banner-1',
    title: 'Razer BlackWidow V4 Pro',
    specs: 'Green Switches · Per-key RGB · Wireless',
    price: 4490000,
    order: 1,
    isVisible: true,
  },
  {
    id: 'banner-2',
    title: 'ASUS ROG Zephyrus G16',
    specs: 'RTX 4080 · 240Hz OLED · 16" · 14 cores',
    price: 54990000,
    order: 2,
    isVisible: true,
  },
  {
    id: 'banner-3',
    title: 'Logitech G Pro X Superlight 2',
    specs: 'HERO 25K · 60g · Wireless · LIGHTFORCE',
    price: 2890000,
    order: 3,
    isVisible: false,
  },
]

export const INITIAL_QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  { id: 1, icon: 'Monitor', label: 'PC Gaming', url: '/category/pc-gaming', order: 1 },
  { id: 2, icon: 'Laptop', label: 'Laptop RTX 50', url: '/category/laptop-rtx-50', order: 2 },
  { id: 3, icon: 'Tv', label: 'Màn Hình 240Hz', url: '/category/monitor-240hz', order: 3 },
  { id: 4, icon: 'Keyboard', label: 'Bàn Phím Cơ', url: '/category/co-keyboard', order: 4 },
  { id: 5, icon: 'Headphones', label: 'Tai Nghe Gaming', url: '/category/gaming-headset', order: 5 },
]
