import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, Clock, ChevronLeft, Share2, Tag, ArrowRight } from 'lucide-react'
import { INITIAL_BLOG_POSTS } from '@/constants/blog.mock'

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Lấy bài viết từ mock data hoặc mặc định bài đầu tiên (id === '1')
  const post = INITIAL_BLOG_POSTS.find((p) => p.id === id) || INITIAL_BLOG_POSTS[0]

  // Hero image fallback
  const heroImage =
    post.coverImage ||
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1600&auto=format&fit=crop'

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(() => {
        // Ignored
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Đã chép liên kết bài viết vào bộ nhớ tạm!')
    }
  }

  return (
    <div className="bg-[#F4F5F7] min-h-screen py-6 md:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation & Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between mb-6">
          <ol className="flex items-center gap-2 text-xs md:text-sm text-[#636363]">
            <li>
              <Link to="/" className="hover:text-[#E30019] transition-colors">
                Trang chủ
              </Link>
            </li>
            <span>/</span>
            <li>
              <Link to="/blog" className="hover:text-[#E30019] transition-colors">
                Blog
              </Link>
            </li>
            <span>/</span>
            <li className="text-[#040004] font-medium truncate max-w-[200px] md:max-w-xs">
              {post.category}
            </li>
          </ol>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#636363] hover:text-[#E30019] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Tất cả bài viết</span>
          </Link>
        </nav>

        {/* Main Article Container */}
        <article className="bg-white rounded-2xl shadow-sm border border-[#E0E0E0] p-5 sm:p-8 md:p-10 overflow-hidden">
          {/* 3.1 Hero Cover Image */}
          <div className="relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden shadow-sm bg-slate-900 group">
            <img
              src={heroImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>

          {/* 3.2 Tiêu đề bài viết */}
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[#040004] leading-snug mt-6 mb-3">
            {post.title}
          </h1>

          {/* 3.3 Dòng Thông tin Metadata */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-1.5 text-xs md:text-sm text-[#636363] font-body">
            {/* Chuyên mục Badge */}
            <span className="bg-[#E30019] text-white font-semibold px-2.5 py-0.5 rounded-full text-xs mr-1 shadow-sm">
              {post.category}
            </span>

            {/* Ngày cập nhật */}
            <div className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#636363]" />
              <span>Ngày cập nhật: {post.updatedAt || post.publishedAt || '8/9/2026'}</span>
            </div>

            <span className="text-[#636363] select-none">•</span>

            {/* Tác giả */}
            <div className="inline-flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#636363]" />
              <span>{post.author}</span>
            </div>

            <span className="text-[#636363] select-none">•</span>

            {/* Thời gian đọc */}
            <div className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#636363]" />
              <span>{post.readTime || '1 phút đọc'}</span>
            </div>
          </div>

          {/* 3.4 Đường phân cách & Khối Thẻ (Tags Section) */}
          <div className="border-t border-[#E0E0E0] my-5" />

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs font-semibold tracking-wider text-[#636363] uppercase mr-1 inline-flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                THẺ
              </span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs px-3 py-1 rounded transition-colors cursor-pointer font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#636363] hover:text-[#E30019] transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded"
              title="Chia sẻ bài viết"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ</span>
            </button>
          </div>

          {/* 3.5 Nội dung bài viết mẫu (Article Body Placeholder) */}
          <div className="mt-8 pt-4 border-t border-[#E0E0E0]/60 font-body text-[#040004]">
            {/* Đoạn mở đầu (Lead paragraph) */}
            <p className="text-base md:text-lg text-slate-700 leading-relaxed my-4 font-medium italic bg-slate-50 p-4 rounded-xl border-l-4 border-[#E30019]">
              {post.summary ||
                'ASUS ROG Zephyrus G16 (2026) tiếp tục khẳng định vị thế dẫn đầu trong phân khúc laptop gaming mỏng nhẹ cao cấp. Với sự kết hợp giữa card đồ họa NVIDIA GeForce RTX 5080 và màn hình ROG Nebula OLED 240Hz, chiếc laptop này hứa hẹn đem lại trải nghiệm gaming chuẩn mực mới.'}
            </p>

            {/* Nội dung chính chi tiết */}
            <div className="space-y-6 text-slate-800 leading-relaxed text-sm md:text-base">
              <p>
                Tiếp nối sự thành công rực rỡ của các thế hệ trước, phiên bản 2026 của dòng sản phẩm{' '}
                <strong>ASUS ROG Zephyrus G16</strong> mang tới một bước tiến vượt bậc cả về phong cách thiết kế lẫn kiến trúc vi xử lý đồ họa mới nhất. Không chỉ phục vụ hoàn hảo cho các game thủ eSports đòi hỏi tốc độ phản hồi tính bằng miligiây, máy còn đáp ứng trọn vẹn nhu cầu đồ họa kỹ thuật khắt khe của các nhà sáng tạo nội dung (Content Creators).
              </p>

              {/* Heading 2 phụ */}
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#040004] mt-8 mb-4 border-l-4 border-[#E30019] pl-3 py-0.5">
                1. Thiết kế CNC nguyên khối & Dải đèn Slash Lighting thế hệ mới
              </h2>
              <p>
                Toàn bộ phần khung vỏ của Zephyrus G16 2026 được gia công chính xác từ một khối hợp kim nhôm cao cấp thông qua công nghệ cắt CNC hiện đại. Thiết kế này vừa đem đến sự chắc chắn vượt trội vừa giữ cho máy độ mỏng cực kỳ ấn tượng chỉ 1.49 cm cùng trọng lượng khiêm tốn 1.85 kg.
              </p>
              <p>
                Điểm nhấn thương hiệu ở mặt lưng A là dải đèn LED <em>Slash Lighting</em> tùy biến nhiều hiệu ứng ánh sáng động tinh tế, vừa tạo phong cách đậm chất cơ khí viễn tưởng mà vẫn vô cùng sang trọng khi xuất hiện trong môi trường văn phòng hay hội thảo.
              </p>

              {/* Heading 2 phụ */}
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#040004] mt-8 mb-4 border-l-4 border-[#E30019] pl-3 py-0.5">
                2. Màn hình ROG Nebula OLED 2.5K 240Hz siêu sắc nét
              </h2>
              <p>
                Màn hình là một trong những thành phần đắt giá nhất trên phiên bản Zephyrus G16 2026. Tấm nền OLED kích thước 16 inch sở hữu độ phân giải 2.5K (2560 x 1600) với tỷ lệ vàng 16:10 cho không gian hiển thị rộng rãi. Tần số quét 240Hz kết hợp thời gian phản hồi siêu tốc 0.2ms loại bỏ hoàn toàn hiện tượng bóng ma hay xé hình trong các pha giao tranh tốc độ cao.
              </p>

              {/* Bảng / Danh sách thông số nổi bật */}
              <div className="my-6 bg-slate-900 text-white rounded-xl p-5 md:p-6 shadow-md">
                <h3 className="font-heading font-semibold text-base md:text-lg text-[#E30019] mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E30019]" />
                  Thông số kỹ thuật phần cứng nổi bật
                </h3>
                <ul className="space-y-2.5 text-xs md:text-sm text-slate-200">
                  <li className="flex items-start justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-medium">Vi xử lý (CPU):</span>
                    <span className="font-semibold text-right">Intel Core Ultra 9 285H (Tích hợp AI NPU)</span>
                  </li>
                  <li className="flex items-start justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-medium">Card đồ họa (GPU):</span>
                    <span className="font-semibold text-right text-emerald-400">NVIDIA GeForce RTX 5080 16GB GDDR7</span>
                  </li>
                  <li className="flex items-start justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-medium">Bộ nhớ RAM:</span>
                    <span className="font-semibold text-right">32GB LPDDR5X-7467 MHz Dual Channel</span>
                  </li>
                  <li className="flex items-start justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-medium">Lưu trữ SSD:</span>
                    <span className="font-semibold text-right">2TB PCIe 4.0 NVMe M.2 SSD</span>
                  </li>
                  <li className="flex items-start justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-medium">Màn hình:</span>
                    <span className="font-semibold text-right">16" 2.5K OLED 240Hz, 0.2ms, 100% DCI-P3</span>
                  </li>
                  <li className="flex items-start justify-between">
                    <span className="text-slate-400 font-medium">Trọng lượng & Mỏng:</span>
                    <span className="font-semibold text-right">1.85 kg | 1.49 cm</span>
                  </li>
                </ul>
              </div>

              {/* Heading 2 phụ */}
              <h2 className="font-heading font-bold text-xl md:text-2xl text-[#040004] mt-8 mb-4 border-l-4 border-[#E30019] pl-3 py-0.5">
                3. Hiệu năng đỉnh cao với NVIDIA GeForce RTX 5080
              </h2>
              <p>
                Sức mạnh từ card đồ họa RTX 5080 giúp Zephyrus G16 dễ dàng chinh phục mọi tựa game bom tấn ở mức đồ họa cao nhất. Công nghệ DLSS 3.5 kết hợp Ray Reconstruction thế hệ mới mang lại hình ảnh sống động chân thực mà vẫn giữ cho mức FPS luôn ổn định trên mốc 120 FPS.
              </p>

              {/* Heading 3 phụ */}
              <h3 className="font-heading font-semibold text-lg md:text-xl text-[#040004] mt-6 mb-3">
                Hệ thống tản nhiệt ROG Intelligent Cooling 3 quạt
              </h3>
              <p>
                Để duy trì hiệu năng ổn định liên tục, ASUS đã trang bị buồng hơi Vapor Chamber diện tích lớn cùng keo tản nhiệt kim loại lỏng (Liquid Metal) thế hệ thứ 2 cho cả CPU và GPU. 3 quạt Arc Flow Fans giúp luồng gió lưu thông liên tục mà không gây ra tiếng ồn khó chịu.
              </p>

              {/* Kết luận */}
              <div className="mt-8 p-5 bg-red-50 border border-red-100 rounded-xl">
                <h3 className="font-heading font-bold text-lg text-[#E30019] mb-2">
                  Tổng kết & Kết luận
                </h3>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                  ASUS ROG Zephyrus G16 2026 là chiếc laptop gaming hoàn hảo dành cho những ai tìm kiếm sự cân bằng tuyệt đối giữa sức mạnh phần cứng vô địch và tính cơ động mỏng nhẹ đẳng cấp.
                </p>
              </div>
            </div>
          </div>

          {/* Footer of Article: Navigation & Actions */}
          <div className="mt-10 pt-6 border-t border-[#E0E0E0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E0E0E0] text-sm font-semibold text-[#040004] hover:border-[#E30019] hover:text-[#E30019] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Xem bài viết khác
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#636363] font-medium">Bạn thấy bài viết này hữu ích?</span>
              <button
                type="button"
                onClick={handleShare}
                className="bg-[#E30019] hover:bg-[#B30014] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-mechanical inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                Chia sẻ ngay
              </button>
            </div>
          </div>
        </article>

        {/* Next Articles / Related Posts Section */}
        <section className="mt-10">
          <h2 className="font-heading font-bold text-xl text-[#040004] mb-5 flex items-center justify-between">
            <span>Bài viết liên quan</span>
            <Link to="/blog" className="text-xs text-[#E30019] hover:underline inline-flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INITIAL_BLOG_POSTS.filter((p) => p.id !== post.id && p.status === 'published')
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white border border-[#E0E0E0] hover:border-[#E30019] rounded-xl p-4 flex gap-4 transition-all hover:shadow-md group"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={
                        relatedPost.coverImage ||
                        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop'
                      }
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <span className="text-[10px] font-semibold bg-red-50 text-[#E30019] px-2 py-0.5 rounded-full inline-block mb-1">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-heading font-semibold text-xs sm:text-sm text-[#040004] group-hover:text-[#E30019] line-clamp-2 transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                    <div className="text-[11px] text-[#636363] flex items-center gap-2 mt-2">
                      <span>{relatedPost.author}</span>
                      <span>•</span>
                      <span>{relatedPost.publishedAt}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
