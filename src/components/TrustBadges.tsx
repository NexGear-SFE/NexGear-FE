import { ShieldCheck, Zap, Shield, RefreshCw } from 'lucide-react'

export interface TrustBadgeItem {
  icon: typeof ShieldCheck
  title: string
  description: string
}

export const TrustBadges = () => {
  const badges: TrustBadgeItem[] = [
    {
      icon: ShieldCheck,
      title: '100% Hàng chính hãng',
      description: 'Kiểm định nguồn gốc, đầy đủ hóa đơn VAT',
    },
    {
      icon: Zap,
      title: 'Giao hàng siêu tốc 2H',
      description: 'Nội thành TP.HCM & Hà Nội',
    },
    {
      icon: Shield,
      title: 'Bảo hành tận nơi',
      description: 'Kỹ thuật viên đến tận nhà hỗ trợ',
    },
    {
      icon: RefreshCw,
      title: 'Đổi mới 30 ngày',
      description: 'Đổi 1-1 nếu lỗi do nhà sản xuất',
    },
  ]

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {badges.map((badge, idx) => {
        const IconComponent = badge.icon
        return (
          <div
            key={idx}
            className="bg-white p-4 rounded-[8px] border border-[#E0E0E0] flex items-center gap-3.5 shadow-sm transition-mechanical hover:border-[#E30019]"
          >
            <div className="w-10 h-10 rounded-[4px] bg-[#E30019]/10 flex items-center justify-center text-[#E30019] shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#040004] leading-snug">
                {badge.title}
              </h3>
              <p className="text-xs text-[#636363] mt-0.5 leading-normal">
                {badge.description}
              </p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
