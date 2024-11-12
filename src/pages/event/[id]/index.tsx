import { IoIosPin } from 'react-icons/io'
import TranslucentCard from '@/components/app/translucentcard'
import EventDetailsCard from '@/components/app/event-details-card'
import { EventCardItem } from '@/core/events/types'
import { Button } from '@chakra-ui/react'
import { IoQrCodeOutline } from 'react-icons/io5'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface EventPageProps {
  event: EventCardItem
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/getEvent?id=${id}`
  )
  if (!res.ok) {
    return { props: { event: null } }
  }

  const event: EventCardItem = await res.json()
  return { props: { event } }
}

export default function EventDetails({ event }: EventPageProps) {
  console.log(event)
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
      <TranslucentCard />
      <div className=" bg-dark-grey w-full h-full rounded-t-3xl px-5 py-4  flex ">
        <div className="flex flex-col">
          <div className="rounded-t-lg bg-light-purple w-[60px] h-[30px] flex text-center items-center">
            <p className="font-display text-white font-normal text-[15px] p-4">
              {date.month}
            </p>
          </div>
          <div className="bg-white rounded-b-lg  w-[60px] h-[30px] flex text-center items-center">
            <p className="font-display text-black font-bold text-[20px] p-[1.20rem]">
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
              {date.time} - 2h
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-5">
        <p className=" font-normal font-display text-light-grey ml-1 text-[18px] py-5">
          Venha de encontro conosco nesta jornada sobre Realidade Virtual!
          teremos participações dos maiores especialistas na área, não perca!
        </p>

        <div>
          {/* TODO: @PvtWendy ajustar aquyi o google maps conforme o protótipo do figma, de preferência funcionando. */}
        </div>
      </div>

      <div className="px-5 w-full flex justify-center items-center">
        <EventDetailsCard
          _id={event._id}
          date={event.date}
          name={event.name}
          image={event.image}
        />
      </div>
      <Button className="bg-grey h-12 w-full max-w-[400px] mt-10 font-display rounded-full border-2 border-grey justify-start text-white mb-10 mx-5 ">
        <div className="h-12 w-12 bg-light-green rounded-full flex justify-center items-center  border-light-green">
          <IoQrCodeOutline className="scale-125 text-dark-grey" />
        </div>
        Mostrar QR Code
      </Button>
    </div>
  )
}
