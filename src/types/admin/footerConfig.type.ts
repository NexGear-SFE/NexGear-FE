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

export type BottomBarSectionProps = {
  copyright: string
  onCopyrightChange: (value: string) => void
  policyLinks: PolicyLink[]
  onPolicyChange: (id: string, field: 'title' | 'url', value: string) => void
  onAddPolicy: () => void
  onDeletePolicy: (id: string) => void
  copyrightError?: string
  policyErrors?: Record<string, PolicyLinkErrors>
}

export type CompanySocialSectionProps = {
  company: CompanyInfo
  socials: SocialLinks
  onCompanyChange: (field: keyof CompanyInfo, value: string) => void
  onSocialChange: (field: keyof SocialLinks, value: string) => void
  companyErrors?: CompanyInfoErrors
  socialErrors?: SocialLinksErrors
}

export type ContactInfoSectionProps = {
  contact: ContactInfo
  onChange: (field: keyof ContactInfo, value: string) => void
  errors?: ContactInfoErrors
}

export type FooterConfigTabProps = {
  initialData?: FooterConfigData
  onSave?: (data: FooterConfigData) => void
}

export type NavigationLinksSectionProps = {
  navColumns: NavigationColumns
  onLinkChange: (
    column: 'left' | 'right',
    id: string,
    field: 'label' | 'url',
    value: string
  ) => void
  onAddLink: (column: 'left' | 'right') => void
  onDeleteLink: (column: 'left' | 'right', id: string) => void
  errors?: {
    left?: Record<string, NavColumnLinkErrors>
    right?: Record<string, NavColumnLinkErrors>
  }
}

export type NavItemRowProps = {
  item: NavColumnLink
  index: number
  onChange: (id: string, field: 'label' | 'url', value: string) => void
  onDelete: (id: string) => void
  errors?: NavColumnLinkErrors
  isDeleteDisabled?: boolean
}

export type PolicyItemRowProps = {
  policy: PolicyLink
  index: number
  onChange: (id: string, field: 'title' | 'url', value: string) => void
  onDelete: (id: string) => void
  errors?: PolicyLinkErrors
  isDeleteDisabled?: boolean
}

