import { useState } from 'react'
import type { BlogPost, BlogStatus } from '@/types/admin/blog.type'

export const slugify = (text: string) => {
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

export function useBlogEditor(
  initialPost?: BlogPost | null,
  onSave?: (postData: Partial<BlogPost>, status: BlogStatus) => void
) {
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

    if (onSave) {
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
  }

  return {
    title,
    setTitle,
    tags,
    setTags,
    excerpt,
    setExcerpt,
    content,
    setContent,
    selectedCategories,
    author,
    setAuthor,
    coverImage,
    setCoverImage,
    newCategoryName,
    setNewCategoryName,
    isAddingCategory,
    setIsAddingCategory,
    categoriesList,
    autoUrl,
    handleToggleCategory,
    handleAddCategory,
    handleInsertTag,
    handlePublish,
  }
}
