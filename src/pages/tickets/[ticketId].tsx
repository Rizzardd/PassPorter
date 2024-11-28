import { TicketItem } from '@/core/events/types'
import {
  EventRepository,
  WithEvent,
} from '@/core/users/repositories/event.repository'
import { AspectRatio, Flex, Image, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import QRCode from 'react-qr-code'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ticketId } = context.query!
  const res = await new EventRepository().getTicketById(ticketId as string)

  console.log({ res })
  if (!res) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const ticket: WithEvent<TicketItem> = res
  return { props: { ticket } }
}

export default function TicketPage({
  ticket,
}: {
  ticket: WithEvent<TicketItem>
}) {
  const event = ticket.event

  return (
    <Flex
      mx="auto"
      w="100%"
      p="16px"
      minH="100vh"
      flexDir="column"
      justify="center"
      alignItems="center"
    >
      <Flex
        bg="#303030"
        w="100%"
        maxW="600px"
        borderRadius="32px"
        p="32px"
        alignItems="center"
        flexDir="column"
      >
        <Text fontSize={['24px', '24px', '32px']}>Ingresso</Text>
        <AspectRatio ratio={16 / 9} w="100%" my="16px">
          <Flex bg="black" borderRadius="32px" w="calc(100% - 64px)" h="200px">
            <Image
              src={event.imageUrl}
              w="100%"
              h="100%"
              alt=""
              objectFit="cover"
            />
          </Flex>
        </AspectRatio>
        <Text fontSize={['24px', '24px', '32px']}>{event.name}</Text>
        <Flex h="1" borderTop="1px dashed white" w="100%" mt="16px" />
        <Flex
          justify="space-between"
          w="100%"
          mt="16px"
          flexDir={['column', 'column', 'row']}
        >
          <Flex flexDirection={'column'} flex={['0', '0', '1']}>
            <Text mt="16px" color="#8E949D" fontSize="12px" fontWeight={'400'}>
              Data
            </Text>
            <Text color="#fff" fontSize="14px" fontWeight={'500'}>
              {dayjs(event.date).format('DD/MM/YYYY')}
            </Text>
            <Text mt="16px" color="#8E949D" fontSize="12px" fontWeight={'400'}>
              Local
            </Text>
            <Text
              color="#fff"
              fontSize="14px"
              fontWeight={'500'}
            >{`${event.address.street}, ${event.address.number}${event.address.complement ? `, ${event.address.complement}` : ''} - ${event.address.neighborhood}, ${event.address.city} - ${event.address.state}, ${event.address.zipCode}`}</Text>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems={['flex-start', 'flex-start', 'flex-end']}
            flex={['0', '0', '1']}
            w={['100%', '100%', 'auto']}
          >
            <Text mt="16px" color="#8E949D" fontSize="12px" fontWeight={'400'}>
              Horário
            </Text>
            <Text color="#fff" fontSize="14px" fontWeight={'500'}>
              {dayjs(event.date).format('HH:mm')}
            </Text>
          </Flex>
        </Flex>

        <Flex h="1" mb="16px" borderTop="1px dashed white" w="100%" mt="16px" />
        <Flex p="32px" bgColor="#505050" borderRadius="16px">
          <QRCode
            fgColor="#b3d654"
            bgColor="#505050"
            value={ticket._id?.toString()}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
