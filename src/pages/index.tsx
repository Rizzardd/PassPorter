import BannerFirstSection from '@/components/app/banner-first-section'
import { EventCard } from '@/components/app/event-card'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import { Input } from '@chakra-ui/react'
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
import { EventCardItem } from '@/core/events/types'
import { useScreenWidth } from '@/hooks/useScreenWidth'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/router'

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/getHighlights`
  )
  if (!res.ok) {
    return { props: { events: null } }
  }

  const events: EventCardItem[] = await res.json()
  return { props: { events } }
}

interface EventsPageProps {
  events: EventCardItem[] | null
}

export default function Home({ events }: EventsPageProps) {
  const [cols, setCols] = useState(1)
  const screen = useScreenWidth()
  const navigate = useRouter()
  useEffect(() => {
    const updateCols = () => setCols(Math.max(1, Math.floor(screen! / 400)))
    updateCols()
  }, [screen])

  return (
    <div className=" justify-items-center bg-dark-grey h-fit">
      <BannerFirstSection />
      <div className="mt-[-6%] flex flex-col items-center gap-3">
        <InputGroup
          className="mx-auto  h-fit"
          startElement={<IoIosPin className="scale-150" />}
          startElementProps={{ color: '#F68A66' }}
        >
          <Input
            placeholder="Buscar Local"
            className="bg-white h-12 w-[70vw] font-display"
            color={'#1b1b1b'}
          ></Input>
        </InputGroup>

        <InputGroup
          className="mx-auto h-fit "
          startElement={<IoTicket className="scale-150" />}
          startElementProps={{ color: '#F68A66' }}
        >
          <Input
            placeholder="Buscar Evento"
            className="bg-white h-12 w-[70vw] font-display "
            color={'#1b1b1b'}
          ></Input>
        </InputGroup>
        <Button className="px-10 h-12 bg-orange font-display mt-[6.6%]">
          Buscar
        </Button>
      </div>

      <div className=" flex flex-wrap gap-2 mt-[9.5%] px-5">
        {CardCategory.map((e, i) => (
          <Button className="w-fit px-4 h-10 bg-light-purple font-display hover:bg-dark-purple">
            {e.icon}
            {e.name}
          </Button>
        ))}
      </div>

      <div
        className="mt-10 px-5 gap-10 grid mx-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {events?.map((e, i) => (
          <span onClick={() => navigate.push(`/event/${e._id}`)}>
            <EventCard
              key={i}
              _id={e._id}
              name={e.name}
              date={e.date}
              image={e.image}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
