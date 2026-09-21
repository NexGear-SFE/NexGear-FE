import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { orderApi } from '@/apis/order.api'
import { useToast } from '@/hooks/useToast'
import { ROUTES } from '@/constants'
import type { Order } from '@/types/customer/order.type'

import { OrderHeader } from '@/components/customer/order/OrderHeader'
import { OrderTimeline } from '@/components/customer/order/OrderTimeline'
import { OrderItemList } from '@/components/customer/order/OrderItemList'
import { OrderShippingCard } from '@/components/customer/order/OrderShippingCard'
import { OrderPaymentCard } from '@/components/customer/order/OrderPaymentCard'
import { OrderSummaryCard } from '@/components/customer/order/OrderSummaryCard'
import { OrderActionsCard } from '@/components/customer/order/OrderActionsCard'
import { CancelOrderModal } from '@/components/customer/order/CancelOrderModal'

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { success, info } = useToast()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReasonInput, setCancelReasonInput] = useState('')

  useEffect(() => {
    let isMounted = true
    orderApi.getOrderById(id).then((res) => {
      if (isMounted) {
        if (res.success && res.data) {
          setOrder(res.data)
        } else {
          setOrder(null)
        }
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="bg-[#F4F5F7] min-h-screen py-10 font-body flex items-center justify-center">
        <div className="text-gray-500 text-sm font-medium">Đang tải thông tin đơn hàng...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="bg-[#F4F5F7] min-h-screen py-10 font-body flex flex-col items-center justify-center space-y-4">
        <div className="text-gray-700 font-semibold text-lg">Không tìm thấy đơn hàng</div>
        <Link to={`${ROUTES.ACCOUNT.SETTINGS}?tab=orders`} className="text-[#E30019] hover:underline text-sm font-medium">
          Quay lại danh sách đơn hàng
        </Link>
      </div>
    )
  }

  const handleReorder = () => {
    if (order.items.length === 1) {
      const targetSlug = order.items[0].slug || order.items[0].id
      navigate(ROUTES.PRODUCT_DETAIL(targetSlug))
    }
  }

  const showNotification = (msg: string) => {
    info(msg)
  }

  const handleConfirmCancel = async () => {
    const res = await orderApi.cancelOrder(order.id, cancelReasonInput)
    if (res.success) {
      success('Đã gửi yêu cầu hủy đơn hàng thành công!')
      setShowCancelModal(false)
      setTimeout(() => {
        navigate(`${ROUTES.ACCOUNT.SETTINGS}?tab=orders`)
      }, 1200)
    }
  }

  const totalItemCount = order.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="bg-[#F4F5F7] min-h-screen py-6 md:py-10 font-body relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* A. Thanh điều hướng Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-600 font-medium">
          <Link to={ROUTES.HOME} className="hover:text-[#E30019] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to={`${ROUTES.ACCOUNT.SETTINGS}?tab=orders`} className="hover:text-[#E30019] transition-colors">
            Đơn hàng của tôi
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold truncate">Chi tiết đơn hàng {order.orderCode}</span>
        </nav>

        {/* B. Đầu trang đơn hàng */}
        <OrderHeader
          orderCode={order.orderCode}
          createdAt={order.createdAt}
          totalAmount={order.totalAmount}
          status={order.status}
          statusLabel={order.statusLabel}
        />

        {/* C. Dòng thời gian trạng thái đơn hàng */}
        <OrderTimeline
          status={order.status}
          cancelReason={order.cancelReason}
          timeline={order.timeline}
        />

        {/* D. Nội dung chính (Lưới 2 cột) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CỘT TRÁI (chiếm 2/3 chiều rộng) */}
          <div className="lg:col-span-2 space-y-6">
            <OrderItemList items={order.items} />
            <OrderShippingCard shippingInfo={order.shippingInfo} />
            <OrderPaymentCard paymentInfo={order.paymentInfo} />
          </div>

          {/* CỘT PHẢI (chiếm 1/3 chiều rộng) */}
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

