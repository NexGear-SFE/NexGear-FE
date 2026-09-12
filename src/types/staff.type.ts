export type TechNav = 'dashboard' | 'warranty' | 'serial' | 'reports' | 'history' | 'settings';

export interface TechStaffUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
}
