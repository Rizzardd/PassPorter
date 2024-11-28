import Wallpaper from '@/assets/wallpaper.png'
import Image from 'next/image'
import { Flex } from '@chakra-ui/react'
import { Avatar } from '@/components/ui/avatar'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

import { User } from '@/core/users/types'
import fontColorContrast from 'font-color-contrast'
import { useMemo } from 'react'
import stringToColor from 'string-to-color'
import qs from 'query-string'

export default function TranslucentCard({ user }: { user: User }) {
  const { backgroundColor, foregroundColor } = useMemo(() => {
    const backgroundColor = stringToColor(user?.username || '')
    const foregroundColor = fontColorContrast(backgroundColor)
    return {
      backgroundColor,
      foregroundColor,
    }
  }, [user])

  const avatarUrl = useMemo(() => {
    if (!user) return undefined

    return qs.stringifyUrl({
      url: 'https://ui-avatars.com/api/?uppercase=true',
      query: {
        name: `${user?.name} ${user?.surname}`,
        background: backgroundColor,
        color: foregroundColor,
      },
    })
  }, [backgroundColor, foregroundColor, user, user])

  return (
    <Flex
      maxH={['auto', 'auto', '300px']}
      className=" justify-items-center h-fit rounded-t-lg relative "
    >
      <Image alt="" src={Wallpaper} />
      <div className="absolute bottom-0 w-full  ">
        <Flex
          direction="row"
          bg="rgba(0,0,0,0.8)"
          h="125px"
          alignItems="center"
          justify="center"
          backdropFilter="saturate(180%) blur(9px)"
          className="rounded-t-3xl"
        >
          <div className=" flex flex-wrap gap-2  px-5">
            <Avatar size="2xl" src={avatarUrl} />
          </div>
          <div className=" px-2 flex flex-col w-full mx-auto">
            <div className="flex flex-row w-full gap-2">
              <h1 className="font-display text-white font-normal text-[15px]">
                {`${user?.name} ${user?.surname}`}
              </h1>
              <RiVerifiedBadgeFill className="mt-[3px] text-light-green" />
            </div>
            <p className="font-display text-white font-thin text-[13px]">
              Organizador
            </p>
          </div>
        </Flex>
      </div>
    </Flex>
  )
}
