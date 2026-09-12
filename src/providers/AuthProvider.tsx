import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { User, LoginPayload } from '@/types/auth.type'
import { MOCK_USERS } from '@/mocks/auth.mock'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { useToast } from '@/hooks/useToast'
import { AuthContext } from '@/contexts/AuthContext'

const getInitialUser = (): User | null => {
  try {
    const storedUserLocal = localStorage.getItem(STORAGE_KEYS.AUTH_USER)
    const storedUserSession = sessionStorage.getItem(STORAGE_KEYS.AUTH_USER)

    if (storedUserLocal) {
      return JSON.parse(storedUserLocal)
    }
    if (storedUserSession) {
      return JSON.parse(storedUserSession)
    }
  } catch (err) {
    console.error('Failed to parse stored auth user', err)
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_USER)
  }
  return null
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getInitialUser)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const { success, error, info } = useToast()

  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), [])
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), [])

  const login = useCallback(
    ({ email, password, rememberMe = true }: LoginPayload) => {
      const normalizedEmail = email.trim().toLowerCase()
      const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === normalizedEmail)

      if (!foundUser) {
        error('Tài khoản không tồn tại! Vui lòng chọn một trong các tài khoản test.')
        return { success: false, error: 'Tài khoản không tồn tại' }
      }

      if (password && password.trim() === '') {
        error('Vui lòng nhập mật khẩu!')
        return { success: false, error: 'Mật khẩu không được để trống' }
      }

      setUser(foundUser)

      const userJson = JSON.stringify(foundUser)
      const mockToken = `mock-jwt-token-${foundUser.id}-${Date.now()}`

      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, userJson)
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken)
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true')
      } else {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_USER, userJson)
        sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken)
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
      }

      success(`Đăng nhập thành công! Quyền: ${foundUser.roleName}`)
      setIsLoginModalOpen(false)

      return { success: true, user: foundUser }
    },
    [error, success]
  )

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME)
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_USER)
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    info('Đã đăng xuất tài khoản!')
  }, [info])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
