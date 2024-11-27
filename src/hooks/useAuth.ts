import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    ;(async () => {
      const token = await getCookie('jwt:access_token')

      setIsAuthenticated(!!token)
    })()
  }, [])

  return { isAuthenticated }
}
