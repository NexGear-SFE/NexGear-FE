import { Outlet } from 'react-router-dom'
import { Header } from '@/components/customer/Header/Header'
import { Footer } from '@/components/customer/Footer/Footer'
import { SupportWidget } from '@/components/customer/SupportWidget'
import { CartDrawer } from '@/components/customer/Cart/CartDrawer'

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

      {/* Floating Support Widget (Technical Support, Zalo, Messenger) */}
      <SupportWidget />

      {/* Cart Drawer Slide-over Panel */}
      <CartDrawer />
    </div>
  )
}
