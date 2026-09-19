import type { FooterConfigData } from '@/types/footerConfig'
import { DEFAULT_FOOTER_CONFIG } from '@/constants/footerConfigConstants'

export const INITIAL_FOOTER_CONFIG: FooterConfigData = {
  company: { ...DEFAULT_FOOTER_CONFIG.company },
  socials: { ...DEFAULT_FOOTER_CONFIG.socials },
  navColumns: {
    left: DEFAULT_FOOTER_CONFIG.navColumns.left.map((item) => ({ ...item })),
    right: DEFAULT_FOOTER_CONFIG.navColumns.right.map((item) => ({ ...item })),
  },
  contact: { ...DEFAULT_FOOTER_CONFIG.contact },
  copyright: DEFAULT_FOOTER_CONFIG.copyright,
  policyLinks: DEFAULT_FOOTER_CONFIG.policyLinks.map((p) => ({ ...p })),
}
