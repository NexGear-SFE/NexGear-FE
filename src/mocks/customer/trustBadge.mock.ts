import { ShieldCheck, Zap, Shield, RefreshCw } from 'lucide-react'

export interface TrustBadgeItem {
  icon: typeof ShieldCheck
  title: string
  description: string
}

export const badges: TrustBadgeItem[] = [
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
