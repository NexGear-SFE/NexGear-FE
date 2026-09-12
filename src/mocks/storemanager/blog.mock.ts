import type { BlogPost } from '@/types/blog.type'

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Đánh giá ASUS ROG Zephyrus G16 2026 – RTX 5080, 240Hz OLED',
    tags: ['ASUS ROG', 'Laptop', 'RTX 5080'],
    category: 'Đánh giá phần cứng',
    author: 'Minh Khoa',
    publishedAt: '28/08/2026',
    updatedAt: '8/9/2026',
    readTime: '1 phút đọc',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1600&auto=format&fit=crop',
    summary: 'Siêu phẩm laptop gaming mỏng nhẹ cao cấp ASUS ROG Zephyrus G16 (2026) trang bị card đồ họa RTX 5080 thế hệ mới kết hợp màn hình ROG Nebula OLED 240Hz sắc nét.',
    content: `
ASUS ROG Zephyrus G16 2026 tiếp tục khẳng định vị thế dẫn đầu trong phân khúc laptop gaming mỏng nhẹ cao cấp. Với sự xuất hiện của card đồ họa NVIDIA GeForce RTX 5080 thế hệ mới, mẫu máy này không chỉ sở hữu hiệu năng xử lý đồ họa vượt trội mà còn duy trì thiết kế nhôm nguyên khối vô cùng tinh xảo và đẳng cấp.

## 1. Thiết kế CNC nguyên khối & Màn hình ROG Nebula OLED 240Hz

Zephyrus G16 2026 khoác lên mình lớp vỏ hợp kim nhôm cao cấp gia công CNC chính xác tuyệt đối. Dải đèn Slash Lighting ở mặt A tạo điểm nhấn cơ khí sắc nét và đậm chất công nghệ hiện đại. Điểm đáng tiền nhất chính là màn hình OLED 16 inch độ phân giải 2.5K cùng tần số quét 240Hz mượt mà, thời gian phản hồi siêu tốc 0.2ms và chuẩn màu 100% DCI-P3 chuyên nghiệp.

## 2. Thông số kỹ thuật nổi bật

- **Vi xử lý (CPU):** Intel Core Ultra 9 285H (thế hệ mới tích hợp NPU AI)
- **Card đồ họa (GPU):** NVIDIA GeForce RTX 5080 Laptop GPU 16GB GDDR7
- **Bộ nhớ RAM:** 32GB LPDDR5X-7467 MHz Dual Channel
- **Ổ cứng SSD:** 2TB PCIe 4.0 NVMe M.2 SSD
- **Màn hình:** 16.0" 2.5K (2560 x 1600) OLED 240Hz, 0.2ms, G-Sync, HDR True Black 500
- **Tản nhiệt:** Hệ thống tản nhiệt ROG Intelligent Cooling với keo tản nhiệt kim loại lỏng Liquid Metal & Vapor Chamber
- **Trọng lượng:** Chỉ 1.85 kg, độ mỏng 1.49 cm

## 3. Hiệu năng thực tế & Khả năng xử lý đồ họa RTX 5080

Trong các thử nghiệm thực tế với các tựa game AAA nặng nhất hiện nay như Black Myth: Wukong, Cyberpunk 2077 và Alan Wake 2 ở thiết lập đồ họa tối đa (Ray Tracing Max, DLSS 3.5/4), RTX 5080 mang lại tốc độ khung hình trung bình vượt mốc 110 FPS vô cùng mượt mà. Khả năng xử lý AI nâng cao giúp việc render video 4K hay dựng hình 3D trên Premiere Pro & Blender diễn ra cực kỳ nhanh chóng.

## 4. Tổng kết đánh giá

ASUS ROG Zephyrus G16 2026 là sự kết hợp hoàn hảo giữa hiệu năng của một chiếc máy trạm chuyên nghiệp và tính cơ động tối đa. Đây xứng đáng là lựa chọn hàng đầu cho các gamer đam mê công nghệ hàng đầu và creators đỉnh cao trong năm 2026.
    `.trim(),
  },
  {
    id: '2',
    title: 'Top 5 bàn phím cơ cho dân FPS 2026: So sánh chi tiết',
    tags: ['Bàn phím cơ', 'Gaming', 'FPS'],
    category: 'Đánh giá phần cứng',
    author: 'Thanh Hà',
    publishedAt: '25/08/2026',
    updatedAt: '01/09/2026',
    readTime: '3 phút đọc',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1600&auto=format&fit=crop',
    summary: 'Đánh giá chi tiết top 5 bàn phím cơ gaming tốc độ phản hồi cực cao trang bị Rapid Trigger tối ưu cho game thủ Valorant và CS2.',
    content: `
Trong thi đấu FPS đỉnh cao, từng miligiây phản hồi đều quyết định thắng bại. Bài viết này tổng hợp 5 mẫu bàn phím cơ từ Wooting, Razer, SteelSeries, ASUS ROG và Corsari trang bị công nghệ switch từ tính Rapid Trigger đáng mua nhất năm 2026.
    `.trim(),
  },
  {
    id: '3',
    title: 'NVIDIA RTX 50 Series chính thức ra mắt tại Việt Nam — Giá từ 15 triệu',
    tags: ['NVIDIA', 'RTX 50', 'GPU'],
    category: 'Tin tức game',
    author: 'Bảo Long',
    publishedAt: '20/08/2026',
    updatedAt: '22/08/2026',
    readTime: '2 phút đọc',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1600&auto=format&fit=crop',
    summary: 'NVIDIA vừa công bố chuỗi card đồ họa kiến trúc Blackwell RTX 5090, RTX 5080 và RTX 5070 với hiệu năng AI đột phá.',
    content: `
Sự kiện ra mắt toàn cầu của NVIDIA tại TP.HCM đã tạo nên sức hút lớn trong cộng đồng công nghệ Việt Nam với loạt card đồ họa RTX 50 Series trang bị bộ nhớ GDDR7 siêu tốc và công nghệ DLSS thế hệ mới.
    `.trim(),
  },
  {
    id: '4',
    title: 'Hướng dẫn chọn màn hình gaming 2026: 144Hz vs 240Hz vs 360Hz',
    tags: ['Màn hình', 'Hz', 'Gaming'],
    category: 'Hướng dẫn',
    author: 'Admin',
    publishedAt: null,
    updatedAt: '05/09/2026',
    readTime: '4 phút đọc',
    status: 'draft',
    coverImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1600&auto=format&fit=crop',
    summary: 'Phân tích điểm khác biệt giữa tần số quét 144Hz, 240Hz và 360Hz để lựa chọn màn hình phù hợp nhất với túi tiền.',
    content: `
Lựa chọn màn hình gaming phù hợp đòi hỏi người dùng cân nhắc giữa độ phân giải, tấm nền (OLED vs Fast IPS) và tần số quét cao.
    `.trim(),
  },
  {
    id: '5',
    title: 'Build PC gaming 20 triệu cực mạnh với RTX 5060 Ti',
    tags: ['PC Gaming', 'Build PC', 'RTX 5060'],
    category: 'Hướng dẫn',
    author: 'Minh Khoa',
    publishedAt: null,
    updatedAt: '07/09/2026',
    readTime: '5 phút đọc',
    status: 'draft',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    summary: 'Cấu hình chi tiết bộ PC gaming tầm trung cân tốt mọi tựa game ở độ phân giải 2K.',
    content: `
Hướng dẫn lựa chọn linh kiện tối ưu chi phí 20 triệu đồng cho cấu hình PC gaming thế hệ mới 2026.
    `.trim(),
  },
]
