export interface ArticleItem {
  id: string
  title: string
  badge: string
  badgeColor: string
  readTime: string
  image: string
}

export const articles: ArticleItem[] = [
  {
    id: 'news-1',
    title: 'RTX 5090 Benchmark: Vua Mới Có Xứng Đáng Với Mức Giá Cực Cao?',
    badge: 'ĐÁNH GIÁ',
    badgeColor: 'bg-[#E30019]',
    readTime: '8 phút đọc',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'news-2',
    title: 'Build PC Gaming Tốt Nhất Dưới 20 Triệu – Danh Sách Linh Kiện Tương Thích 2025',
    badge: 'HƯỚNG DẪN',
    badgeColor: 'bg-[#00A859]',
    readTime: '12 phút đọc',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'news-3',
    title: 'AMD Zen 5 Chi Tiết Kiến Trúc Mới – IPC Tăng Đến 40% So Với Thế Hệ Trước',
    badge: 'TIN TỨC',
    badgeColor: 'bg-[#1E88E5]',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80',
  },
]
