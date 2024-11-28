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
import { useQuery } from '@tanstack/react-query'

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
})

const CardCategory = [
  { icon: <IoGrid />, name: 'Todos', value: '' },
  { icon: <IoIosColorPalette />, name: 'Artes', value: 'artes' },
  { icon: <IoBaseball />, name: 'Esportes', value: 'esportes' },
  { icon: <IoBook />, name: 'Acadêmico', value: 'academico' },
  { icon: <IoMusicalNotesSharp />, name: 'Música', value: 'musica' },
  { icon: <IoBalloon />, name: 'Festival', value: 'festival' },
  { icon: <IoFastFood />, name: 'Gastronomia', value: 'gastronomia' },
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
  const [name, setName] = useState<string>('')
  const [locale, setLocale] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const { refetch, data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const result = await ky
        .get('/api/events', {
          searchParams: {
            name,
            locale,
            category,
          },
        })
        .json<EventItem[]>()
      console.log({ result })
      return result
    },
    initialData: events,
    enabled: false,
  })

  useEffect(() => {
    refetch()
  }, [category])

  console.log({ data })

  return (
    <Flex flexDirection="column" alignItems="center">
      <HeroBanner />
      <Flex flexDirection="column" p="36px" maxW="1440px">
        <HomeSearchArea
          loading={isLoading}
          onNameChange={setName}
          onLocaleChange={setLocale}
          name={name}
          locale={locale}
          onSearch={() => refetch()}
        />
        <Flex
          mt={['32px', '32px', '32px']}
          justifyContent={['center', 'center', 'center', 'space-between']}
          flexWrap="wrap"
          gap={['8px', '8px', '12px', '0']}
        >
          {CardCategory.map((e, i) => (
            <Button
              onClick={() => {
                setCategory(e.value || '')
              }}
              loading={isLoading}
              loadingText="Buscando..."
              flexGrow={[1, 0]}
              px={['8px', '8px', '16px', '24px']}
              fontSize={['14px', '14px', '18px', '20px']}
              my={['8px', '8px', '8px']}
              fontWeight="300"
              bg={category === e.value ? '#F68A66' : '#303030'}
              color={category === e.value ? '#303030' : '#fff'}
              size={['md', 'md', 'xl', '2xl']}
            >
              <Icon
                color={category === e.value ? '#303030' : '#F68A66'}
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
          {data?.map((e, i) => (
            <Flex
              w={['100%', '50%', '50%', '25%']}
              px="16px"
              pb="32px"
              onClick={() => {
                navigate.push(`/event/${e._id}`)
              }}
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
