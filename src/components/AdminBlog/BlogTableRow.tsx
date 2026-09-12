import type { BlogPost } from '@/types/blog.type'
import { FileText, Pencil, Trash2 } from 'lucide-react'

interface BlogTableRowProps {
  post: BlogPost
  onEdit: (post: BlogPost) => void
  onDelete: (id: string) => void
}

export const BlogTableRow = ({ post, onEdit, onDelete }: BlogTableRowProps) => {
  const isPublished = post.status === 'published'

  return (
    <tr className="hover:bg-slate-50/80 transition-mechanical border-b border-[#E0E0E0] last:border-b-0">
      {/* Cột Tiêu đề */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          {/* Thumbnail Placeholder */}
          <div className="w-12 h-9 bg-slate-200 rounded-[4px] shrink-0 flex items-center justify-center text-slate-400">
            <FileText className="w-5 h-5" />
          </div>
          {/* Content Title & Tags */}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-[#040004] leading-snug line-clamp-1">
              {post.title}
            </span>
            <div className="text-xs text-[#636363] mt-0.5 flex items-center gap-1 flex-wrap">
              {post.tags.map((tag, idx) => (
                <span key={tag} className="inline-flex items-center">
                  {idx > 0 && <span className="mr-1 text-slate-300">•</span>}
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </td>

      {/* Cột Chuyên mục */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className="inline-block border border-slate-200 bg-slate-50 text-slate-700 px-3 py-1 rounded text-xs font-medium">
          {post.category}
        </span>
      </td>

      {/* Cột Tác giả */}
      <td className="py-3.5 px-4 whitespace-nowrap text-sm text-[#040004]">
        {post.author}
      </td>

      {/* Cột Ngày đăng */}
      <td className="py-3.5 px-4 whitespace-nowrap text-sm text-[#636363]">
        {post.publishedAt ?? '—'}
      </td>

      {/* Cột Trạng thái & Thao tác */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <div className="flex items-center justify-between gap-3">
          {/* Status Pill */}
          {isPublished ? (
            <span className="bg-[#E6F7ED] text-[#00A859] rounded-full px-3 py-0.5 text-xs font-medium inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              Xuất bản
            </span>
          ) : (
            <span className="bg-slate-100 text-slate-600 rounded-full px-3 py-0.5 text-xs font-medium inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Bản nháp
            </span>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(post)}
              title="Chỉnh sửa bài viết"
              aria-label={`Chỉnh sửa ${post.title}`}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-mechanical cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(post.id)}
              title="Xóa bài viết"
              aria-label={`Xóa ${post.title}`}
              className="p-1.5 text-[#E30019] hover:text-[#B30014] hover:bg-red-50 rounded transition-mechanical cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  )
}
