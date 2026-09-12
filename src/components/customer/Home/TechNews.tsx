import { Link } from 'react-router-dom'
import { ChevronRight, Clock, Play } from 'lucide-react'
import { articles, type ArticleItem } from '@/mocks/customer/news.mock'

export type { ArticleItem }

export const TechNews = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* 1. Left Section: Tin tức & Đánh giá (2 Columns) */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-heading text-[#040004]">
            Tin tức & Đánh giá
          </h2>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#E30019] hover:underline cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Articles List */}
        <div className="space-y-3">
          {articles.map((item) => (
            <Link
              key={item.id}
              to={`/blogs/${item.id}`}
              className="bg-white border border-[#E0E0E0] rounded-[8px] p-3 flex gap-4 items-center hover:border-[#E30019] transition-mechanical shadow-sm cursor-pointer group block"
            >
              {/* Thumbnail Image */}
              <div className="w-28 sm:w-36 h-20 bg-[#F4F5F7] rounded-[4px] overflow-hidden shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              {/* Content Details */}
              <div className="space-y-1.5 min-w-0 flex-1">
                <div>
                  <span className={`inline-block text-[10px] font-bold text-white px-2 py-0.5 rounded-[2px] uppercase tracking-wider ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#040004] group-hover:text-[#E30019] transition-mechanical leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Right Section: Video nổi bật (1 Column) */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-[#040004]">
          Video nổi bật
        </h2>

        <div
          onClick={() => alert('Mở xem Video Đánh Giá: RTX 4090 vs RX 7900 XTX')}
          className="bg-white border border-[#E0E0E0] rounded-[8px] overflow-hidden shadow-sm hover:border-[#E30019] transition-mechanical group cursor-pointer"
        >
          {/* Video Thumbnail Area with Centered Play Button */}
          <div className="relative aspect-video bg-[#040004] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
              alt="Video Đánh Giá RTX 4090 vs RX 7900 XTX"
              className="w-full h-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-14 h-14 bg-[#E30019] rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-200 group-hover:scale-110 border-2 border-white/80">
                <Play className="w-6 h-6 fill-white ml-1" />
              </div>
            </div>
          </div>

          {/* Video Info Area */}
          <div className="p-4 space-y-2">
            <span className="inline-block bg-[#E30019] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
              VIDEO ĐÁNH GIÁ
            </span>
            <h3 className="font-bold text-sm text-[#040004] group-hover:text-[#E30019] transition-mechanical leading-snug">
              RTX 4090 vs RX 7900 XTX – Đại Chiến Gaming 4K Toàn Diện
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>18 phút · 1,2 triệu lượt xem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
