import type { BlogPost } from '@/types/admin/blog.type';

export type ViewMode = 'list' | 'create' | 'edit' | 'settings';

export interface AdminLayoutContext {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  editingPost: BlogPost | null;
  setEditingPost: (post: BlogPost | null) => void;
}
