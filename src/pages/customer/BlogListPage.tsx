import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'
import { INITIAL_BLOG_POSTS } from '@/mocks/storemanager/blog.mock'

export const BlogListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả')

  // Lấy các danh mục unique
  const categories = ['Tất cả', ...Array.from(new Set(INITIAL_BLOG_POSTS.map((p) => p.category)))]

  // Lọc danh sách bài viết đã xuất bản
  const publishedPosts = INITIAL_BLOG_POSTS.filter(
    (p) => p.status === 'published' && (selectedCategory === 'Tất cả' || p.category === selectedCategory)
  )

  const featuredPost = INITIAL_BLOG_POSTS.find((p) => p.id === '1') || publishedPosts[0]

  return (
    <div className="bg-[#F4F5F7] min-h-screen py-8 md:py-12 font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header section */}
        <div className="mb-8 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E30019] bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Góc Công Nghệ NexGear
          </span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#040004] mt-3 mb-2">
            Tin Tức & Đánh Giá Phần Cứng
          </h1>
          <p className="text-sm md:text-base text-[#636363] max-w-2xl">
            Cập nhật những tin tức mới nhất về thiết bị gaming, hướng dẫn chọn linh kiện và bài đánh giá chi tiết từ chuyên gia NexGear.
          </p>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="mb-12 bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 aspect-video lg:aspect-auto overflow-hidden bg-slate-900 relative">
                <img
                  src={
                    featuredPost.coverImage ||
                    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1600&auto=format&fit=crop'
                  }
                  alt={featuredPost.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#E30019] text-white font-semibold text-xs px-3 py-1 rounded-full shadow">
                  Nổi bật
                </span>
              </div>
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#636363] mb-3">
                    <span className="font-semibold text-[#E30019]">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.publishedAt}</span>
                  </div>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-[#040004] leading-snug mb-3 hover:text-[#E30019] transition-colors">
                    <Link to={`/blogs/${featuredPost.id}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="text-xs md:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {featuredPost.summary}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {featuredPost.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blogs/${featuredPost.id}`}
                    className="btn-primary w-full sm:w-auto text-xs md:text-sm inline-flex items-center justify-center gap-2"
                  >
                    Đọc bài viết chi tiết <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${selectedCategory === cat
                  ? 'bg-[#E30019] text-white shadow-sm'
                  : 'bg-white text-[#636363] hover:text-[#040004] border border-[#E0E0E0]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden shadow-sm hover:shadow-md hover:border-[#E30019] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={
                      post.coverImage ||
                      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop'
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#E30019] text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#636363] mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base md:text-lg text-[#040004] group-hover:text-[#E30019] transition-colors line-clamp-2 mb-2">
                    <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-[#636363]">
                  <Clock className="w-3.5 h-3.5 text-[#636363]" />
                  <span>{post.readTime || '1 phút đọc'}</span>
                </div>
                <Link
                  to={`/blogs/${post.id}`}
                  className="text-xs font-semibold text-[#E30019] hover:underline inline-flex items-center gap-1"
                >
                  Chi tiết <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
