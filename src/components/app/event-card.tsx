import { Button, Card, Flex, Text } from '@chakra-ui/react'
import EventCardImage from '@/assets/eventcardimage.png'
import Image from 'next/image'
import { EventCardItem } from '@/core/events/types'

export function EventCard(event: EventCardItem) {
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

    return (
      <p className="text-orange font-display">
        {month} {day} <br /> {year}
      </p>
    )
  }
  return (
    <div className="max-w-[400px] relative">
      <Image
        alt=""
        loader={() => event.image}
        src={event.image}
        width={100}
        height={100}
        unoptimized
        className="w-full aspect-[16/11] object-cover rounded-3xl"
      />

      <div className="absolute bottom-0 w-full">
        <Flex
          direction="row"
          bg="rgba(255,255,255,0.1)"
          h="100px"
          alignItems="center"
          backdropFilter="saturate(180%) blur(20px)"
          className="rounded-3xl"
        >
          <div className="rounded-3xl bg-darkier-purple w-[28%] h-[100px] flex items-center justify-center">
            {formattedDate()}
          </div>
          <div className="px-4">
            <h1>{event.name}</h1>
          </div>
        </Flex>
      </div>
    </div>
  )
}
