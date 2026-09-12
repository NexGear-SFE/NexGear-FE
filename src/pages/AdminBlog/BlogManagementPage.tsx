import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import type { BlogPost, BlogFilterStatus, BlogStatus } from '@/types/blog.type'
import { INITIAL_BLOG_POSTS } from '@/mocks/blog.mock'
import { BLOG_STATUS, BLOG_FILTER_STATUS } from '@/constants/blog'
import { BlogFilterTabs } from '@/components/AdminBlog/BlogFilterTabs'
import { BlogTable } from '@/components/AdminBlog/BlogTable'
import { BlogEditorPage } from '@/pages/AdminBlog/BlogEditorPage'
import type { AdminLayoutContext, ViewMode } from '@/layouts/AdminLayout'
import { Plus, AlertTriangle } from 'lucide-react'

export const BlogManagementPage = () => {
  const context = useOutletContext<AdminLayoutContext | null>()

  // Internal state fallbacks if rendered outside AdminLayout context
  const [localViewMode, setLocalViewMode] = useState<ViewMode>('list')
  const [localEditingPost, setLocalEditingPost] = useState<BlogPost | null>(null)

  const viewMode = context ? context.viewMode : localViewMode
  const setViewMode = context ? context.setViewMode : setLocalViewMode
  const editingPost = context ? context.editingPost : localEditingPost
  const setEditingPost = context ? context.setEditingPost : setLocalEditingPost

  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS)
  const [filterStatus, setFilterStatus] = useState<BlogFilterStatus>(BLOG_FILTER_STATUS.ALL)

  // Delete modal state
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)

  // Calculated tab counts
  const counts = useMemo(() => {
    const published = posts.filter((p) => p.status === BLOG_STATUS.PUBLISHED).length
    const draft = posts.filter((p) => p.status === BLOG_STATUS.DRAFT).length
    return {
      all: posts.length,
      published,
      draft,
    }
  }, [posts])

  // Filtered posts array according to tab filter
  const filteredPosts = useMemo(() => {
    if (filterStatus === BLOG_FILTER_STATUS.PUBLISHED) {
      return posts.filter((p) => p.status === BLOG_STATUS.PUBLISHED)
    }
    if (filterStatus === BLOG_FILTER_STATUS.DRAFT) {
      return posts.filter((p) => p.status === BLOG_STATUS.DRAFT)
    }
    return posts
  }, [posts, filterStatus])

  // Handlers for Delete Modal
  const handleDeleteClick = (id: string) => {
    setDeletingPostId(id)
  }

  const confirmDelete = () => {
    if (deletingPostId) {
      setPosts((prev) => prev.filter((post) => post.id !== deletingPostId))
      setDeletingPostId(null)
    }
  }

  // Handlers for Create/Edit View Switching
  const handleOpenAddView = () => {
    setEditingPost(null)
    setViewMode('create')
  }

  const handleOpenEditView = (post: BlogPost) => {
    setEditingPost(post)
    setViewMode('edit')
  }

  // Save Blog Post Handler (Create or Update)
  const handleSaveBlog = (
    postData: Partial<BlogPost>,
    status: BlogStatus
  ) => {
    const todayStr = new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    if (editingPost) {
      // Update existing post
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? {
              ...p,
              ...postData,
              status,
              publishedAt:
                status === BLOG_STATUS.PUBLISHED ? p.publishedAt || todayStr : null,
            }
            : p
        )
      )
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: String(Date.now()),
        title: postData.title || 'Bài viết mới',
        category: postData.category || 'Đánh giá phần cứng',
        author: postData.author || 'Store Manager',
        tags: postData.tags || ['Gaming', 'Tech'],
        status,
        publishedAt: status === BLOG_STATUS.PUBLISHED ? todayStr : null,
      }
      setPosts((prev) => [newPost, ...prev])
    }

    setEditingPost(null)
    setViewMode('list')
  }

  // Render Full-page Editor View when viewMode is 'create' or 'edit'
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <BlogEditorPage
        mode={viewMode}
        initialPost={editingPost}
        onSave={handleSaveBlog}
        onCancel={() => {
          setEditingPost(null)
          setViewMode('list')
        }}
      />
    )
  }

  // Render Main Blog List View
  return (
    <div className="space-y-6">
      {/* 5.3 Khung Tiêu đề & Nút Thao tác */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#040004]">
            Blog & Tin tức
          </h1>
          <p className="text-sm text-[#636363] mt-1 font-body">
            {posts.length} bài viết
          </p>
        </div>

        {/* Primary CTA Button */}
        <button
          type="button"
          onClick={handleOpenAddView}
          className="btn-primary shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Bài viết mới</span>
        </button>
      </div>

      {/* 5.4 Bộ lọc Tabs (Filter Tabs) */}
      <BlogFilterTabs
        activeFilter={filterStatus}
        onFilterChange={setFilterStatus}
        counts={counts}
      />

      {/* 5.5 Bảng Dữ liệu (Data Table) */}
      <BlogTable
        posts={filteredPosts}
        onEditPost={handleOpenEditView}
        onDeletePost={handleDeleteClick}
      />

      {/* MODAL: Confirmation Delete Popup */}
      {deletingPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E0E0E0] rounded-md shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#E30019] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-[#040004]">
                  Xác nhận xóa bài viết
                </h3>
                <p className="text-xs text-[#636363] mt-0.5">
                  Hành động này không thể hoàn tác. Bạn có chắc muốn xóa bài
                  viết này?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingPostId(null)}
                className="btn-outlined py-1.5 px-4 text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="btn-primary py-1.5 px-4 text-xs font-semibold"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

