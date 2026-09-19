export interface PolicyLink {
  id: string
  title: string
  url: string
}

export interface ContactInfo {
  phone: string
  email: string
  website: string
  workingHours: string
}

export interface CompanyInfo {
  name: string
  address: string
}

export interface SocialLinks {
  facebook: string
  instagram: string
  youtube: string
  tiktok: string
}

export interface NavColumnLink {
  id: string
  label: string
  url: string
}

export interface NavigationColumns {
  left: NavColumnLink[] // Cột trái — Danh mục sản phẩm
  right: NavColumnLink[] // Cột phải — Về chúng tôi / Dịch vụ
}

export interface FooterConfigData {
  company: CompanyInfo
  socials: SocialLinks
  navColumns: NavigationColumns
  contact: ContactInfo
  copyright: string
  policyLinks: PolicyLink[]
}

export interface CompanyInfoErrors {
  name?: string
  address?: string
}

export interface SocialLinksErrors {
  facebook?: string
  instagram?: string
  youtube?: string
  tiktok?: string
}

export interface NavColumnLinkErrors {
  label?: string
  url?: string
}

export interface ContactInfoErrors {
  phone?: string
  email?: string
  website?: string
  workingHours?: string
}

export interface PolicyLinkErrors {
  title?: string
  url?: string
}

export interface FooterConfigErrors {
  company?: CompanyInfoErrors
  socials?: SocialLinksErrors
  navColumns?: {
    left?: Record<string, NavColumnLinkErrors>
    right?: Record<string, NavColumnLinkErrors>
  }
  contact?: ContactInfoErrors
  copyright?: string
  policyLinks?: Record<string, PolicyLinkErrors>
}
