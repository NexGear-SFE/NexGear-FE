import React, { useState } from 'react'
import type {
  FooterConfigData,
  CompanyInfo,
  SocialLinks,
  ContactInfo,
  FooterConfigErrors,
  PolicyLinkErrors,
  ContactInfoErrors,
  CompanyInfoErrors,
  SocialLinksErrors,
  NavColumnLinkErrors,
  FooterConfigTabProps,
} from '@/types/admin/footerConfig.type'
import { INITIAL_FOOTER_CONFIG } from '@/mocks/storemanager/footerConfig.mock'
import { CompanySocialSection } from '@/components/admin/footer-config/CompanySocialSection'
import { NavigationLinksSection } from '@/components/admin/footer-config/NavigationLinksSection'
import { ContactInfoSection } from '@/components/admin/footer-config/ContactInfoSection'
import { BottomBarSection } from '@/components/admin/footer-config/BottomBarSection'
import { useToast } from '@/hooks/useToast'
import { Check, RotateCcw } from 'lucide-react'

export const FooterConfigTab: React.FC<FooterConfigTabProps> = ({
  initialData = INITIAL_FOOTER_CONFIG,
  onSave,
}) => {
  const { success, error: toastError } = useToast()
  const [formData, setFormData] = useState<FooterConfigData>(initialData)
  const [errors, setErrors] = useState<FooterConfigErrors>({})
  const [isSaving, setIsSaving] = useState(false)

  // Section 1: Company handlers
  const handleCompanyChange = (field: keyof CompanyInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }))

    if (errors.company?.[field]) {
      setErrors((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          [field]: undefined,
        },
      }))
    }
  }

  // Section 1: Socials handlers
  const handleSocialChange = (field: keyof SocialLinks, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [field]: value,
      },
    }))

    if (errors.socials?.[field]) {
      setErrors((prev) => ({
        ...prev,
        socials: {
          ...prev.socials,
          [field]: undefined,
        },
      }))
    }
  }

  // Section 2: Navigation column links handlers
  const handleNavLinkChange = (
    column: 'left' | 'right',
    id: string,
    field: 'label' | 'url',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      navColumns: {
        ...prev.navColumns,
        [column]: prev.navColumns[column].map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    }))

    if (errors.navColumns?.[column]?.[id]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        navColumns: {
          ...prev.navColumns,
          [column]: {
            ...prev.navColumns?.[column],
            [id]: {
              ...prev.navColumns?.[column]?.[id],
              [field]: undefined,
            },
          },
        },
      }))
    }
  }

  const handleAddNavLink = (column: 'left' | 'right') => {
    const newItem = {
      id: `nav-${column}-${Date.now()}`,
      label: '',
      url: '',
    }
    setFormData((prev) => ({
      ...prev,
      navColumns: {
        ...prev.navColumns,
        [column]: [...prev.navColumns[column], newItem],
      },
    }))
  }

  const handleDeleteNavLink = (column: 'left' | 'right', id: string) => {
    setFormData((prev) => ({
      ...prev,
      navColumns: {
        ...prev.navColumns,
        [column]: prev.navColumns[column].filter((item) => item.id !== id),
      },
    }))
  }

  // Section 3: Contact handlers
  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }))

    if (errors.contact?.[field]) {
      setErrors((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: undefined,
        },
      }))
    }
  }

  // Section 4: Copyright handler
  const handleCopyrightChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      copyright: value,
    }))

    if (errors.copyright) {
      setErrors((prev) => ({
        ...prev,
        copyright: undefined,
      }))
    }
  }

  // Section 4: Policy link handlers
  const handlePolicyChange = (
    id: string,
    field: 'title' | 'url',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      policyLinks: prev.policyLinks.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }))

    if (errors.policyLinks?.[id]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        policyLinks: {
          ...prev.policyLinks,
          [id]: {
            ...prev.policyLinks?.[id],
            [field]: undefined,
          },
        },
      }))
    }
  }

  const handleAddPolicy = () => {
    const newPolicy = {
      id: `policy-${Date.now()}`,
      title: '',
      url: '',
    }
    setFormData((prev) => ({
      ...prev,
      policyLinks: [...prev.policyLinks, newPolicy],
    }))
  }

  const handleDeletePolicy = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      policyLinks: prev.policyLinks.filter((p) => p.id !== id),
    }))
  }

  // Validation
  const validateForm = (): boolean => {
    let isValid = true
    const companyErrors: CompanyInfoErrors = {}
    const socialErrors: SocialLinksErrors = {}
    const leftNavErrors: Record<string, NavColumnLinkErrors> = {}
    const rightNavErrors: Record<string, NavColumnLinkErrors> = {}
    const contactErrors: ContactInfoErrors = {}
    const policyErrors: Record<string, PolicyLinkErrors> = {}
    let copyrightError: string | undefined

    // Section 1 validation
    if (!formData.company.name.trim()) {
      companyErrors.name = 'Tên công ty không được để trống'
      isValid = false
    }
    if (!formData.company.address.trim()) {
      companyErrors.address = 'Địa chỉ không được để trống'
      isValid = false
    }

    // Section 2 validation
    formData.navColumns.left.forEach((item) => {
      const itemError: NavColumnLinkErrors = {}
      if (!item.label.trim()) itemError.label = 'Nhập tiêu đề'
      if (!item.url.trim()) itemError.url = 'Nhập URL'
      if (Object.keys(itemError).length > 0) {
        leftNavErrors[item.id] = itemError
        isValid = false
      }
    })

    formData.navColumns.right.forEach((item) => {
      const itemError: NavColumnLinkErrors = {}
      if (!item.label.trim()) itemError.label = 'Nhập tiêu đề'
      if (!item.url.trim()) itemError.url = 'Nhập URL'
      if (Object.keys(itemError).length > 0) {
        rightNavErrors[item.id] = itemError
        isValid = false
      }
    })

    // Section 3 validation
    if (!formData.contact.phone.trim()) {
      contactErrors.phone = 'Số điện thoại không được để trống'
      isValid = false
    }
    if (!formData.contact.email.trim()) {
      contactErrors.email = 'Email không được để trống'
      isValid = false
    }
    if (!formData.contact.website.trim()) {
      contactErrors.website = 'Website không được để trống'
      isValid = false
    }
    if (!formData.contact.workingHours.trim()) {
      contactErrors.workingHours = 'Giờ làm việc không được để trống'
      isValid = false
    }

    // Section 4 validation
    if (!formData.copyright.trim()) {
      copyrightError = 'Dòng bản quyền không được để trống'
      isValid = false
    }

    formData.policyLinks.forEach((policy) => {
      const itemError: PolicyLinkErrors = {}
      if (!policy.title.trim()) {
        itemError.title = 'Nhập tiêu đề'
        isValid = false
      }
      if (!policy.url.trim()) {
        itemError.url = 'Nhập URL'
        isValid = false
      }
      if (Object.keys(itemError).length > 0) {
        policyErrors[policy.id] = itemError
      }
    })

    setErrors({
      company: Object.keys(companyErrors).length > 0 ? companyErrors : undefined,
      socials: Object.keys(socialErrors).length > 0 ? socialErrors : undefined,
      navColumns: {
        left: Object.keys(leftNavErrors).length > 0 ? leftNavErrors : undefined,
        right: Object.keys(rightNavErrors).length > 0 ? rightNavErrors : undefined,
      },
      contact: Object.keys(contactErrors).length > 0 ? contactErrors : undefined,
      copyright: copyrightError,
      policyLinks: Object.keys(policyErrors).length > 0 ? policyErrors : undefined,
    })

    return isValid
  }

  // Save handler
  const handleSave = () => {
    if (!validateForm()) {
      toastError?.('Vui lòng kiểm tra lại các thông tin chưa hợp lệ')
      return
    }

    setIsSaving(true)

    try {
      // eslint-disable-next-line no-console
      console.log('Updated Footer Config Payload:', formData)

      onSave?.(formData)
      success('Cập nhật Cấu hình Footer thành công!')
    } finally {
      setIsSaving(false)
    }
  }

  // Cancel / Reset handler
  const handleCancel = () => {
    setFormData(initialData)
    setErrors({})
  }

  return (
    <div className="space-y-6">
      {/* Subtitle mô tả tab */}
      <p className="text-sm text-slate-500 -mt-2">
        Tuỳ chỉnh nội dung footer hiển thị ở cuối tất cả các trang
      </p>

      {/* 1. Thông tin công ty & Mạng xã hội */}
      <CompanySocialSection
        company={formData.company}
        socials={formData.socials}
        onCompanyChange={handleCompanyChange}
        onSocialChange={handleSocialChange}
        companyErrors={errors.company}
        socialErrors={errors.socials}
      />

      {/* 2. Cột điều hướng (Links) */}
      <NavigationLinksSection
        navColumns={formData.navColumns}
        onLinkChange={handleNavLinkChange}
        onAddLink={handleAddNavLink}
        onDeleteLink={handleDeleteNavLink}
        errors={errors.navColumns}
      />

      {/* 3. Thông tin liên hệ */}
      <ContactInfoSection
        contact={formData.contact}
        onChange={handleContactChange}
        errors={errors.contact}
      />

      {/* 4. Bản quyền & Dưới cùng (Bottom Bar) */}
      <BottomBarSection
        copyright={formData.copyright}
        onCopyrightChange={handleCopyrightChange}
        policyLinks={formData.policyLinks}
        onPolicyChange={handlePolicyChange}
        onAddPolicy={handleAddPolicy}
        onDeletePolicy={handleDeletePolicy}
        copyrightError={errors.copyright}
        policyErrors={errors.policyLinks}
      />

      {/* Action Buttons (Footer Bar) */}
      <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={handleCancel}
          className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>Hủy</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          <span>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
        </button>
      </div>
    </div>
  )
}
