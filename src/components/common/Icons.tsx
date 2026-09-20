import type { LucideProps } from 'lucide-react';
import {
  Menu,
  LayoutDashboard,
  ShieldCheck,
  FileText,
  BarChart2,
  History,
  Settings,
  MoreVertical,
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react';

export const IcTechMenu = (props: LucideProps) => <Menu size={18} {...props} />;
export const IcTechDash = (props: LucideProps) => <LayoutDashboard size={16} {...props} />;
export const IcTechWarranty = (props: LucideProps) => <ShieldCheck size={16} {...props} />;
export const IcTechSerial = (props: LucideProps) => <FileText size={16} {...props} />;
export const IcTechReport = (props: LucideProps) => <BarChart2 size={16} {...props} />;
export const IcTechHistory = (props: LucideProps) => <History size={16} {...props} />;
export const IcTechSettings = (props: LucideProps) => <Settings size={16} {...props} />;
export const IcTechDots = (props: LucideProps) => <MoreVertical size={16} {...props} />;
export const IcTechSearch = (props: LucideProps) => <Search size={15} {...props} />;
export const IcTechBell = (props: LucideProps) => <Bell size={18} {...props} />;
export const IcTechChevron = (props: LucideProps) => <ChevronDown size={12} {...props} />;

