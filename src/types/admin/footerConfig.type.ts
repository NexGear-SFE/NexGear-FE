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

export interface BottomBarSectionProps {
  copyright: string
  onCopyrightChange: (value: string) => void
  policyLinks: PolicyLink[]
  onPolicyChange: (id: string, field: 'title' | 'url', value: string) => void
  onAddPolicy: () => void
  onDeletePolicy: (id: string) => void
  copyrightError?: string
  policyErrors?: Record<string, PolicyLinkErrors>
}

export interface CompanySocialSectionProps {
  company: CompanyInfo
  socials: SocialLinks
  onCompanyChange: (field: keyof CompanyInfo, value: string) => void
  onSocialChange: (field: keyof SocialLinks, value: string) => void
  companyErrors?: CompanyInfoErrors
  socialErrors?: SocialLinksErrors
}

export interface ContactInfoSectionProps {
  contact: ContactInfo
  onChangeContact: (field: keyof ContactInfo, value: string) => void
  errors?: FooterConfigErrors
}

export interface FooterConfigTabProps {
  initialConfig?: FooterConfigData
  onSave?: (config: FooterConfigData) => void
}

export interface NavigationLinksSectionProps {
  navColumns: NavigationColumns
  onAddLink: (col: 'left' | 'right') => void
  onUpdateLink: (col: 'left' | 'right', id: string, field: keyof NavColumnLink, value: string) => void
  onRemoveLink: (col: 'left' | 'right', id: string) => void
  errors?: FooterConfigErrors
}

export interface NavItemRowProps {
  item: NavColumnLink
  column: 'left' | 'right'
  onUpdate: (col: 'left' | 'right', id: string, field: keyof NavColumnLink, value: string) => void
  onRemove: (col: 'left' | 'right', id: string) => void
  errors?: NavColumnLinkErrors
}

export interface PolicyItemRowProps {
  item: PolicyLink
  onUpdate: (id: string, field: keyof PolicyLink, value: string) => void
  onRemove: (id: string) => void
  errors?: PolicyLinkErrors
}

