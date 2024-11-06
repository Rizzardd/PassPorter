import { AppHeadbar } from '@/components/app/app-headbar'
import '@/styles/globals.css'
import { Provider } from '@/components/ui/provider'
import type { AppProps } from 'next/app'
import { Flex, Text } from '@chakra-ui/react'
import { LayoutStoreProvider } from '@/providers/layout-store.provider'
import AppSidebar from '@/components/app/app-sidebar'
import useAuthStore from '@/core/users/stores/useAuthStore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const protectedRoutes = ['/booking/booking-details']
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { isLoggedIn, isLoading, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (
      !isLoading &&
      !isLoggedIn &&
      protectedRoutes.includes(router.pathname)
    ) {
      router.push('/auth/login')
    }
  }, [isLoggedIn, isLoading, router.pathname])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <Provider>
      <LayoutStoreProvider>
        <Flex direction="column">
          <AppHeadbar />
          <AppSidebar>
            <div>
              <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
              >
                <Text
                  fontSize="2xl"
                  fontFamily="monospace"
                  fontWeight="bold"
                  mt={-2}
                >
                  Logo
                </Text>
              </Flex>
            </div>
          </AppSidebar>
          <Component {...pageProps} />
        </Flex>
      </LayoutStoreProvider>
    </Provider>
  )
}
