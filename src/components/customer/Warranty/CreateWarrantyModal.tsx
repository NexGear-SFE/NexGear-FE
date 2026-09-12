import { useState } from 'react'
import { X, Check, ShieldCheck, Upload, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { MOCK_ELIGIBLE_WARRANTY_PRODUCTS } from '@/mocks/customer/warranty.mock'
import type { WarrantyEligibleProduct, CustomerWarrantyRequest } from '@/types/customerWarranty.type'
import { formatDate } from '@/utils/formatDate'

interface CreateWarrantyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: (newRequest: CustomerWarrantyRequest) => void
}

export function CreateWarrantyModal({ isOpen, onClose, onSubmitSuccess }: CreateWarrantyModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [selectedProduct, setSelectedProduct] = useState<WarrantyEligibleProduct | null>(
    MOCK_ELIGIBLE_WARRANTY_PRODUCTS[0] || null
  )

  // Step 2 Form States
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [discoveryDate, setDiscoveryDate] = useState(new Date().toISOString().split('T')[0])
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  // Created Request Code for Step 4 (Success)
  const [createdCode, setCreatedCode] = useState('')

  if (!isOpen) return null

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedProduct) {
        alert('Vui lòng chọn 1 sản phẩm cần bảo hành')
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      if (!reason.trim()) {
        alert('Vui lòng nhập lý do bảo hành')
        return
      }
      if (!description.trim()) {
        alert('Vui lòng nhập mô tả chi tiết sự cố sản phẩm')
        return
      }
      setCurrentStep(3)
    }
  }

  const handleSubmit = () => {
    if (!selectedProduct) return

    const newCode = `BH-2025-${Math.floor(1000 + Math.random() * 9000)}`
    setCreatedCode(newCode)

    const newReq: CustomerWarrantyRequest = {
      id: `req-${Date.now()}`,
      requestCode: newCode,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      sku: selectedProduct.sku,
      serialNumber: selectedProduct.serialNumber,
      orderCode: selectedProduct.orderCode,
      purchaseDate: selectedProduct.purchaseDate,
      warrantyExpirationDate: selectedProduct.warrantyUntil,
      reason,
      description,
      images: uploadedFiles.length > 0 ? uploadedFiles : [selectedProduct.image],
      status: 'pending',
      statusLabel: 'Chờ tiếp nhận',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      expectedCompletionDate: 'Đang cập nhật...',
      timeline: [
        {
          title: 'Chờ tiếp nhận',
          timestamp: `${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`,
          completed: true,
          current: true,
        },
        { title: 'Đã tiếp nhận', completed: false, current: false },
        { title: 'Đang kiểm tra', completed: false, current: false },
        { title: 'Đang sửa chữa', completed: false, current: false },
        { title: 'Đã hoàn tất', completed: false, current: false },
      ],
    }

    onSubmitSuccess(newReq)
    setCurrentStep(4) // Success screen
  }

  const handleMockUpload = () => {
    if (selectedProduct) {
      setUploadedFiles([selectedProduct.image])
      alert('Đã đính kèm hình ảnh minh chứng lỗi thành công!')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#E30019]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#040004] font-heading">
              Gửi yêu cầu bảo hành mới
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Header (Only for Steps 1, 2, 3) */}
        {currentStep < 4 && (
          <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-4 text-center">
            <div
              className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                currentStep === 1
                  ? 'border-[#E30019] text-[#E30019]'
                  : currentStep > 1
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-400'
              }`}
            >
              1. Chọn sản phẩm
            </div>
            <div
              className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                currentStep === 2
                  ? 'border-[#E30019] text-[#E30019]'
                  : currentStep > 2
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-400'
              }`}
            >
              2. Nhập thông tin lỗi
            </div>
            <div
              className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                currentStep === 3
                  ? 'border-[#E30019] text-[#E30019]'
                  : 'border-transparent text-gray-400'
              }`}
            >
              3. Xác nhận &amp; Gửi
            </div>
          </div>
        )}

        {/* STEP 1: SELECT PRODUCT */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600">
              Vui lòng chọn 1 sản phẩm đã mua còn trong thời hạn bảo hành để tạo yêu cầu:
            </p>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {MOCK_ELIGIBLE_WARRANTY_PRODUCTS.map((prod) => {
                const isSelected = selectedProduct?.id === prod.id
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`border rounded-[10px] p-4 flex items-center gap-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#E30019] bg-red-50/40 ring-1 ring-[#E30019]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-14 h-14 bg-[#F4F5F7] rounded-[8px] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-contain p-1" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-[#040004] leading-snug truncate">
                        {prod.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-500">
                        {prod.orderCode} · SN: {prod.serialNumber}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold">
                        Bảo hành đến: {prod.warrantyUntil}
                      </p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${
                        isSelected
                          ? 'bg-[#E30019] border-[#E30019] text-white'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-[6px] transition-all cursor-pointer shadow-xs"
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ISSUE DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-4 text-xs sm:text-sm">
            {selectedProduct && (
              <div className="bg-slate-50 p-3 rounded-[8px] border border-gray-200 flex items-center gap-3">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-10 h-10 object-contain" />
                <div>
                  <h4 className="font-bold text-[#040004] text-xs">{selectedProduct.name}</h4>
                  <p className="text-[11px] font-mono text-slate-500">SN: {selectedProduct.serialNumber}</p>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">
                Lý do bảo hành <span className="text-[#E30019] ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nhập lý do bảo hành (VD: Màn hình xuất hiện vết sáng góc trái, không lên nguồn...)"
                className="w-full border border-gray-300 rounded-[6px] p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#E30019]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">
                Mô tả sự cố chi tiết <span className="text-[#E30019] ml-0.5">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả hoàn cảnh phát sinh lỗi (VD: Khi chơi game nặng bị giật màn hình, khi cắm sạc máy bốc mùi khét nhẹ...)"
                className="w-full border border-gray-300 rounded-[6px] p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#E30019]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">Thời điểm phát hiện lỗi</label>
              <input
                type="date"
                value={discoveryDate}
                onChange={(e) => setDiscoveryDate(e.target.value)}
                className="w-full border border-gray-300 rounded-[6px] p-2 text-xs text-gray-800 focus:outline-none focus:border-[#E30019]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">Ảnh / Video đính kèm minh chứng (Không bắt buộc)</label>
              <div
                onClick={handleMockUpload}
                className="border-2 border-dashed border-gray-300 hover:border-[#E30019] rounded-[8px] p-4 text-center cursor-pointer transition-all bg-slate-50/50"
              >
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-slate-600 font-medium">Bấm để tải lên ảnh hoặc video chứng minh lỗi</p>
                {uploadedFiles.length > 0 && (
                  <p className="text-xs text-emerald-600 font-bold mt-1">✓ Đã đính kèm 1 file minh chứng</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-[6px] transition-all cursor-pointer shadow-xs"
              >
                <span>Xem lại &amp; Xác nhận</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & SUBMIT */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs sm:text-sm">
            <h4 className="font-bold text-base text-[#040004] font-heading">
              Xác nhận thông tin yêu cầu bảo hành
            </h4>

            {selectedProduct && (
              <div className="bg-slate-50 rounded-[10px] p-4 border border-gray-200 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-12 h-12 object-contain" />
                  <div>
                    <h5 className="font-bold text-slate-900">{selectedProduct.name}</h5>
                    <p className="text-xs font-mono text-slate-500">
                      {selectedProduct.orderCode} · SN: {selectedProduct.serialNumber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 text-xs">
                  <div>
                    <span className="text-slate-500 block">Lý do bảo hành:</span>
                    <strong className="text-slate-900">{reason}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Thời điểm phát hiện:</span>
                    <strong className="text-slate-900">{formatDate(discoveryDate)}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Mô tả sự cố:</span>
                    <p className="text-slate-800 leading-relaxed font-medium bg-white p-2 rounded border border-gray-200 mt-1">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-3 text-xs text-amber-800">
              * Sau khi gửi yêu cầu, vui lòng mang sản phẩm đến Showroom gần nhất để được Kỹ thuật viên tiếp nhận và thẩm định trực tiếp.
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Chỉnh sửa thông tin</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-[6px] transition-all cursor-pointer shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Gửi yêu cầu bảo hành</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {currentStep === 4 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#040004] font-heading">
                Gửi yêu cầu bảo hành thành công!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Mã yêu cầu của bạn là:{' '}
                <strong className="text-[#E30019] font-mono text-base">{createdCode}</strong>
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto pt-2">
                Hệ thống đã tiếp nhận yêu cầu của bạn. Nhân viên chăm sóc khách hàng sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-[6px] transition-all cursor-pointer shadow-xs"
              >
                Hoàn tất &amp; Quay lại danh sách
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
