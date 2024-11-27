import { HeroBanner } from '@/components/app/hero-banner'
import { EventCard } from '@/components/app/event-card'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import { Flex, Grid, Icon, Input } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { IoIosColorPalette, IoIosPin } from 'react-icons/io'
import {
  IoBalloon,
  IoBaseball,
  IoBook,
  IoFastFood,
  IoGrid,
  IoMusicalNotesSharp,
  IoTicket,
} from 'react-icons/io5'
import { EventCardItem, EventItem } from '@/core/events/types'
import { useScreenWidth } from '@/hooks/useScreenWidth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Urbanist } from 'next/font/google'
import { HomeSearchArea } from '@/components/app/home-search-area'
import ky from 'ky'
import { EventRepository } from '@/core/users/repositories/event.repository'
import dayjs from 'dayjs'

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
})

const CardCategory = [
  { icon: <IoGrid />, name: 'Todos' },
  { icon: <IoIosColorPalette />, name: 'Artes' },
  { icon: <IoBaseball />, name: 'Esportes' },
  { icon: <IoBook />, name: 'Acadêmico' },
  { icon: <IoMusicalNotesSharp />, name: 'Música' },
  { icon: <IoBalloon />, name: 'Festival' },
  { icon: <IoFastFood />, name: 'Gastronomia' },
]

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const events = await new EventRepository().getHighlights()
    return { props: { events } }
  } catch (error) {
    console.error(error)
    return { props: { events: null } }
  }
}

interface EventsPageProps {
  events: EventItem[] | null
}

export default function Home({ events }: EventsPageProps) {
  const screen = useScreenWidth()
  const navigate = useRouter()

  return (
    <Flex flexDirection="column" alignItems="center">
      <HeroBanner />
      <Flex flexDirection="column" p="36px" maxW="1440px">
        <HomeSearchArea />
        <Flex
          mt={['32px', '32px', '32px']}
          justifyContent={['center', 'center', 'center', 'space-between']}
          flexWrap="wrap"
          gap={['8px', '8px', '12px', '0']}
        >
          {CardCategory.map((e, i) => (
            <Button
              flexGrow={[1, 0]}
              px={['8px', '8px', '16px', '24px']}
              fontSize={['14px', '14px', '18px', '20px']}
              my={['8px', '8px', '8px']}
              fontWeight="300"
              bg="#303030"
              size={['md', 'md', 'xl', '2xl']}
            >
              <Icon
                color="#F68A66"
                w={['24px', '24px', '24px', '32px']}
                h={['24px', '24px', '24px', '32px']}
              >
                {e.icon}
              </Icon>
              {e.name}
            </Button>
          ))}
        </Flex>
        <Flex pt="32px" flexWrap="wrap">
          {events?.map((e, i) => (
            <Flex
              w={['100%', '50%', '50%', '25%']}
              px="16px"
              pb="32px"
              onClick={() => navigate.push(`/event/${e._id}`)}
            >
              <EventCard
                key={i}
                _id={e._id}
                name={e.name}
                date={dayjs(e.date).toDate()}
                imageUrl={e.imageUrl!}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
