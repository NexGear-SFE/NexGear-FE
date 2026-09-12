import type { BlogStatus, BlogFilterStatus } from '@/types/blog.type'

export const BLOG_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const satisfies Record<string, BlogStatus>

export const BLOG_FILTER_STATUS = {
  ALL: 'all',
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const satisfies Record<string, BlogFilterStatus>
