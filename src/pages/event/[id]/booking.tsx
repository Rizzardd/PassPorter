import { BookingDetailsCard } from '@/components/app/booking-details-card'
import BookingDetailsForm from '@/components/app/booking-details-form'
import { EventCard } from '@/components/app/event-card'
import { EventItem, EventCardItem } from '@/core/events/types'
import { Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { IoIosArrowDropleftCircle } from 'react-icons/io'

interface EventPageProps {
  event: EventItem
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/getEvent?id=${id}`
  )
  if (!res.ok) {
    return { props: { event: null } }
  }

  const event: EventItem = await res.json()
  return { props: { event } }
}

export default function BookingDetails({ event }: EventPageProps) {
  return (
    <main>
      <div className="w-full h-full ">
        <BookingDetailsCard
          _id={event._id}
          imageUrl={event.imageUrl!}
          name={event.name}
          date={dayjs(event.date).toDate()}
        />
        <div className="px-4 w-[90%] mx-auto">
          <h1 className="font-display text-white font-medium text-[30px] mb-5">
            Detalhes do Pedido
          </h1>
          <div className="w-full flex justify-between  mb-5 text-[20px]">
            <p className="font-display text-white font-thin ">
              1X <span className="ml-3">Ingresso Comum</span>
            </p>
            <p className="font-display text-white font-thin ">R$0</p>
          </div>
          <div className="w-full flex justify-between mb-5 text-[20px]">
            <p className="font-display text-white font-thin ">Subtotal</p>
            <p className="font-display text-white font-thin ">R$0</p>
          </div>
          <div className="w-full flex justify-between mb-5 text-[20px]">
            <p className="font-display text-white font-thin ">Taxas</p>
            <p className="font-display text-white font-thin ">R$0</p>
          </div>

          <div className="bg-dark-grey py-3 w-full font-display rounded-full mx-auto px-4 flex justify-between text-[20px] ">
            <p className="font-display text-white font-thin  ">Total</p>
            <p className="font-display text-white font-thin  ">R$0</p>
          </div>

          <hr className="my-12 mx-auto h-0.5 border-t-0 w-72 bg-dark-grey" />

          <BookingDetailsForm />
        </div>
      </div>
    </main>
  )
}
