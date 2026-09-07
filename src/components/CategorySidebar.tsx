import { useState, useRef } from 'react'
import { Laptop, Gamepad2, Monitor, Cpu, Package, HardDrive, Mic, Tv, ChevronRight } from 'lucide-react'
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

const CATEGORIES_DATA: CategoryItem[] = [
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
    id: 'pc',
    name: 'PC GVN',
    icon: Monitor,
    subgroups: [
      {
        title: 'Dòng PC GVN',
        items: ['GVN Gaming', 'GVN Workstation', 'GVN Mini PC', 'GVN Student / Office'],
      },
      {
        title: 'Cấu hình CPU',
        items: ['Intel Core i5-13400F', 'Intel Core i7-14700K', 'AMD Ryzen 5 7500F', 'AMD Ryzen 7 7800X3D'],
      },
      {
        title: 'Mức giá',
        items: ['Dưới 15 triệu', '15 – 25 triệu', '25 – 40 triệu', 'Trên 40 triệu'],
      },
      {
        title: 'Card đồ họa VGA',
        items: ['GTX 1650 / RTX 3050', 'RTX 4060 / 4060 Ti', 'RTX 4070 SUPER', 'RTX 4080 / 4090'],
      },
    ],
  },
  {
    id: 'components',
    name: 'Main, CPU, VGA',
    icon: Cpu,
    subgroups: [
      {
        title: 'Bo mạch chủ',
        items: ['Intel Z790 / B760', 'AMD X670 / B650', 'Mainboard ASUS ROG', 'Mainboard MSI MAG'],
      },
      {
        title: 'Bộ vi xử lý (CPU)',
        items: ['Intel Core i5 14th', 'Intel Core i7 / i9 14th', 'AMD Ryzen 5000 Series', 'AMD Ryzen 7000 / 9000'],
      },
      {
        title: 'Card màn hình (VGA)',
        items: ['NVIDIA GeForce RTX 40 Series', 'AMD Radeon RX 7000', 'ASUS ROG Strix VGA', 'GIGABYTE AORUS VGA'],
      },
    ],
  },
  {
    id: 'case-power-cooling',
    name: 'Case, Nguồn, Tản',
    icon: Package,
    subgroups: [
      {
        title: 'Vỏ máy tính (Case)',
        items: ['Case Bể cá (Glass)', 'Case Mid Tower', 'Case Full Tower', 'Case ITX Nhỏ gọn'],
      },
      {
        title: 'Nguồn (PSU)',
        items: ['550W – 650W', '750W – 850W Gold', '1000W+ PCIe 5.0', 'Corsair / ASUS ROG PSU'],
      },
      {
        title: 'Tản nhiệt',
        items: ['Tản nước AIO 240mm', 'Tản nước AIO 360mm', 'Tản khí CPU High Performance', 'Quạt Case RGB'],
      },
    ],
  },
  {
    id: 'storage-ram',
    name: 'Ổ cứng, RAM, Thẻ nhớ',
    icon: HardDrive,
    subgroups: [
      {
        title: 'SSD & HDD',
        items: ['SSD NVMe M.2 Gen4', 'SSD NVMe M.2 Gen5', 'SSD SATA 2.5"', 'HDD PC 2TB – 4TB'],
      },
      {
        title: 'Bộ nhớ RAM',
        items: ['RAM Desktop DDR4', 'RAM Desktop DDR5', 'RAM Laptop DDR4/DDR5', 'Bus 3200 / 5600 / 6000MHz'],
      },
      {
        title: 'Thương hiệu',
        items: ['Kingston', 'Corsair Vengeance', 'G.SKILL Trident Z', 'Samsung NVMe'],
      },
    ],
  },
  {
    id: 'audio-gear',
    name: 'Loa, Micro, Webcam',
    icon: Mic,
    subgroups: [
      {
        title: 'Tai nghe Gaming',
        items: ['Tai nghe Có dây', 'Tai nghe Không dây (Wireless)', 'Tai nghe 7.1 Surround', 'In-ear Gaming'],
      },
      {
        title: 'Micro & Speaker',
        items: ['Micro USB Streamer', 'Micro Condenser XLR', 'Loa vi tính 2.1 / Soundbar', 'Loa Bluetooth Gaming'],
      },
      {
        title: 'Webcam Stream',
        items: ['Webcam Full HD 1080p', 'Webcam 4K 60fps', 'Đèn Live Stream / Elgato'],
      },
    ],
  },
  {
    id: 'screen',
    name: 'Màn hình',
    icon: Tv,
    subgroups: [
      {
        title: 'Màn hình Gaming',
        items: ['144Hz – 180Hz Fast IPS', '240Hz – 360Hz Esports', 'Màn hình OLED / QD-OLED', 'Màn hình Cong (Curved)'],
      },
      {
        title: 'Kích thước',
        items: ['24 inch FHD', '27 inch 2K QHD', '32 inch UltraWide', '34 inch Curved QHD'],
      },
      {
        title: 'Thương hiệu',
        items: ['ASUS ROG / TUF Monitor', 'LG UltraGear', 'Samsung Odyssey', 'Dell UltraSharp'],
      },
    ],
  },
]

interface CategorySidebarProps {
  activeCategoryId?: string
  onSelectCategory?: (categoryId: string) => void
}

export const CategorySidebar = ({ activeCategoryId, onSelectCategory }: CategorySidebarProps) => {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnterItem = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setHoveredCategoryId(id)
  }

  const handleMouseLeaveContainer = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategoryId(null)
    }, 150)
  }

  const handleMouseEnterPopup = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const activeHoveredItem = CATEGORIES_DATA.find((cat) => cat.id === hoveredCategoryId)

  return (
    <div className="relative h-full" onMouseLeave={handleMouseLeaveContainer}>
      <aside className="bg-white border border-[#E0E0E0] rounded-[8px] overflow-hidden shadow-sm h-full flex flex-col justify-between">
        <div>
          {/* Header Title */}
          <div className="px-4 py-3 bg-white border-b border-[#F0F0F0] text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            Danh mục
          </div>

          {/* Category List */}
          <nav className="divide-y divide-[#F4F5F7]">
            {CATEGORIES_DATA.map((item) => {
              const Icon = item.icon
              const isActive = activeCategoryId === item.id || hoveredCategoryId === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => handleMouseEnterItem(item.id)}
                  onClick={() => {
                    onSelectCategory?.(item.id)
                    setHoveredCategoryId(null)
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-mechanical group cursor-pointer ${
                    isActive
                      ? 'bg-[#FEECEE]/60 text-[#E30019]'
                      : 'text-[#040004] hover:text-[#E30019] hover:bg-[#FEECEE]/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-mechanical ${
                        isActive ? 'text-[#E30019]' : 'text-gray-500 group-hover:text-[#E30019]'
                      }`}
                    />
                    <span className="font-medium text-xs tracking-tight truncate">{item.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-mechanical ${
                      isActive ? 'text-[#E30019]' : 'text-gray-400 group-hover:text-[#E30019]'
                    }`}
                  />
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Hover Subcategory Mega-menu Flyout Panel */}
      {activeHoveredItem && activeHoveredItem.subgroups && activeHoveredItem.subgroups.length > 0 && (
        <div
          onMouseEnter={handleMouseEnterPopup}
          onMouseLeave={handleMouseLeaveContainer}
          className="hidden lg:block absolute left-full top-0 ml-2 z-50 w-[580px] xl:w-[680px] bg-white border border-[#E0E0E0] rounded-[8px] p-6 shadow-xl animate-in fade-in duration-100"
        >
          {/* Subcategory Header */}
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-gray-100 relative">
            <div className="relative">
              <h3 className="font-bold text-lg text-[#040004] font-heading leading-none">
                {activeHoveredItem.name}
              </h3>
              <div className="absolute -bottom-3.5 left-0 w-10 h-0.5 bg-[#E30019]" />
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectCategory?.(activeHoveredItem.id)
                setHoveredCategoryId(null)
              }}
              className="text-xs font-semibold text-[#E30019] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subcategory Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {activeHoveredItem.subgroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-3">
                <h4 className="font-bold text-xs text-[#040004] tracking-tight border-b border-gray-100 pb-1.5 font-heading">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((subItem, iIdx) => (
                    <li key={iIdx}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCategory?.(activeHoveredItem.id)
                          setHoveredCategoryId(null)
                        }}
                        className="text-xs text-gray-600 hover:text-[#E30019] transition-mechanical cursor-pointer text-left block w-full hover:translate-x-0.5"
                      >
                        {subItem}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
