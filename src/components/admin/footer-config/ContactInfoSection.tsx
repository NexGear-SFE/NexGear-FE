import React from 'react'
import type { ContactInfo, ContactInfoErrors } from '@/types/admin/footerConfig.type'
import { FOOTER_FIELD_PLACEHOLDERS } from '@/constants/footerConfigConstants'
import { Phone, Mail, Globe, Clock } from 'lucide-react'

interface ContactInfoSectionProps {
  contact: ContactInfo
  onChange: (field: keyof ContactInfo, value: string) => void
  errors?: ContactInfoErrors
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  contact,
  onChange,
  errors,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center">
        <span className="w-1 h-5 bg-red-600 rounded-full inline-block mr-2" />
        <h3 className="font-semibold text-slate-900 text-base">
          3. Thông tin liên hệ
        </h3>
      </div>

      {/* Grid 2 cột */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
        {/* Số điện thoại */}
        <div>
          <label
            htmlFor="footer-phone"
            className="block text-xs text-slate-600 font-medium mb-1.5"
          >
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Số điện thoại</span>
            </span>
          </label>
          <input
            id="footer-phone"
            type="text"
            value={contact.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder={FOOTER_FIELD_PLACEHOLDERS.phone}
            className={`w-full rounded-lg border text-sm px-3.5 py-2.5 transition outline-none ${
              errors?.phone
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
            }`}
          />
          {errors?.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="footer-email"
            className="block text-xs text-slate-600 font-medium mb-1.5"
          >
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email</span>
            </span>
          </label>
          <input
            id="footer-email"
            type="email"
            value={contact.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder={FOOTER_FIELD_PLACEHOLDERS.email}
            className={`w-full rounded-lg border text-sm px-3.5 py-2.5 transition outline-none ${
              errors?.email
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
            }`}
          />
          {errors?.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label
            htmlFor="footer-website"
            className="block text-xs text-slate-600 font-medium mb-1.5"
          >
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Website</span>
            </span>
          </label>
          <input
            id="footer-website"
            type="text"
            value={contact.website}
            onChange={(e) => onChange('website', e.target.value)}
            placeholder={FOOTER_FIELD_PLACEHOLDERS.website}
            className={`w-full rounded-lg border text-sm px-3.5 py-2.5 transition outline-none ${
              errors?.website
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
            }`}
          />
          {errors?.website && (
            <p className="text-xs text-red-500 mt-1">{errors.website}</p>
          )}
        </div>

        {/* Giờ làm việc */}
        <div>
          <label
            htmlFor="footer-working-hours"
            className="block text-xs text-slate-600 font-medium mb-1.5"
          >
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Giờ làm việc</span>
            </span>
          </label>
          <input
            id="footer-working-hours"
            type="text"
            value={contact.workingHours}
            onChange={(e) => onChange('workingHours', e.target.value)}
            placeholder={FOOTER_FIELD_PLACEHOLDERS.workingHours}
            className={`w-full rounded-lg border text-sm px-3.5 py-2.5 transition outline-none ${
              errors?.workingHours
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
            }`}
          />
          {errors?.workingHours && (
            <p className="text-xs text-red-500 mt-1">{errors.workingHours}</p>
          )}
        </div>
      </div>
    </div>
  )
}
