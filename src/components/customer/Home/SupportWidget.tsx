import { useState } from 'react'
import { Headphones, X } from 'lucide-react'
import { MessengerIcon } from '@/assets/icons'

export const SupportWidget = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(true)

  const handleOpenTechSupport = () => {
    alert('Đang kết nối với Nhân viên Kỹ thuật NexGear... Hotline: 1800-8888')
  }

  const handleOpenZalo = () => {
    window.open('https://zalo.me', '_blank', 'noopener,noreferrer')
  }

  const handleOpenMessenger = () => {
    window.open('https://m.me', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 select-none">
      {/* 1. Main Technical Support Button with Speech Bubble */}
      <div className="flex items-center gap-2.5">
        {/* Red Speech Bubble "Bạn cần hỗ trợ gì?" */}
        {showSpeechBubble && (
          <div className="bg-[#E30019] text-white px-4 py-2.5 rounded-full font-bold text-sm shadow-xl flex items-center gap-2.5 text-nowrap animate-in fade-in slide-in-from-right-4 duration-200 border border-white/20">
            <span>Bạn cần hỗ trợ gì?</span>
            <button
              type="button"
              aria-label="Đóng thông báo"
              onClick={() => setShowSpeechBubble(false)}
              className="w-5 h-5 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center text-xs transition-mechanical cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Technical Support Avatar Button */}
        <button
          type="button"
          aria-label="Chat với Nhân viên Kỹ thuật"
          onClick={handleOpenTechSupport}
          className="relative group bg-[#E30019] hover:bg-[#B30014] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-mechanical cursor-pointer active:scale-95 border-2 border-white"
        >
          <Headphones className="w-7 h-7" />

          {/* Active Status Indicator Dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#00A859] border-2 border-white rounded-full" />

          {/* Tooltip on Hover */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#040004] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
            Hỗ trợ Kỹ thuật viên 24/7
          </div>
        </button>
      </div>

      {/* 2. Zalo Support Button */}
      <button
        type="button"
        aria-label="Chat Zalo với Kỹ thuật viên"
        onClick={handleOpenZalo}
        className="relative group bg-white border-2 border-blue-500 text-[#0068FF] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-mechanical hover:scale-105 cursor-pointer active:scale-95"
      >
        <span className="font-extrabold text-sm tracking-tighter text-[#0068FF]">Zalo</span>

        {/* Tooltip on Hover */}
        <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-[#040004] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
          Chat Zalo tư vấn
        </div>
      </button>

      {/* 3. Messenger Support Button */}
      <button
        type="button"
        aria-label="Chat Messenger với Kỹ thuật viên"
        onClick={handleOpenMessenger}
        className="relative group bg-gradient-to-tr from-[#0084FF] via-[#A033FF] to-[#FF5252] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-mechanical hover:scale-105 cursor-pointer active:scale-95 border-2 border-white"
      >
        <MessengerIcon className="w-6 h-6 fill-white" />

        {/* Tooltip on Hover */}
        <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-[#040004] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
          Chat Messenger
        </div>
      </button>
    </div>
  )
}
