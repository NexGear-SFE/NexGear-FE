import type {
  ContactInfo,
  PolicyLink,
  CompanyInfo,
  SocialLinks,
  NavigationColumns,
  FooterConfigData,
} from '@/types/footerConfig'

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: 'CÔNG TY TNHH CÔNG NGHỆ GEARGO',
  address: '123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh',
}

export const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  facebook: 'https://facebook.com/geargovn',
  instagram: 'https://instagram.com/geargo.vn',
  youtube: 'https://youtube.com/@geargo',
  tiktok: 'https://tiktok.com/@geargo.vn',
}

export const DEFAULT_NAV_COLUMNS: NavigationColumns = {
  left: [
    { id: 'nav-left-1', label: 'Laptop Gaming', url: '/category/laptop-gaming' },
    { id: 'nav-left-2', label: 'PC Gaming', url: '/category/pc-gaming' },
    { id: 'nav-left-3', label: 'Bàn phím cơ', url: '/category/ban-phim-co' },
    { id: 'nav-left-4', label: 'Màn hình gaming', url: '/category/man-hinh' },
  ],
  right: [
    { id: 'nav-right-1', label: 'Về GearGo', url: '/about' },
    { id: 'nav-right-2', label: 'Chính sách bảo hành', url: '/warranty' },
    { id: 'nav-right-3', label: 'Hướng dẫn mua hàng', url: '/guide' },
    { id: 'nav-right-4', label: 'Tuyển dụng', url: '/jobs' },
  ],
}

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '0923 456 789',
  email: 'support@geargo.vn',
  website: 'https://geargo.vn',
  workingHours: 'T2-T7: 7:30-21:00',
}

export const DEFAULT_COPYRIGHT = '© 2026 GearGo Tech. Bảo lưu mọi quyền.'

export const DEFAULT_POLICY_LINKS: PolicyLink[] = [
  {
    id: 'policy-1',
    title: 'Chính sách bảo mật',
    url: '/privacy',
  },
  {
    id: 'policy-2',
    title: 'Điều khoản dịch vụ',
    url: '/terms',
  },
]

export const DEFAULT_FOOTER_CONFIG: FooterConfigData = {
  company: DEFAULT_COMPANY_INFO,
  socials: DEFAULT_SOCIAL_LINKS,
  navColumns: DEFAULT_NAV_COLUMNS,
  contact: DEFAULT_CONTACT_INFO,
  copyright: DEFAULT_COPYRIGHT,
  policyLinks: DEFAULT_POLICY_LINKS,
}

export const FOOTER_FIELD_PLACEHOLDERS = {
  companyName: 'Nhập tên công ty hoặc tên cửa hàng...',
  companyAddress: 'Nhập địa chỉ trụ sở / showroom...',
  facebook: 'URL Facebook (https://facebook.com/...)...',
  instagram: 'URL Instagram (https://instagram.com/...)...',
  youtube: 'URL YouTube (https://youtube.com/...)...',
  tiktok: 'URL TikTok (https://tiktok.com/...)...',
  navLabel: 'Tiêu đề liên kết...',
  navUrl: 'Đường dẫn liên kết (/category/...)...',
  phone: 'Nhập số điện thoại hotline (vd: 0923 456 789)...',
  email: 'Nhập email hỗ trợ (vd: support@geargo.vn)...',
  website: 'Nhập địa chỉ website (vd: https://geargo.vn)...',
  workingHours: 'Nhập thời gian hoạt động (vd: T2-T7: 7:30-21:00)...',
  copyright: 'Nhập dòng bản quyền footer...',
  policyTitle: 'Tiêu đề chính sách...',
  policyUrl: 'Đường dẫn / URL...',
}
