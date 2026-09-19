export type TechNav = 'dashboard' | 'warranty' | 'serial' | 'reports' | 'history' | 'settings';

export interface TechStaffUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface WarrantyProvider {
  id: string;
  name: string;
  pageName: string;
  url: string;
  active: boolean;
  color: string;
  bg: string;
}
