import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { ToastProvider } from '@/providers/ToastProvider'
import { AuthProvider } from '@/providers/AuthProvider'

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
