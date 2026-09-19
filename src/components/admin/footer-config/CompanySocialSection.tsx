import React from 'react'
import type { CompanySocialSectionProps } from '@/types/admin/footerConfig.type'
import { FOOTER_FIELD_PLACEHOLDERS } from '@/constants/footerConfigConstants'

export const CompanySocialSection: React.FC<CompanySocialSectionProps> = ({
  company,
  socials,
  onCompanyChange,
  onSocialChange,
  companyErrors,
  socialErrors,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <span className="w-1 h-5 bg-red-600 rounded-full inline-block mr-2" />
        <h3 className="font-semibold text-slate-900 text-base">
          1. Thông tin công ty & Mạng xã hội
        </h3>
      </div>

      <div className="space-y-4">
        {/* Tên công ty / Tên cửa hàng */}
        <div>
          <label
            htmlFor="company-name"
            className="block text-xs text-slate-600 font-medium mb-1.5"
          >
            Tên công ty / Tên cửa hàng
          </label>
          <input
            id="company-name"
            type="text"
            value={company.name}
            onChange={(e) => onCompanyChange('name', e.target.value)}
            placeholder={FOOTER_FIELD_PLACEHOLDERS.companyName}
            className={`w-full rounded-lg border text-sm px-3.5 py-2.5 transition outline-none ${
              companyErrors?.name
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
            }`}
          />
          {companyErrors?.name && (
            <p className="text-xs text-red-500 mt-1">{companyErrors.name}</p>
          )}
        </div>

        {/* Địa chỉ */}
        <div>
          <label
            htmlFor="company-address"
            className="block text-xs text-slate-600 font-medium mb-1.5"
          >
            Địa chỉ
          </label>
          <textarea
            id="company-address"
            rows={2}
            value={company.address}
            onChange={(e) => onCompanyChange('address', e.target.value)}
            placeholder={FOOTER_FIELD_PLACEHOLDERS.companyAddress}
            className={`w-full rounded-lg border text-sm px-3.5 py-2.5 transition outline-none resize-y ${
              companyErrors?.address
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
            }`}
          />
          {companyErrors?.address && (
            <p className="text-xs text-red-500 mt-1">{companyErrors.address}</p>
          )}
        </div>

        {/* Mạng xã hội */}
        <div>
          <label className="block text-xs text-slate-600 font-medium mb-2">
            Mạng xã hội
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Facebook */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md bg-[#1877F2] text-white font-bold text-xs flex items-center justify-center shrink-0 select-none shadow-xs"
                title="Facebook"
              >
                F
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={socials.facebook}
                  onChange={(e) => onSocialChange('facebook', e.target.value)}
                  placeholder={FOOTER_FIELD_PLACEHOLDERS.facebook}
                  aria-label="URL Facebook"
                  className={`w-full rounded-lg border text-sm px-3.5 py-2 font-mono transition outline-none ${
                    socialErrors?.facebook
                      ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                      : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
                  }`}
                />
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md bg-[#E1306C] text-white font-bold text-[11px] flex items-center justify-center shrink-0 select-none shadow-xs"
                title="Instagram"
              >
                IG
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={socials.instagram}
                  onChange={(e) => onSocialChange('instagram', e.target.value)}
                  placeholder={FOOTER_FIELD_PLACEHOLDERS.instagram}
                  aria-label="URL Instagram"
                  className={`w-full rounded-lg border text-sm px-3.5 py-2 font-mono transition outline-none ${
                    socialErrors?.instagram
                      ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                      : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
                  }`}
                />
              </div>
            </div>

            {/* YouTube */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md bg-[#FF0000] text-white font-bold text-[11px] flex items-center justify-center shrink-0 select-none shadow-xs"
                title="YouTube"
              >
                YT
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={socials.youtube}
                  onChange={(e) => onSocialChange('youtube', e.target.value)}
                  placeholder={FOOTER_FIELD_PLACEHOLDERS.youtube}
                  aria-label="URL YouTube"
                  className={`w-full rounded-lg border text-sm px-3.5 py-2 font-mono transition outline-none ${
                    socialErrors?.youtube
                      ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                      : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
                  }`}
                />
              </div>
            </div>

            {/* TikTok */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md bg-[#000000] text-white font-bold text-[11px] flex items-center justify-center shrink-0 select-none shadow-xs"
                title="TikTok"
              >
                TT
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={socials.tiktok}
                  onChange={(e) => onSocialChange('tiktok', e.target.value)}
                  placeholder={FOOTER_FIELD_PLACEHOLDERS.tiktok}
                  aria-label="URL TikTok"
                  className={`w-full rounded-lg border text-sm px-3.5 py-2 font-mono transition outline-none ${
                    socialErrors?.tiktok
                      ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20 text-slate-800'
                      : 'border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
