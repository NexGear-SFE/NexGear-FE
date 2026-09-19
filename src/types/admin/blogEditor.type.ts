import type { BlogPost, BlogStatus } from '@/types/admin/blog.type';

export interface BlogEditorPageProps {
  mode: 'create' | 'edit';
  initialPost?: BlogPost | null;
  onSave: (postData: Partial<BlogPost>, status: BlogStatus) => void;
  onCancel: () => void;
}
