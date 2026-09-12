import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronRight,
  Package,
  Truck,
  CreditCard,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  AlertCircle,
  Headphones,
  RotateCcw,
  XCircle,
} from 'lucide-react'
import { MOCK_ORDERS } from '@/mocks/customer/order.mock'
import { formatCurrency } from '@/utils/formatCurrency'
import { cartStore } from '@/stores/cartStore'

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReasonInput, setCancelReasonInput] = useState('')

  // Find order by ID or fallback to first order
  const order = MOCK_ORDERS.find((o) => o.id === id || o.orderCode === id) || MOCK_ORDERS[0]

  const handleReorder = () => {
    order.items.forEach((item) => {
      cartStore.addItem(
        {
          id: item.id,
          name: item.name,
          slug: item.sku.toLowerCase(),
          price: item.price,
          image: item.image,
          category: 'pc',
          specs: [],
          inStock: true,
        },
        item.quantity
      )
    })
    cartStore.openDrawer()
  }

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Đã giao
          </span>
        )
      case 'shipping':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            Đang giao hàng
          </span>
        )
      case 'pending':
      case 'confirmed':
      case 'processing':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {order.statusLabel || 'Chờ xác nhận'}
          </span>
        )
      case 'cancelled':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            Đã hủy
          </span>
        )
      default:
        return (
          <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-[4px]">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="bg-[#F4F5F7] min-h-screen py-6 md:py-10 font-body">
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

        {/* B. Page Header */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Link
              to="/account/settings?tab=orders"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-600 hover:text-[#E30019] transition-colors mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Đơn hàng của tôi</span>
            </Link>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#040004]">
                Chi tiết đơn hàng {order.orderCode}
              </h1>
              {renderStatusBadge(order.status)}
            </div>
            <p className="text-xs md:text-sm text-gray-600 font-medium">
              Đặt ngày {order.createdAt} · Tổng tiền{' '}
              <strong className="text-[#E30019] font-bold text-sm md:text-base">{formatCurrency(order.totalAmount)}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:18009999"
              className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#E30019] text-gray-700 hover:text-[#E30019] text-xs md:text-sm font-bold px-4 py-2.5 rounded-[6px] transition-all bg-white shadow-2xs"
            >
              <Headphones className="w-4 h-4" />
              <span>Hỗ trợ: 1800-9999</span>
            </a>
          </div>
        </div>

        {/* C. Order Status Timeline */}
        {order.status === 'cancelled' ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4 text-red-800">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs md:text-sm">
              <h4 className="font-bold text-sm md:text-base text-red-900">Đơn hàng này đã bị hủy</h4>
              <p>
                <strong>Lý do hủy:</strong> {order.cancelReason || 'Khách hàng yêu cầu hủy đơn.'}
              </p>
              <p className="text-red-700">
                Nếu bạn đã thực hiện thanh toán trước, số tiền sẽ được hoàn trả lại tài khoản trong vòng 24-48 giờ làm việc.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-5">
            <h3 className="text-sm md:text-base font-bold text-[#040004] font-heading uppercase tracking-wider">
              Tiến trình đơn hàng
            </h3>

            {/* Stepper Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-2 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step.completed && order.status === 'delivered'
                        ? 'bg-emerald-600 text-white'
                        : step.current
                        ? 'bg-[#E30019] text-white ring-4 ring-red-100 shadow-md'
                        : step.completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-400 border border-gray-300'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div className="space-y-1">
                    <span
                      className={`block text-xs md:text-sm font-bold leading-snug ${
                        step.completed && order.status === 'delivered'
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
        )}

        {/* D. Main Content (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Card */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base md:text-lg font-bold text-[#040004] font-heading flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#E30019]" />
                  <span>Sản phẩm trong đơn hàng ({order.items.length})</span>
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F4F5F7] rounded-[8px] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h4 className="font-bold text-sm sm:text-base text-[#040004] leading-snug line-clamp-2">
                        {item.name}
                      </h4>
                      {item.variant && (
                        <p className="text-xs md:text-sm text-gray-600 font-medium truncate">{item.variant}</p>
                      )}
                      <p className="text-xs md:text-sm font-mono text-gray-500 font-medium">SKU: {item.sku}</p>
                    </div>

                    <div className="text-right shrink-0 space-y-1">
                      <div className="text-sm md:text-base font-bold text-[#E30019]">
                        {formatCurrency(item.price)}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 font-medium">x{item.quantity}</div>
                      <div className="text-xs md:text-sm font-bold text-gray-900">
                        = {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information Card */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base md:text-lg font-bold text-[#040004] font-heading flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#E30019]" />
                  <span>Thông tin giao hàng</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs md:text-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <User className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 font-medium block">Người nhận hàng:</span>
                      <strong className="text-gray-900 text-sm md:text-base font-bold">{order.shippingInfo.recipientName}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 font-medium block">Số điện thoại:</span>
                      <strong className="text-gray-900 text-xs md:text-sm font-bold font-mono">{order.shippingInfo.phone}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 font-medium block">Địa chỉ nhận hàng:</span>
                      <p className="text-gray-800 text-xs md:text-sm font-medium leading-relaxed">
                        {order.shippingInfo.address}, {order.shippingInfo.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 bg-gray-50 p-4 rounded-[8px] border border-gray-200/70">
                  <div>
                    <span className="text-slate-500 font-medium block">Đơn vị vận chuyển:</span>
                    <strong className="text-gray-900 text-xs md:text-sm font-semibold">{order.shippingInfo.shippingMethod}</strong>
                  </div>

                  {order.shippingInfo.trackingCode && (
                    <div>
                      <span className="text-slate-500 font-medium block">Mã vận đơn:</span>
                      <strong className="text-[#E30019] text-xs md:text-sm font-mono font-bold">{order.shippingInfo.trackingCode}</strong>
                    </div>
                  )}

                  {order.shippingInfo.actualDelivery && (
                    <div>
                      <span className="text-slate-500 font-medium block">Thời gian giao thực tế:</span>
                      <span className="text-gray-800 text-xs md:text-sm font-medium">{order.shippingInfo.actualDelivery}</span>
                    </div>
                  )}

                  {order.shippingInfo.note && (
                    <div>
                      <span className="text-slate-500 font-medium block">Ghi chú giao hàng:</span>
                      <span className="text-gray-700 text-xs md:text-sm italic">{order.shippingInfo.note}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Information Card */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base md:text-lg font-bold text-[#040004] font-heading flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#E30019]" />
                  <span>Thông tin thanh toán</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div>
                  <span className="text-slate-500 font-medium block">Phương thức thanh toán:</span>
                  <strong className="text-gray-900 text-sm md:text-base font-semibold">{order.paymentInfo.method}</strong>
                </div>

                <div>
                  <span className="text-slate-500 font-medium block mb-1">Trạng thái thanh toán:</span>
                  {order.paymentInfo.status === 'paid' ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded text-xs md:text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Đã thanh toán
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded text-xs md:text-sm font-bold">
                      <Clock className="w-4 h-4" />
                      Chưa thanh toán
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (1/3 width - Summary & Actions) */}
          <div className="space-y-6">
            {/* Order Summary Breakdown */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#040004] font-heading pb-3 border-b border-gray-100">
                Tổng cộng đơn hàng
              </h3>

              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Tạm tính ({order.items.reduce((s, i) => s + i.quantity, 0)} sản phẩm)</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(order.subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-slate-900">
                    {order.shippingFee > 0 ? formatCurrency(order.shippingFee) : 'Miễn phí'}
                  </span>
                </div>

                {order.discountFee > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Giảm giá khuyến mãi</span>
                    <span className="font-semibold">-{formatCurrency(order.discountFee)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="text-sm md:text-base font-bold text-slate-900">Tổng tiền thanh toán</span>
                  <span className="text-xl md:text-2xl font-bold text-[#E30019]">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons based on Status */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 shadow-xs space-y-3">
              <h3 className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
                Thao tác với đơn hàng
              </h3>

              {order.status === 'delivered' && (
                <>
                  <button
                    type="button"
                    onClick={handleReorder}
                    className="w-full bg-[#E30019] hover:bg-[#cc0016] text-white font-bold py-3 px-4 rounded-[6px] flex items-center justify-center gap-2 text-xs md:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Mua lại đơn hàng này</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert('Chức năng Đánh giá sản phẩm đang được cập nhật!')}
                    className="w-full border border-gray-300 hover:border-gray-400 text-gray-800 font-bold py-3 px-4 rounded-[6px] text-xs md:text-sm transition-all cursor-pointer"
                  >
                    Đánh giá sản phẩm
                  </button>
                </>
              )}

              {order.status === 'pending' && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                    className="w-full bg-red-50 hover:bg-red-100 text-[#E30019] border border-red-200 font-bold py-3 px-4 rounded-[6px] text-xs md:text-sm transition-all cursor-pointer"
                  >
                    Hủy đơn hàng này
                  </button>
                </>
              )}

              {(order.status === 'shipping' || order.status === 'processing') && (
                <button
                  type="button"
                  onClick={() => alert(`Mã vận đơn: ${order.shippingInfo.trackingCode || 'NEX-7739102'}`)}
                  className="w-full bg-black text-white hover:bg-zinc-800 font-bold py-3 px-4 rounded-[6px] text-xs md:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Tra cứu vận chuyển</span>
                </button>
              )}

              {order.status === 'cancelled' && (
                <button
                  type="button"
                  onClick={handleReorder}
                  className="w-full bg-[#E30019] hover:bg-[#cc0016] text-white font-bold py-3 px-4 rounded-[6px] flex items-center justify-center gap-2 text-xs md:text-sm transition-all shadow-sm cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Đặt lại sản phẩm này</span>
                </button>
              )}

              <a
                href="tel:18009999"
                className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold py-2.5 px-4 rounded-[6px] text-xs md:text-sm transition-all flex items-center justify-center gap-2"
              >
                <Headphones className="w-4 h-4 text-gray-500" />
                <span>Liên hệ chăm sóc khách hàng</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Hủy Đơn hàng */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
              <h3 className="text-lg font-bold text-[#040004] font-heading">
                Xác nhận Hủy Đơn hàng {order.orderCode}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bạn có chắc chắn muốn hủy đơn hàng này không? Vui lòng chọn hoặc nhập lý do hủy đơn:
              </p>

              <textarea
                rows={3}
                value={cancelReasonInput}
                onChange={(e) => setCancelReasonInput(e.target.value)}
                placeholder="Nhập lý do hủy đơn (ví dụ: Thay đổi địa chỉ, Đổi sản phẩm khác...)"
                className="w-full border border-gray-300 rounded-[6px] p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#E30019]"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-[6px] cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Đã gửi yêu cầu hủy đơn hàng thành công!')
                    setShowCancelModal(false)
                    navigate('/account/settings?tab=orders')
                  }}
                  className="px-4 py-2 text-xs font-bold bg-[#E30019] text-white rounded-[6px] hover:bg-[#cc0016] cursor-pointer"
                >
                  Xác nhận Hủy Đơn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
