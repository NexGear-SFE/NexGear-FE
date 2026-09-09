import { useState } from 'react'
import type { BlogPost } from '@/types/blog.type'
import {
  ArrowLeft,
  Link as LinkIcon,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Table,
  Image as ImageIcon,
  Video,
  Plus,
  Upload,
  Check,
} from 'lucide-react'

interface BlogEditorPageProps {
  mode: 'create' | 'edit'
  initialPost?: BlogPost | null
  onSave: (postData: Partial<BlogPost>, status: 'published' | 'draft') => void
  onCancel: () => void
}

// Utility to create slug from title
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const BlogEditorPage = ({
  mode,
  initialPost,
  onSave,
  onCancel,
}: BlogEditorPageProps) => {
  const [title, setTitle] = useState(
    initialPost?.title ||
      'Đánh giá ASUS ROG Zephyrus G16 2026 — RTX 5080, 240Hz OLED'
  )
  const [tags, setTags] = useState(
    initialPost?.tags.join(', ') || 'ASUS ROG, Laptop, RTX 5080'
  )
  const [excerpt, setExcerpt] = useState(
    'Siêu phẩm laptop gaming ASUS ROG Zephyrus G16 phiên bản 2026 trang bị card đồ họa NVIDIA RTX 5080, màn hình OLED 240Hz sắc nét...'
  )
  const [content, setContent] = useState(
    `ASUS ROG Zephyrus G16 (2026) tiếp tục khẳng định vị thế dẫn đầu trong phân khúc laptop gaming cao cấp. Với thiết kế vỏ nhôm CNC nguyên khối cực kỳ sang trọng cùng độ mỏng ấn tượng, chiếc máy sở hữu sức mạnh xử lý vượt trội nhờ bộ vi xử lý Intel Core Ultra mới nhất và GPU NVIDIA GeForce RTX 5080.`
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialPost?.category ? [initialPost.category] : ['Đánh giá phần cứng']
  )
  const [author, setAuthor] = useState(initialPost?.author || 'Minh Khoa')
  const [coverImage, setCoverImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80'
  )
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [categoriesList, setCategoriesList] = useState<string[]>([
    'Đánh giá phần cứng',
    'Tin tức game',
    'Hướng dẫn',
    'Khuyến mãi',
  ])

  const slug = slugify(title || 'bai-viet-moi')
  const autoUrl = `geargo.vn/blog/${slug}`

  const handleToggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categoriesList.includes(newCategoryName.trim())) {
      const newCat = newCategoryName.trim()
      setCategoriesList((prev) => [...prev, newCat])
      setSelectedCategories((prev) => [...prev, newCat])
      setNewCategoryName('')
      setIsAddingCategory(false)
    }
  }

  const handleInsertTag = (tagSymbol: string) => {
    setContent((prev) => `${prev} ${tagSymbol} `)
  }

  const handlePublish = (status: 'published' | 'draft') => {
    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    onSave(
      {
        title,
        tags: tagArray,
        category: selectedCategories[0] || 'Chưa phân loại',
        author,
      },
      status
    )
  }

  return (
    <div className="space-y-6">
      {/* 2.1 Header Điều hướng */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-outlined py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>
        <span className="text-slate-300 font-bold">/</span>
        <h1 className="font-heading text-xl md:text-2xl font-bold text-[#040004]">
          {mode === 'edit' ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
        </h1>
      </div>

      {/* Main Grid: 2 Cột */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* 2.2 Cột Trái: Nội dung chính (~70% = 7/10 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Khối 1: 1. Thông tin bài viết */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-5 shadow-xs">
            <div className="flex items-center">
              <span className="h-5 w-1 bg-[#E30019] rounded-full inline-block mr-2" />
              <h2 className="font-heading text-base md:text-lg font-bold text-[#040004]">
                1. Thông tin bài viết
              </h2>
            </div>

            {/* Tiêu đề bài viết */}
            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Tiêu đề bài viết <span className="text-[#E30019]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
                className="input-gaming w-full font-medium"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Tags (phân cách bởi dấu phẩy)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ASUS ROG, Laptop, RTX 5080"
                className="input-gaming w-full"
              />
            </div>

            {/* URL tự động */}
            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Đường dẫn tĩnh (Permalink)
              </label>
              <div className="bg-slate-50 border border-[#E0E0E0] rounded-md p-2.5 flex items-center gap-2 overflow-hidden">
                <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-500 shrink-0">
                  URL tự động:
                </span>
                <span className="bg-slate-200/80 text-slate-700 text-xs font-mono px-2 py-0.5 rounded truncate">
                  {autoUrl}
                </span>
              </div>
            </div>

            {/* Tóm tắt ngắn (Excerpt) */}
            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Tóm tắt ngắn (Excerpt)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tóm tắt ngắn gọn bài viết..."
                className="input-gaming w-full text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Khối 2: 2. Nội dung bài viết (WYSIWYG Editor) */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="h-5 w-1 bg-[#E30019] rounded-full inline-block mr-2" />
                <h2 className="font-heading text-base md:text-lg font-bold text-[#040004]">
                  2. Nội dung bài viết (WYSIWYG Editor)
                </h2>
              </div>
              <span className="text-[11px] text-[#636363] italic">
                Hỗ trợ định dạng Rich Text
              </span>
            </div>

            {/* Toolbar */}
            <div className="bg-slate-50 border border-[#E0E0E0] rounded-t-md p-2 flex flex-wrap items-center gap-1 text-slate-700">
              <button
                type="button"
                title="In đậm (Bold)"
                onClick={() => handleInsertTag('**Bold**')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold transition-mechanical cursor-pointer"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="In nghiêng (Italic)"
                onClick={() => handleInsertTag('*Italic*')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Gạch chân (Underline)"
                onClick={() => handleInsertTag('<u>Underline</u>')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <Underline className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-slate-300 mx-1" />

              <button
                type="button"
                title="Tiêu đề H1"
                onClick={() => handleInsertTag('# Heading 1')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Tiêu đề H2"
                onClick={() => handleInsertTag('## Heading 2')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Tiêu đề H3"
                onClick={() => handleInsertTag('### Heading 3')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <Heading3 className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-slate-300 mx-1" />

              <button
                type="button"
                title="Danh sách dấu chấm"
                onClick={() => handleInsertTag('- List Item')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Danh sách số"
                onClick={() => handleInsertTag('1. List Item')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Mã nguồn (Code)"
                onClick={() => handleInsertTag('`Code`')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <Code className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-slate-300 mx-1" />

              <button
                type="button"
                title="Chèn bảng"
                onClick={() => handleInsertTag('| Column 1 | Column 2 |')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <Table className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Chèn ảnh"
                onClick={() => handleInsertTag('![Image](url)')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Chèn video"
                onClick={() => handleInsertTag('[Video](url)')}
                className="p-1.5 hover:bg-slate-200 rounded text-xs transition-mechanical cursor-pointer"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>

            {/* Vùng nhập liệu */}
            <textarea
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Bắt đầu viết nội dung bài viết..."
              className="w-full p-4 bg-white border border-[#E0E0E0] rounded-b-md focus:outline-none focus:border-[#E30019] text-sm text-[#040004] leading-relaxed font-body min-h-[320px]"
            />
          </div>
        </div>

        {/* 2.3 Cột Phải: Bảng điều khiển xuất bản (~30% = 3/10 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Panel Xuất bản */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-5 space-y-3 shadow-xs">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#636363] pb-2 border-b border-[#E0E0E0]">
              XUẤT BẢN
            </h3>

            <button
              type="button"
              onClick={() => handlePublish('published')}
              className="btn-primary w-full py-2.5 justify-center shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Xuất bản ngay</span>
            </button>

            <button
              type="button"
              onClick={() => handlePublish('draft')}
              className="w-full py-2 bg-white text-[#040004] border border-[#E0E0E0] rounded-sm text-xs font-semibold hover:bg-slate-50 transition-mechanical cursor-pointer flex items-center justify-center gap-1.5"
            >
              💾 Lưu nháp
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full text-center text-xs text-[#636363] hover:text-[#040004] hover:underline cursor-pointer pt-1 transition-mechanical block"
            >
              Hủy
            </button>
          </div>

          {/* Panel Chuyên mục */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0E0E0]">
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#636363]">
                CHUYÊN MỤC
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="text-xs text-[#E30019] border border-[#E30019] px-2 py-0.5 rounded font-semibold hover:bg-red-50 transition-mechanical cursor-pointer flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Thêm
              </button>
            </div>

            {isAddingCategory && (
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="Tên chuyên mục..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="input-gaming text-xs py-1 px-2 flex-1"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="btn-primary py-1 px-2 text-xs"
                >
                  Lưu
                </button>
              </div>
            )}

            <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
              {categoriesList.map((cat) => {
                const isChecked = selectedCategories.includes(cat)
                return (
                  <label
                    key={cat}
                    className="flex items-center gap-2.5 text-xs text-[#040004] cursor-pointer hover:text-[#E30019] select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleCategory(cat)}
                      className="w-4 h-4 rounded border-slate-300 text-[#E30019] focus:ring-[#E30019] accent-[#E30019] cursor-pointer"
                    />
                    <span className={isChecked ? 'font-semibold text-[#040004]' : ''}>
                      {cat}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Panel Ảnh bìa (Cover Image) */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-5 space-y-3 shadow-xs">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#636363] pb-2 border-b border-[#E0E0E0]">
              ẢNH BÌA (COVER IMAGE)
            </h3>

            {coverImage ? (
              <div className="relative group rounded-md overflow-hidden border border-[#E0E0E0]">
                <img
                  src={coverImage}
                  alt="Cover Thumbnail"
                  className="w-full h-36 object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-mechanical flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCoverImage(
                        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
                      )
                    }
                    className="btn-primary py-1 px-3 text-xs"
                  >
                    Đổi ảnh
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverImage(null)}
                    className="btn-outlined bg-white py-1 px-3 text-xs text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() =>
                  setCoverImage(
                    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80'
                  )
                }
                className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-red-400 cursor-pointer transition-mechanical bg-slate-50/50 group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 group-hover:text-[#E30019] group-hover:bg-red-50 flex items-center justify-center mx-auto mb-2 transition-mechanical">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-600 block group-hover:text-[#E30019]">
                  Upload thumbnail
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  PNG, JPG hoặc WEBP (Max 2MB)
                </span>
              </div>
            )}
          </div>

          {/* Panel Tác giả */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-5 space-y-3 shadow-xs">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#636363] pb-2 border-b border-[#E0E0E0]">
              TÁC GIẢ
            </h3>
            <div>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Tên tác giả..."
                className="input-gaming w-full text-xs font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
