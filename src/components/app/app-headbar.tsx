import { Flex, Image } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/menu'
import { TbSquareRoundedChevronDownFilled } from 'react-icons/tb'
import logoImage from '@/assets/logo.png'
import { MenuToggleButton } from './menu-toggle-button'
import { Router, useRouter } from 'next/router'
import useAuthStore from '@/core/users/stores/useAuthStore'
import stringToColor from 'string-to-color'
import fontColorContrast from 'font-color-contrast'
import qs from 'query-string'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { User } from '@/core/users/types'
import NextImage from 'next/image'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'

export function AppHeadbar({}: React.PropsWithChildren<{}>) {
  const navigate = useRouter()
  const showHeader = ['/auth', '/booking', '/event/'].some((x) =>
    navigate.route.includes(x)
  )
  if (showHeader) return null
  return <AppBarContent />
}

function AppBarContent() {
  const navigate = useRouter()

  const { isLoggedIn, isLoading, user } = useAuthStore()
  const { data: userInfo } = useQuery({
    queryKey: ['me'],
    enabled: isLoggedIn,
    queryFn: () => ky.get('/api/users/me').json<User>(),
  })
  const { backgroundColor, foregroundColor } = useMemo(() => {
    const backgroundColor = stringToColor(user?.username || '')
    const foregroundColor = fontColorContrast(backgroundColor)
    return {
      backgroundColor,
      foregroundColor,
    }
  }, [user])

  const avatarUrl = useMemo(() => {
    if (!userInfo) return undefined

    return qs.stringifyUrl({
      url: 'https://ui-avatars.com/api/?uppercase=true',
      query: {
        name: `${userInfo?.name} ${userInfo?.surname}`,
        background: backgroundColor,
        color: foregroundColor,
      },
    })
  }, [backgroundColor, foregroundColor, user, userInfo])

  return (
    <Flex
      direction="row"
      bg="rgba(255, 255, 255, 0.21)"
      h="80px"
      alignItems="center"
      justify="center"
      w="100dvw"
      backdropFilter="saturate(180%) blur(9px)"
      position="absolute"
      top={0}
      left={0}
      right={0}
    >
      {/* {isLoggedIn ? <MenuToggleButton /> : null} */}
      <Flex h="52px" justify="space-between" maxW="1100px" w="100%">
        <Flex
          visibility={isLoggedIn ? 'visible' : 'hidden'}
          justify="flex-start"
          alignItems="center"
          flexShrink={0}
        >
          {/* <NextImage
            style={{ marginRight: '16px', height: '40px' }}
            src={logoImage}
            alt="logo"
            height={40}
          /> */}
          <Button
            ml="16px"
            textShadow="xs"
            color="white"
            onClick={() => navigate.push('/')}
          >
            Home
          </Button>
          {/* <Button hideBelow="md" mr="16px">
            Eventos
          </Button> */}
        </Flex>
        <Flex
          justify="flex-end"
          flexShrink={0}
          flexBasis="50%"
          alignItems="center"
        >
          {isLoggedIn ? (
            <Button
              onClick={() => navigate.push('/event/new')}
              bg="white"
              color="black"
              px="16px"
              mr="16px"
            >
              Criar Eventos
            </Button>
          ) : (
            <Button
              onClick={() => navigate.push('/auth/register')}
              bg="white"
              color="black"
              px="16px"
              mr="16px"
            >
              Cadastrar
            </Button>
          )}
          {isLoggedIn ? (
            <MenuRoot>
              <MenuTrigger asChild className="mr-[1rem]">
                <Button>
                  <Avatar borderWidth={2} borderColor="white" src={avatarUrl} />
                  <TbSquareRoundedChevronDownFilled />
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem
                  onClick={() => {
                    navigate.push('/tickets/my-tickets')
                  }}
                  cursor="pointer"
                  value="mytickets"
                >
                  Meus Tickets
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate.push('/auth/logout')
                    window.location.reload()
                  }}
                  cursor="pointer"
                  color="red"
                  value="logout"
                >
                  Sair
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          ) : (
            <Button
              mr={4}
              px={6}
              className="bg-orange"
              onClick={() => navigate.push('/auth/login')}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
