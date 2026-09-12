import { Laptop, Gamepad2, Monitor, Cpu, Package, HardDrive, Mic, Tv } from 'lucide-react'
import type { ElementType } from 'react'

export interface SubcategoryGroup {
  title: string
  items: string[]
}

export interface CategoryItem {
  id: string
  name: string
  icon: ElementType
  subgroups?: SubcategoryGroup[]
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'laptop',
    name: 'Laptop',
    icon: Laptop,
    subgroups: [
      {
        title: 'Thương hiệu',
        items: ['ASUS', 'ACER', 'MSI', 'LENOVO', 'DELL', 'HP', 'LG Gram', 'Apple (MacBook)'],
      },
      {
        title: 'Giá bán',
        items: ['Dưới 15 triệu', 'Từ 15 – 20 triệu', 'Từ 20 – 25 triệu', 'Trên 25 triệu'],
      },
      {
        title: 'Nhu cầu sử dụng',
        items: ['Học sinh – Sinh viên', 'Văn phòng mỏng nhẹ', 'Đồ họa – Studio', 'Mỏng nhẹ cao cấp'],
      },
      {
        title: 'CPU',
        items: ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'AMD Ryzen'],
      },
    ],
  },
  {
    id: 'laptop-gaming',
    name: 'Laptop Gaming',
    icon: Gamepad2,
    subgroups: [
      {
        title: 'Thương hiệu',
        items: ['ASUS ROG / TUF', 'ACER Predator / Nitro', 'MSI Gaming', 'Lenovo Legion', 'Gigabyte Gaming'],
      },
      {
        title: 'Mức giá',
        items: ['Dưới 20 triệu', 'Từ 20 – 30 triệu', 'Từ 30 – 50 triệu', 'Trên 50 triệu'],
      },
      {
        title: 'Card đồ họa',
        items: ['RTX 4050 6GB', 'RTX 4060 8GB', 'RTX 4070 8GB', 'RTX 4080 / 4090'],
      },
      {
        title: 'Màn hình Gaming',
        items: ['144Hz / 165Hz', '240Hz / 360Hz', 'OLED Gaming', '2K / 4K QHD'],
      },
    ],
  },
  {
    id: 'pc-gvn',
    name: 'PC GVN',
    icon: Monitor,
    subgroups: [
      {
        title: 'Dòng PC GVN',
        items: ['GVN Gaming', 'GVN Workstation', 'GVN Mini iCafe', 'GVN Watercooling Custom'],
      },
      {
        title: 'Mức giá PC',
        items: ['Dưới 10 triệu', 'Từ 10 – 20 triệu', 'Từ 20 – 40 triệu', 'Trên 50 triệu'],
      },
      {
        title: 'Cấu hình Intel',
        items: ['Intel Core i3 Gen 12/13', 'Intel Core i5 Gen 13/14', 'Intel Core i7 Gen 14', 'Intel Core i9 14900KS'],
      },
      {
        title: 'Cấu hình AMD',
        items: ['AMD Ryzen 5 7600X', 'AMD Ryzen 7 7800X3D', 'AMD Ryzen 9 7950X3D', 'AMD Threadripper PRO'],
      },
    ],
  },
  {
    id: 'main-cpu-vga',
    name: 'Linh Kiện Máy Tính',
    icon: Cpu,
    subgroups: [
      {
        title: 'CPU - Bộ vi xử lý',
        items: ['Intel Core i5 / i7 / i9', 'AMD Ryzen 5 / 7 / 9'],
      },
      {
        title: 'VGA - Card màn hình',
        items: ['NVIDIA RTX 4060 / 4070', 'RTX 4080 SUPER / 4090', 'AMD Radeon RX 7800 XT'],
      },
      {
        title: 'Bo mạch chủ (Mainboard)',
        items: ['ASUS ROG / TUF', 'MSI MAG / MPG', 'Gigabyte AORUS'],
      },
      {
        title: 'RAM & Ô đĩa SSD',
        items: ['RAM DDR4 / DDR5 (RGB)', 'SSD NVMe Gen4 / Gen5 1TB-2TB'],
      },
    ],
  },
  {
    id: 'gear',
    name: 'Phụ Kiện & Gaming Gear',
    icon: Package,
    subgroups: [
      {
        title: 'Bàn phím cơ',
        items: ['Bàn phím không dây', 'Bàn phím Custom Hot-swap', 'Akko, Keychron, SteelSeries'],
      },
      {
        title: 'Chuột Gaming',
        items: ['Chuột siêu nhẹ < 60g', 'Chuột không dây Wireless', 'Logitech G, Razer, Pulsar'],
      },
      {
        title: 'Tai nghe Gaming',
        items: ['Tai nghe 7.1 Surround', 'Tai nghe Wireless Không dây', 'HyperX, Corsair, Logitech G'],
      },
      {
        title: 'Ghế & Bàn Gaming',
        items: ['Ghế Ergonomic công thái học', 'Ghế Gaming da PU / Mesh', 'Bàn Nâng Hạ Điện Tử'],
      },
    ],
  },
  {
    id: 'monitor',
    name: 'Màn Hình',
    icon: Tv,
    subgroups: [
      {
        title: 'Tần số quét',
        items: ['144Hz / 165Hz', '180Hz / 240Hz', '360Hz / 540Hz eSports'],
      },
      {
        title: 'Độ phân giải',
        items: ['FHD 1080p', '2K QHD 1440p', '4K UHD 2160p', 'Màn hình cong UltraWide'],
      },
      {
        title: 'Công nghệ Tấm nền',
        items: ['Fast IPS 1ms', 'OLED / QD-OLED', 'Mini-LED HDR1000'],
      },
      {
        title: 'Thương hiệu',
        items: ['ASUS ROG / TUF', 'Samsung Odyssey', 'LG UltraGear', 'BenQ ZOWIE'],
      },
    ],
  },
  {
    id: 'storage',
    name: 'Ổ Cứng & Nguồn (PSU)',
    icon: HardDrive,
    subgroups: [
      {
        title: 'Ổ cứng SSD / HDD',
        items: ['SSD M.2 NVMe PCIe 4.0', 'SSD M.2 NVMe PCIe 5.0', 'HDD Di động 1TB - 4TB'],
      },
      {
        title: 'Nguồn máy tính (PSU)',
        items: ['650W - 750W 80 Plus Gold', '850W - 1000W PCIe 5.0 ATX 3.0', '1200W - 1600W Titanium'],
      },
    ],
  },
  {
    id: 'stream',
    name: 'Thiết Bị Stream & Console',
    icon: Mic,
    subgroups: [
      {
        title: 'Micro & Soundcard',
        items: ['Micro USB Condenser', 'Micro XLR Chuyên Nghiệp', 'Elgato Wave 3 / Wave XLR'],
      },
      {
        title: 'Capture Card & Camera',
        items: ['Elgato Cam Link 4K', 'Webcam 4K 60fps Stream', 'Elgato Stream Deck MK.2'],
      },
    ],
  },
]
