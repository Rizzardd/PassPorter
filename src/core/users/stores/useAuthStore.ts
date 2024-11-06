import { create } from 'zustand'
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface User {
  userId: string
  email: string
  username: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  isLoading: boolean
  checkAuth: () => void
  login: (token: string) => void
  logout: () => void
}

interface DecodedToken extends JwtPayload {
  userId: string
  email: string
  username: string
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: true,

  checkAuth: () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        const isTokenExpired = decoded.exp && decoded.exp * 1000 < Date.now()

        if (!isTokenExpired) {
          set({
            token,
            user: {
              userId: decoded.userId,
              email: decoded.email,
              username: decoded.username,
            },
            isLoggedIn: true,
            isLoading: false,
          })
          return
        }
      } catch (error) {
        console.error('Invalid token', error)
      }
    }
    set({ token: null, user: null, isLoggedIn: false, isLoading: false })
  },

  login: (token: string) => {
    localStorage.setItem('token', token)
    const decoded = jwtDecode<DecodedToken>(token)
    set({
      token,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        username: decoded.username,
      },
      isLoggedIn: true,
      isLoading: false,
    })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null, isLoggedIn: false, isLoading: false })
  },
}))

export default useAuthStore
