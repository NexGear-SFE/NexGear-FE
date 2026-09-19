import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { MOCK_ORDERS } from '@/mocks/customer/order.mock'
import { orderApi } from '@/apis/order.api'

import { OrderHeader } from '@/components/customer/Order/OrderHeader'
import { OrderTimeline } from '@/components/customer/Order/OrderTimeline'
import { OrderItemList } from '@/components/customer/Order/OrderItemList'
import { OrderShippingCard } from '@/components/customer/Order/OrderShippingCard'
import { OrderPaymentCard } from '@/components/customer/Order/OrderPaymentCard'
import { OrderSummaryCard } from '@/components/customer/Order/OrderSummaryCard'
import { OrderActionsCard } from '@/components/customer/Order/OrderActionsCard'
import { CancelOrderModal } from '@/components/customer/Order/CancelOrderModal'

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReasonInput, setCancelReasonInput] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Find order by ID or fallback to first order
  const order = MOCK_ORDERS.find((o) => o.id === id || o.orderCode === id) || MOCK_ORDERS[0]

  const handleReorder = () => {
    if (order.items.length === 1) {
      navigate(`/products/${order.items[0].id}`)
    }
  }

  const showNotification = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleConfirmCancel = async () => {
    const res = await orderApi.cancelOrder(order.id, cancelReasonInput)
    if (res.success) {
      showNotification('Đã gửi yêu cầu hủy đơn hàng thành công!')
      setShowCancelModal(false)
      setTimeout(() => {
        navigate('/account/settings?tab=orders')
      }, 1200)
    }
  }

  const totalItemCount = order.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="bg-[#F4F5F7] min-h-screen py-6 md:py-10 font-body relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#040004] text-white px-5 py-3 rounded-[8px] border border-[#E30019] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#00A859] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* A. Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-600 font-medium">
          <Link to="/" className="hover:text-[#E30019] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/account/settings?tab=orders" className="hover:text-[#E30019] transition-colors">
            Đơn hàng của tôi
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold truncate">Chi tiết đơn hàng {order.orderCode}</span>
        </nav>

        {/* B. Order Header */}
        <OrderHeader
          orderCode={order.orderCode}
          createdAt={order.createdAt}
          totalAmount={order.totalAmount}
          status={order.status}
          statusLabel={order.statusLabel}
        />

        {/* C. Order Status Timeline */}
        <OrderTimeline
          status={order.status}
          cancelReason={order.cancelReason}
          timeline={order.timeline}
        />

        {/* D. Main Content (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <OrderItemList items={order.items} />
            <OrderShippingCard shippingInfo={order.shippingInfo} />
            <OrderPaymentCard paymentInfo={order.paymentInfo} />
          </div>

          {/* RIGHT COLUMN (1/3 width) */}
          <div className="space-y-6">
            <OrderSummaryCard
              subtotal={order.subtotal}
              shippingFee={order.shippingFee}
              totalAmount={order.totalAmount}
              itemCount={totalItemCount}
            />

            <OrderActionsCard
              status={order.status}
              trackingCode={order.shippingInfo.trackingCode}
              itemCount={order.items.length}
              onReorder={handleReorder}
              onOpenCancelModal={() => setShowCancelModal(true)}
              onShowNotification={showNotification}
            />
          </div>
        </div>

        {/* Modal Hủy Đơn hàng */}
        <CancelOrderModal
          isOpen={showCancelModal}
          orderCode={order.orderCode}
          reasonInput={cancelReasonInput}
          onChangeReason={setCancelReasonInput}
          onClose={() => setShowCancelModal(false)}
          onConfirmCancel={handleConfirmCancel}
        />
      </div>
    </div>
  )
}
