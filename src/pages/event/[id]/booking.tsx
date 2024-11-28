import { BookingDetailsCard } from '@/components/app/booking-details-card'
import BookingDetailsForm from '@/components/app/booking-details-form'
import { EventCard } from '@/components/app/event-card'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { EventItem, EventCardItem } from '@/core/events/types'
import { EventRepository } from '@/core/users/repositories/event.repository'
import useAuthStore from '@/core/users/stores/useAuthStore'
import { isAuthOnStatic } from '@/lib/isAuthOnStatic'
import { Flex } from '@chakra-ui/react'
import { getCookie } from 'cookies-next'
import dayjs from 'dayjs'
import ky from 'ky'
import { GetServerSideProps } from 'next'
import { cookies } from 'next/headers'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IoIosArrowDropleftCircle } from 'react-icons/io'

interface EventPageProps {
  event: EventItem
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies['jwt:access_token']

  if (!accessToken) {
    return {
      redirect: {
        destination: '/auth/register',
        permanent: false,
      },
    }
  }

  const { id } = context.query!
  const result = await new EventRepository().getById(id as string)

  if (!result) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const event: EventItem = result
  return { props: { event } }
}

export default function BookingDetails({ event }: EventPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn } = useAuthStore()

  const bookTicket = async () => {
    setIsLoading(true)

    const response = await ky.post('/api/events/booking', {
      json: {
        eventId: event._id,
      },
    })

    if (!response.ok) {
      toaster.error({
        title: 'Erro ao reservar ingresso',
      })
      setIsLoading(false)
      return
    }

    const { ticketId, success, message } = await response.json<{
      ticketId: string
      success: string
      message: string
    }>()

    if (!success) {
      toaster.error({
        title: message,
      })

      setIsLoading(false)
      return
    }

    setIsLoading(false)

    router.push(`/tickets/${ticketId}`)
  }

  return (
    <main>
      <div className="w-full h-full ">
        <Flex maxH={['auto', 'auto', '300px']}>
          <BookingDetailsCard
            _id={event._id}
            imageUrl={event.imageUrl!}
            name={event.name}
            date={dayjs(event.date).toDate()}
          />
        </Flex>

        <Flex justify="center" mt="80px">
          <Button
            bg="#b3d654"
            px="32px"
            py="8px"
            color="#303030"
            variant="subtle"
            size="2xl"
            loading={isLoading}
            loadingText="Reservando..."
            onClick={() => bookTicket()}
          >
            Reservar Entrada
          </Button>
        </Flex>
      </div>
    </main>
  )
}
