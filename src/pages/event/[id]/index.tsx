import { IoIosPin } from 'react-icons/io'
import TranslucentCard from '@/components/app/translucentcard'
import EventDetailsCard from '@/components/app/event-details-card'
import { EventCardItem, EventItem } from '@/core/events/types'
import { Button, Flex } from '@chakra-ui/react'
import { IoQrCodeOutline } from 'react-icons/io5'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { EventRepository } from '@/core/users/repositories/event.repository'
import { UserRepository } from '@/core/users/repositories/user.repository'

import { User } from '@/core/users/types'

interface EventPageProps {
  event: EventItem
  user: User
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query!
  const res = await new EventRepository().getById(id as string)

  if (!res) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const user = await new UserRepository().getUser(res?.userId as string)

  const event: EventItem = res
  return { props: { event, user } }
}

export default function EventDetails({ event, user }: EventPageProps) {
  console.log(event)
  const navigate = useRouter()
  const formattedDate = () => {
    const date = new Date(event.date)
    const months = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Abr.',
      'Mai.',
      'Jun.',
      'Jul.',
      'Ago.',
      'Set.',
      'Out.',
      'Nov.',
      'Dez.',
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const time = date.toLocaleTimeString(['pt-br'], {
      hour: '2-digit',
      minute: '2-digit',
    })
    const weekday = date.toLocaleString('pt-br', {
      weekday: 'long',
    })

    return { day, month, year, time, weekday }
  }
  const date = formattedDate()
  return (
    <div className="flex flex-col items-center">
      <TranslucentCard user={user} />
      <Flex
        mt="8px"
        maxW={['100%', '100%', '800px']}
        className=" bg-dark-grey w-full h-full rounded-t-3xl px-5 py-4  flex "
      >
        <div className="flex flex-col">
          <div className="rounded-t-lg bg-light-purple w-[60px] h-[30px] flex text-center items-center">
            <p className="font-display text-white font-normal text-[15px] mx-auto">
              {date.month}
            </p>
          </div>
          <div className="bg-white rounded-b-lg  w-[60px] h-[30px] flex text-center items-center">
            <p className="font-display text-black font-bold text-[20px] mx-auto ">
              {date.day}
            </p>
          </div>
        </div>
        <div className="px-2">
          <h1 className=" font-display font-bold px-3 mt-1 ">{event.name}</h1>
          <div className="flex text-[15px] ">
            <IoIosPin className="text-light-grey ml-2 mt-1" />
            <p className=" font-normal  font-display text-light-grey ml-1">
              Evento Presencial, Começa em {date.day} de {date.month},{' '}
              <span className=" capitalize">{date.weekday}</span>, {date.year} -{' '}
              {date.time} - {formatDuration(Number(event.duration) || 1)}
            </p>
          </div>
        </div>
      </Flex>
      <div className="flex px-5">
        <p className=" font-normal font-display text-light-grey ml-1 text-[18px] py-5">
          <p dangerouslySetInnerHTML={{ __html: event.description }} />
        </p>

        <div></div>
      </div>

      <div className="px-5 w-full flex justify-center items-center">
        <EventDetailsCard
          _id={event._id}
          date={dayjs(event.date).toDate()}
          name={event.name}
          imageUrl={event.imageUrl!}
        />
      </div>
      <Button
        className="bg-grey h-12 w-full max-w-[400px] mt-10 font-display rounded-full border-2 border-grey justify-start text-white mb-10 mx-5"
        onClick={() => navigate.push(`/event/${event._id}/booking`)}
      >
        <div className="h-12 w-12 bg-light-green rounded-full flex justify-center items-center  border-light-green">
          <IoQrCodeOutline className="scale-125 text-dark-grey" />
        </div>
        Adquirir Ingresso
      </Button>
    </div>
  )
}

function formatDuration(duration: number) {
  const hourComponent = Math.floor(duration / 60)
  const minuteComponent = duration % 60

  let result = `${hourComponent}h`
  if (minuteComponent) result += ` ${minuteComponent}min`
  return result
}
