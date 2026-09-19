import type { ProductDetail } from '@/types/customer/product.type'

export const MOCK_PRODUCT_DETAILS: Record<string, ProductDetail> = {
  // 1. Laptop Gaming ASUS ROG Strix G16 (id: laptop-1 or slug: laptop-gaming-asus-rog-strix-g16)
  'laptop-1': {
    productId: 'laptop-1',
    brand: 'ASUS',
    sku: 'ROG-STRIX-G16-2024',
    stockQuantity: 12,
    warrantyPeriod: '24 Tháng chính hãng ASUS Việt Nam',
    shippingInfo: 'Giao hàng hỏa tốc 2 giờ nội thành / Miễn phí vận chuyển toàn quốc',
    images: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
        alt: 'Laptop Gaming ASUS ROG Strix G16 Mặt trước',
      },
      {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
        alt: 'Laptop Gaming ASUS ROG Strix G16 Bàn phím RGB',
      },
      {
        id: 'img-3',
        url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
        alt: 'Laptop Gaming ASUS ROG Strix G16 Góc nghiêng',
      },
      {
        id: 'img-4',
        url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
        alt: 'Laptop Gaming ASUS ROG Strix G16 Đèn LED gầm',
      },
    ],
    highlights: [
      {
        title: 'Bảo hành chính hãng 24 tháng',
        description: 'Cam kết 100% sản phẩm phân phối chính hãng ASUS VN với gói bảo hành VIP tận nơi.',
      },
      {
        title: 'Đổi mới 1-đổi-1 trong 30 ngày',
        description: 'Nếu phát sinh lỗi phần cứng từ nhà sản xuất trong 30 ngày đầu tiên.',
      },
      {
        title: 'Hiệu năng đỉnh cao RTX 4060 8GB',
        description: 'Chiến mượt mà các tựa game AAA ở thiết lập Ultra Setting FHD/2K.',
      },
      {
        title: 'Tản nhiệt ROG Intelligent Cooling',
        description: 'Keo tản nhiệt kim loại lỏng Conductonaut Extreme giảm tới 15°C nhiệt độ CPU.',
      },
    ],
    variantGroups: [
      {
        id: 'ram',
        name: 'Dung lượng RAM',
        options: [
          { id: 'ram-16', label: '16GB DDR5 4800MHz', value: '16GB', price: 38990000, sku: 'ROG-STRIX-G16-16G' },
          { id: 'ram-32', label: '32GB DDR5 4800MHz (+1.500.000đ)', value: '32GB', price: 40490000, sku: 'ROG-STRIX-G16-32G' },
        ],
      },
      {
        id: 'ssd',
        name: 'Ổ cứng SSD NVMe',
        options: [
          { id: 'ssd-512', label: '512GB PCIe 4.0 SSD', value: '512GB', price: 38990000, sku: 'ROG-STRIX-G16-512G' },
          { id: 'ssd-1tb', label: '1TB PCIe 4.0 SSD (+1.200.000đ)', value: '1TB', price: 40190000, sku: 'ROG-STRIX-G16-1TB' },
        ],
      },
    ],
    descriptionSections: [
      {
        title: 'Chiến game đỉnh cao với Intel Core i7 Gen 13th & RTX 40 Series',
        content:
          'Laptop Gaming ASUS ROG Strix G16 mang trong mình sức mạnh vô địch với bộ vi xử lý Intel Core i7-13650HX 14 nhân 20 luồng, kết hợp cùng card đồ họa NVIDIA GeForce RTX 4060 8GB GDDR6 thế hệ mới. Kiến trúc Ada Lovelace cùng công nghệ DLSS 3 đem lại số khung hình vượt trội khi trải nghiệm các tựa game nặng như Cyberpunk 2077, Black Myth: Wukong hay Valorant.',
      },
      {
        title: 'Màn hình 16 inch ROG Nebula Display 165Hz chuẩn màu 100% sRGB',
        content:
          'Được trang bị màn hình 16 inch độ phân giải FHD+ (1920x1200) chuẩn tỉ lệ 16:10, ROG Strix G16 cho không gian hiển thị rộng rãi và sắc nét. Tần số quét 165Hz kết hợp công nghệ NVIDIA G-Sync loại bỏ hoàn toàn hiện tượng xé hình, mang lại ưu thế phản xạ tối đa cho các game thủ eSports.',
      },
      {
        title: 'Hệ thống tản nhiệt ba quạt vượt trội với Kim loại lỏng',
        content:
          'Hệ thống tản nhiệt ROG Intelligent Cooling được thiết kế lại toàn bộ với hệ thống tản nhiệt khe thoát gió xung quanh máy, sử dụng keo tản nhiệt kim loại lỏng Conductonaut Extreme trực tiếp trên chip xử lý CPU giúp giữ máy luôn mát mẻ ngay cả khi vắt kiệt công suất suốt nhiều giờ chơi game liên tục.',
      },
    ],
    specificationGroups: [
      {
        groupName: 'Bộ vi xử lý & Đồ họa',
        specs: [
          { label: 'CPU', value: 'Intel Core i7-13650HX (14 Cores, 20 Threads, up to 4.9GHz, 24MB Cache)' },
          { label: 'Card đồ họa (VGA)', value: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (ROG Boost: 2420MHz at 140W)' },
        ],
      },
      {
        groupName: 'Bộ nhớ & Lưu trữ',
        specs: [
          { label: 'Bộ nhớ RAM', value: '16GB (8GB x 2) DDR5 4800MHz (Hỗ trợ nâng cấp tối đa 64GB)' },
          { label: 'Ổ cứng SSD', value: '512GB PCIe 4.0 NVMe M.2 SSD (Có 2 khe cắm M.2 SSD)' },
        ],
      },
      {
        groupName: 'Màn hình & Âm thanh',
        specs: [
          { label: 'Kích thước màn hình', value: '16.0 inch FHD+ (1920 x 1200) 16:10, 165Hz, IPS-level, 100% sRGB, G-Sync' },
          { label: 'Công nghệ âm thanh', value: 'Dolby Atmos, Hi-Res Audio, Smart Amp Technology, 2 Loa Stereo' },
        ],
      },
      {
        groupName: 'Kết nối & Pin',
        specs: [
          { label: 'Cổng giao tiếp', value: '1x Thunderbolt 4, 1x USB-C 3.2 Gen 2 (DisplayPort/PD), 2x USB-A 3.2 Gen 2, 1x HDMI 2.1, 1x RJ45 LAN' },
          { label: 'Kết nối không dây', value: 'Wi-Fi 6E (802.11ax) + Bluetooth 5.3 Tri-Band' },
          { label: 'Dung lượng Pin', value: '90WHrs, 4-cell Li-ion (Đi kèm củ sạc nhanh 280W)' },
          { label: 'Trọng lượng', value: '2.50 kg' },
        ],
      },
    ],
    ratingSummary: {
      average: 4.9,
      totalReviews: 28,
      distribution: { 5: 25, 4: 3, 3: 0, 2: 0, 1: 0 },
    },
    reviews: [
      {
        id: 'rev-1',
        customerName: 'Hoàng Nam eSports',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop',
        rating: 5,
        content: 'Máy cực kỳ trâu, tản nhiệt rất mát khi chơi Wukong cấu hình High. Màn hình 165Hz siêu mượt. Shop giao hàng hỏa tốc trong 1 tiếng rưỡi cực kỳ ưng ý!',
        date: '10/09/2026',
        verifiedPurchase: true,
      },
      {
        id: 'rev-2',
        customerName: 'Trần Minh Đức',
        rating: 5,
        content: 'Thiết kế đẹp ngầu đúng chất ROG, dải LED RGB xung quanh đáy máy lung linh ban đêm. Cấu hình i7-13650HX kết hợp RTX 4060 dư sức làm đồ họa 3D Render Premiere Pro.',
        date: '02/09/2026',
        verifiedPurchase: true,
      },
      {
        id: 'rev-3',
        customerName: 'Nguyễn Thanh Tùng',
        rating: 4,
        content: 'Máy build cứng cáp, bàn phím gõ êm nảy. Sạc 280W hơi nặng một chút nhưng đổi lại sạc cực nhanh 50% chỉ mất 30 phút.',
        date: '24/08/2026',
        verifiedPurchase: true,
      },
    ],
  },

  // 2. PC GVN Intel i5-12400F (id: pc-1 or slug: pc-gvn-intel-i5-12400f-rtx-3050)
  'pc-1': {
    productId: 'pc-1',
    brand: 'GVN Custom',
    sku: 'GVN-PC-I5-3050',
    stockQuantity: 8,
    warrantyPeriod: '36 Tháng chính hãng linh kiện',
    shippingInfo: 'Giao hàng & Lắp đặt tận nơi miễn phí nội thành TP.HCM & Hà Nội',
    images: [
      {
        id: 'img-p1',
        url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
        alt: 'Case PC GVN Intel i5-12400F Mặt kính cường lực',
      },
      {
        id: 'img-p2',
        url: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80',
        alt: 'Bên trong Case linh kiện PC GVN',
      },
      {
        id: 'img-p3',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        alt: 'Đèn LED RGB hệ thống PC GVN',
      },
    ],
    highlights: [
      {
        title: 'Bảo hành tận nơi 36 tháng',
        description: 'Hỗ trợ kỹ thuật tận nhà miễn phí trong suốt thời gian bảo hành.',
      },
      {
        title: 'Linh kiện chính hãng 100%',
        description: 'Tất cả vỏ case, mainboard, RAM, SSD đều có tem phân phối Việt Nam.',
      },
      {
        title: 'Cấu hình quốc dân Gaming',
        description: 'Kết hợp tối ưu giữa Intel i5-12400F và RTX 3050 6GB.',
      },
      {
        title: 'Tặng kèm Bộ phím chuột gaming',
        description: 'Tặng gói cài đặt Windows 11 bản quyền & vệ sinh máy định kỳ miễn phí.',
      },
    ],
    specificationGroups: [
      {
        groupName: 'Cấu hình chính',
        specs: [
          { label: 'CPU', value: 'Intel Core i5-12400F (6 Cores, 12 Threads, up to 4.4GHz, 18MB Cache)' },
          { label: 'Mainboard', value: 'ASUS PRIME H610M-K DDR4' },
          { label: 'RAM', value: 'KINGSTON FURY Beast 16GB (8GBx2) DDR4 3200MHz RGB' },
          { label: 'Card màn hình (VGA)', value: 'ASUS Dual GeForce RTX 3050 OC Edition 6GB GDDR6' },
          { label: 'Ổ cứng SSD', value: '512GB NVMe M.2 PCIe Gen3x4' },
          { label: 'Nguồn (PSU)', value: 'Deepcool PF550 550W 80 Plus EU' },
          { label: 'Case', value: 'Case Xigmatek Gaming X 3FX (Sẵn 3 Quạt ARGB)' },
        ],
      },
    ],
    descriptionSections: [
      {
        title: 'Cấu hình PC Gaming phổ thông xuất sắc nhất tầm giá 17 triệu',
        content:
          'Bộ máy PC GVN Intel i5-12400F được xây dựng tối ưu cho các bạn sinh viên và game thủ muốn sở hữu bộ máy chiến game mượt mà ở độ phân giải Full HD 1080p. Với CPU Intel Core i5-12400F 6 nhân 12 luồng cùng VGA RTX 3050 6GB, bạn thỏa sức tham gia các trận chiến Valorant, CS2, League of Legends ở mức FPS cao ổn định.',
      },
    ],
    ratingSummary: {
      average: 4.8,
      totalReviews: 14,
      distribution: { 5: 12, 4: 2, 3: 0, 2: 0, 1: 0 },
    },
    reviews: [
      {
        id: 'rev-p1',
        customerName: 'Lê Văn Hoàng',
        rating: 5,
        content: 'Hàng đóng gói siêu chắc chắn. Nhân viên giao tận nhà đi dây nguồn cực kỳ gọn đẹp thẩm mỹ. Test chơi FC Online với Valorant 200fps ngon lành.',
        date: '01/09/2026',
        verifiedPurchase: true,
      },
    ],
  },

  // 3. Bàn phím cơ Akko 3098B (id: gear-2 or slug: ban-phim-co-akko-3098b)
  'gear-2': {
    productId: 'gear-2',
    brand: 'AKKO',
    sku: 'AKKO-3098B-PINK',
    stockQuantity: 20,
    warrantyPeriod: '12 Tháng chính hãng AKKO Việt Nam',
    shippingInfo: 'Giao hàng hỏa tốc trong ngày',
    images: [
      {
        id: 'img-g1',
        url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
        alt: 'Bàn phím cơ AKKO 3098B Multi-modes',
      },
      {
        id: 'img-g2',
        url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80',
        alt: 'Keycaps PBT Double-shot AKKO',
      },
    ],
    highlights: [
      {
        title: 'Kết nối 3 chế độ Multi-modes',
        description: 'Hỗ trợ Bluetooth 5.0, Wireless 2.4GHz và dây cắm USB Type-C tháo rời.',
      },
      {
        title: 'Keycap PBT Double-Shot bền bỉ',
        description: 'Chống bám vân tay, ký tự in sắc nét không bao giờ phai mờ.',
      },
      {
        title: 'Switch AKKO CS Jelly Pink Hotswap',
        description: 'Cảm giác gõ linear cực kỳ êm ái, hỗ trợ Hotswap 5 pin thay switch dễ dàng.',
      },
    ],
    variantGroups: [
      {
        id: 'switch',
        name: 'Loại Switch',
        options: [
          { id: 'sw-pink', label: 'AKKO CS Jelly Pink (Linear êm)', value: 'Jelly Pink', price: 2450000 },
          { id: 'sw-purple', label: 'AKKO CS Jelly Purple (Tactile)', value: 'Jelly Purple', price: 2450000 },
        ],
      },
    ],
    specificationGroups: [
      {
        groupName: 'Thông số bàn phím',
        specs: [
          { label: 'Layout', value: '98 phím (Có cụm phím số Numpad tiện lợi)' },
          { label: 'Kết nối', value: 'Bluetooth 5.0 / 2.4GHz / USB Type-C' },
          { label: 'Keycap', value: 'PBT Double-Shot, ASA Profile' },
          { label: 'Đèn LED', value: 'RGB 16.8 triệu màu với nhiều chế độ nháy' },
          { label: 'Dung lượng Pin', value: '3000mAh (Thời gian dùng lên đến 200 giờ)' },
        ],
      },
    ],
    descriptionSections: [
      {
        title: 'Layout 98 phím gọn gàng tiện lợi làm việc & chơi game',
        content:
          'Bàn phím cơ AKKO 3098B sở hữu thiết kế 98 phím thông minh tiết kiệm diện tích bàn học nhưng vẫn giữ nguyên cụm phím số Numpad vô cùng tiện lợi cho công việc nhập liệu văn phòng.',
      },
    ],
    ratingSummary: {
      average: 5.0,
      totalReviews: 8,
      distribution: { 5: 8, 4: 0, 3: 0, 2: 0, 1: 0 },
    },
    reviews: [
      {
        id: 'rev-g1',
        customerName: 'Phạm Thu Thảo',
        rating: 5,
        content: 'Phím gõ êm sướng tay lắm mọi người ơi, màu sơn sắc nét gõ nảy tưng tưng. Pin dùng cả tuần chưa thấy hết.',
        date: '05/09/2026',
        verifiedPurchase: true,
      },
    ],
  },

  // 4. Tai nghe HyperX Cloud III (id: gear-4 or slug: tai-nghe-hyperx-cloud-iii-wireless)
  'gear-4': {
    productId: 'gear-4',
    brand: 'HyperX',
    sku: 'HYPERX-CLOUD3-WL',
    stockQuantity: 15,
    warrantyPeriod: '24 Tháng chính hãng HP/HyperX',
    shippingInfo: 'Giao hàng hỏa tốc trong 2 giờ',
    images: [
      {
        id: 'img-h1',
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Tai nghe HyperX Cloud III Wireless',
      },
      {
        id: 'img-h2',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
        alt: 'Đệm tai giả da cao cấp HyperX',
      },
    ],
    highlights: [
      {
        title: 'Thời lượng Pin kỷ lục 120 giờ',
        description: 'Thoải mái chơi game suốt hàng tuần liền mà không lo hết pin giữa chừng.',
      },
      {
        title: 'Driver vắt góc 53mm định hướng',
        description: 'Tái tạo âm thanh vòm 3D sống động, nghe rõ từng tiếng chân địch trong FPS.',
      },
    ],
    specificationGroups: [
      {
        groupName: 'Thông số âm thanh',
        specs: [
          { label: 'Driver', value: 'Dynamic 53mm với nam châm Ne neodymium' },
          { label: 'Tần số đáp ứng', value: '10Hz – 21.000Hz' },
          { label: 'Kết nối', value: 'Wireless 2.4GHz không dây cực thấp độ trễ' },
          { label: 'Trọng lượng', value: '310g (Kèm micro lọc ồn tháo rời)' },
        ],
      },
    ],
    descriptionSections: [
      {
        title: 'Huyền thoại tai nghe Gaming trở lại với phiên bản Wireless 120 giờ pin',
        content:
          'HyperX Cloud III Wireless là sự nối tiếp hoàn hảo của dòng tai nghe gaming bán chạy nhất thế giới Cloud II. Đệm tai bằng mút ghi nhớ đặc trưng bọc giả da cao cấp mang lại sự thoải mái êm ái khi đeo cả ngày dài.',
      },
    ],
    ratingSummary: {
      average: 4.7,
      totalReviews: 10,
      distribution: { 5: 8, 4: 2, 3: 0, 2: 0, 1: 0 },
    },
    reviews: [
      {
        id: 'rev-h1',
        customerName: 'Vũ Quốc Anh',
        rating: 5,
        content: 'Đeo lâu không hề đau tai, nghe footstep trong Valorant cực kỳ chuẩn hướng. Pin trâu dùng cả chục ngày mới sạc lại 1 lần.',
        date: '08/09/2026',
        verifiedPurchase: true,
      },
    ],
  },
}

// Fallback generator for any product without explicit detail mapping
export const generateFallbackProductDetail = (productId: string, productName: string, productCategory: string, sku: string): ProductDetail => {
  return {
    productId,
    brand: productName.split(' ')[0] || 'NexGear',
    sku: sku || `SKU-${productId.toUpperCase()}`,
    stockQuantity: 10,
    warrantyPeriod: '24 Tháng chính hãng',
    shippingInfo: 'Giao hàng hỏa tốc 2 giờ nội thành / Giao hàng toàn quốc miễn phí',
    images: [
      {
        id: 'fallback-img-1',
        url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
        alt: productName,
      },
      {
        id: 'fallback-img-2',
        url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
        alt: `${productName} Góc nghiêng`,
      },
    ],
    highlights: [
      {
        title: 'Bảo hành chính hãng 24 tháng',
        description: 'Cam kết 100% sản phẩm phân phối chính hãng có tem niêm phong đầy đủ.',
      },
      {
        title: 'Đổi mới 1-đổi-1 trong 30 ngày',
        description: 'Nếu phát sinh lỗi phần cứng từ nhà sản xuất.',
      },
      {
        title: 'Hỗ trợ kỹ thuật 24/7',
        description: 'Đội ngũ kỹ thuật viên NexGear luôn sẵn sàng tư vấn & giải đáp.',
      },
    ],
    descriptionSections: [
      {
        title: `Giới thiệu ${productName}`,
        content: `${productName} là sản phẩm ${productCategory.toUpperCase()} chất lượng cao được thiết kế nhằm đáp ứng tối đa nhu cầu công việc và giải trí đỉnh cao. Đạt tiêu chuẩn kiểm định nghiêm ngặt mang lại độ bền bỉ và hiệu năng ổn định.`,
      },
      {
        title: 'Thiết kế hiện đại & Hiệu năng tối ưu',
        content: 'Thiết kế tinh tế với vật liệu cao cấp, độ hoàn thiện sắc nét giúp tôn lên vẻ đẹp hiện đại cho góc làm việc và gaming của bạn.',
      },
    ],
    specificationGroups: [
      {
        groupName: 'Thông số kỹ thuật chung',
        specs: [
          { label: 'Tên sản phẩm', value: productName },
          { label: 'Thương hiệu', value: productName.split(' ')[0] || 'NexGear' },
          { label: 'Mã hiệu (SKU)', value: sku || `SKU-${productId.toUpperCase()}` },
          { label: 'Bảo hành', value: '24 Tháng' },
        ],
      },
    ],
    ratingSummary: {
      average: 4.8,
      totalReviews: 12,
      distribution: { 5: 10, 4: 2, 3: 0, 2: 0, 1: 0 },
    },
    reviews: [
      {
        id: 'fallback-rev-1',
        customerName: 'Khách hàng NexGear',
        rating: 5,
        content: 'Sản phẩm giao hàng nhanh, đúng mô tả, đóng gói rất cẩn thận!',
        date: '12/09/2026',
        verifiedPurchase: true,
      },
    ],
  }
}
