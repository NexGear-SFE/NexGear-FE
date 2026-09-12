import { useEffect } from 'react'
import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import { Header } from '@/components/customer/Header/Header'
import { Footer } from '@/components/customer/Footer/Footer'
import { SupportWidget } from '@/components/customer/SupportWidget'
import { CartDrawer } from '@/components/customer/Cart/CartDrawer'
import { QuickLoginModal } from '@/components/auth/QuickLoginModal'

export const MainLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F5F7]">
      <ScrollRestoration />

      {/* Top Header Wrapper */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 bg-[#F4F5F7] min-h-screen">
        <Outlet />
      </main>

      {/* Footer Wrapper */}
      <Footer />

      {/* Login Popup Modal (Chỉ hiển thị khi chưa đăng nhập) */}
      <QuickLoginModal />

      {/* Floating Support Widget (Technical Support, Zalo, Messenger) */}
      <SupportWidget />

      {/* Cart Drawer Slide-over Panel */}
      <CartDrawer />
    </div>
  )
}

