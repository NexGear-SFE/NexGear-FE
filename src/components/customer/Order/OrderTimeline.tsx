import { CheckCircle2, AlertCircle } from 'lucide-react'
import type { OrderTimelineProps } from '@/types/customer/order.type'

export function OrderTimeline({ status, cancelReason, timeline }: OrderTimelineProps) {
  if (status === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4 text-red-800">
        <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs md:text-sm">
          <h4 className="font-bold text-sm md:text-base text-red-900">Đơn hàng này đã bị hủy</h4>
          <p>
            <strong>Lý do hủy:</strong> {cancelReason || 'Khách hàng yêu cầu hủy đơn.'}
          </p>
          <p className="text-red-700">
            Nếu bạn đã thực hiện thanh toán trước, số tiền sẽ được hoàn trả lại tài khoản trong vòng 24-48 giờ làm việc.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-5">
      <h3 className="text-sm md:text-base font-bold text-[#040004] font-heading uppercase tracking-wider">
        Tiến trình đơn hàng
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
        {timeline.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center space-y-2 relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step.completed && status === 'delivered'
                  ? 'bg-emerald-600 text-white'
                  : step.current
                  ? 'bg-[#E30019] text-white ring-4 ring-red-100 shadow-md'
                  : step.completed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-400 border border-gray-300'
              }`}
            >
              {step.completed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
            </div>
            <div className="space-y-1">
              <span
                className={`block text-xs md:text-sm font-bold leading-snug ${
                  step.completed && status === 'delivered'
                    ? 'text-emerald-700'
                    : step.current
                    ? 'text-[#E30019]'
                    : step.completed
                    ? 'text-gray-900'
                    : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
              {step.timestamp && (
                <span className="block text-xs text-gray-500 font-mono font-medium">{step.timestamp}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
