import { Button, Card, Flex, Text } from '@chakra-ui/react'
import EventCardImage from '@/assets/eventcardimage.png'
import Image from 'next/image'
import { IoCalendarOutline, IoTimeSharp } from 'react-icons/io5'
import { EventCardItem } from '@/core/events/types'

export function BookingDetailsCard(event: EventCardItem) {
  const date = new Date(event.date)

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  return (
    <div className=" w-[90%] h-[90%] mx-auto relative">
      <Image
        alt=""
        loader={() => event.image}
        src={event.image}
        width={100}
        height={100}
        className="w-full aspect-[16/11] object-cover rounded-3xl"
      />
      <Flex
        direction="row"
        bg="rgba(255,255,255,0.1)"
        h="100px"
        alignItems="center"
        backdropFilter="saturate(180%) blur(20px)"
        className="rounded-3xl w-full absolute bottom-0"
      >
        <div className="px-2">
          <h1 className="font-display text-white font-medium">{event.name}</h1>
          <div className="flex flex-row gap-2 mt-2">
            <IoCalendarOutline className="w-[1.6rem] h-auto" />
            <p className="font-display text-white font-medium">
              {months[date.getMonth()]} {date.getDay()}, {date.getFullYear()}
            </p>
            <IoTimeSharp className="w-[1.6rem] h-auto ml-5" />
            <p className="font-display text-white font-medium">22:00 - 00:00</p>
          </div>
        </div>
      </Flex>
    </div>
  )
}
