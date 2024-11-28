import { TicketItem } from '@/core/events/types'
import {
  EventRepository,
  WithEvent,
} from '@/core/users/repositories/event.repository'
import { Flex, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import jwt from 'jsonwebtoken'
import { UserInfo } from '@/core/auth/userinfo'
import { EventCard } from '@/components/app/event-card'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies['jwt:access_token']

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const userInfo = jwt.decode(accessToken) as UserInfo

  const res = await new EventRepository().getTicketsByUserId(userInfo.userId)

  console.log({ res })
  if (!res) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const tickets: WithEvent<TicketItem>[] = res
  return { props: { tickets } }
}

export default function MyEventsPage({
  tickets,
}: {
  tickets: WithEvent<TicketItem>[]
}) {
  const navigate = useRouter()

  console.log({ tickets })
  return (
    <Flex pt="32px" mt="80px" flexDir={'column'} maxW="1100px" mx="auto">
      <Flex mx="16px" borderBottom="1px solid #595959" mb="16px" pb="16px">
        <Text fontSize="32px"> Meus Tickets </Text>
      </Flex>
      <Flex flexWrap="wrap">
        {tickets?.map((ticket, i) => (
          <Flex
            w={['100%', '50%', '50%']}
            px="16px"
            pb="32px"
            onClick={() => {
              navigate.push(`/tickets/${ticket._id}`)
            }}
          >
            <EventCard
              _id={ticket.eventId}
              name={ticket.event.name}
              date={dayjs(ticket.event.date).toDate()}
              imageUrl={ticket.event.imageUrl!}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
