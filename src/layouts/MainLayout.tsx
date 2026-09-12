import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { LoginModal } from '@/components/Auth/LoginModal'
import { Bot } from 'lucide-react'

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F5F7]">
      {/* Top Header Wrapper */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 bg-[#F4F5F7] min-h-screen">
        <Outlet />
      </main>

      {/* Footer Wrapper */}
      <Footer />

      {/* Login Popup Modal */}
      <LoginModal />

      {/* Floating Action Button (Chatbot Support) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          aria-label="Hỗ trợ AI Chatbot"
          className="relative group bg-[#E30019] hover:bg-[#B30014] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-mechanical cursor-pointer active:scale-95"
        >
          <Bot className="w-7 h-7" />
          
          {/* Active Status Indicator Pulse */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#00A859] border-2 border-white rounded-full" />

          {/* Tooltip on Hover */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#040004] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
            Tư vấn AI 24/7
          </div>
        </button>
      </div>
    </div>
  )
}

