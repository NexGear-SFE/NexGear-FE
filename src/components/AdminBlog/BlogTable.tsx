import type { BlogPost } from '@/types/blog.type'
import { BlogTableRow } from './BlogTableRow'
import { Newspaper } from 'lucide-react'

interface BlogTableProps {
  posts: BlogPost[]
  onEditPost: (post: BlogPost) => void
  onDeletePost: (id: string) => void
}

export const BlogTable = ({
  posts,
  onEditPost,
  onDeletePost,
}: BlogTableProps) => {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-md shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[768px]">
          <thead>
            <tr className="bg-slate-50/70 border-b border-[#E0E0E0] text-xs font-semibold text-[#636363] uppercase tracking-wider">
              <th className="py-3 px-4 w-[40%]">TIÊU ĐỀ</th>
              <th className="py-3 px-4 w-[18%]">CHUYÊN MỤC</th>
              <th className="py-3 px-4 w-[14%]">TÁC GIẢ</th>
              <th className="py-3 px-4 w-[13%]">NGÀY ĐĂNG</th>
              <th className="py-3 px-4 w-[15%]">TRẠNG THÁI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E0E0]">
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogTableRow
                  key={post.id}
                  post={post}
                  onEdit={onEditPost}
                  onDelete={onDeletePost}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Newspaper className="w-8 h-8 text-slate-300" />
                    <span className="text-sm font-medium text-[#636363]">
                      Không tìm thấy bài viết nào phù hợp.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
