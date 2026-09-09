export type BlogStatus = 'published' | 'draft'

export interface BlogPost {
  id: string
  title: string
  tags: string[]
  category: string
  author: string
  publishedAt: string | null // dd/mm/yyyy hoặc null nếu là draft
  status: BlogStatus
  readTime?: string
  updatedAt?: string
  coverImage?: string
  summary?: string
  content?: string
}

export type BlogFilterStatus = 'all' | 'published' | 'draft'
