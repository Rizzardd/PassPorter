import { Button, Card, Flex, Text } from '@chakra-ui/react'
import EventCardImage from '@/assets/eventcardimage.png'
import Image from 'next/image'
import { EventCardItem } from '@/core/events/types'
import dayjs from 'dayjs'

export function EventCard(event: EventCardItem) {
  const formattedDate = () => {
    const date = dayjs(event.date).toDate()
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
    <div className="w-full relative hover:cursor-pointer">
      <Image
        alt=""
        loader={() => event.imageUrl}
        src={event.imageUrl}
        width={100}
        height={100}
        unoptimized
        className="w-full aspect-[16/11] object-cover rounded-3xl "
      />

      <div className="absolute bottom-0 w-full">
        <Flex
          direction="row"
          bg="rgba(125,125,125,0.4)"
          h="fit"
          alignItems="center"
          backdropFilter="saturate(180%) blur(25px)"
          className="rounded-3xl"
        >
          <div className="rounded-3xl bg-darkier-purple min-w-24 h-24  flex items-center justify-center">
            {formattedDate()}
          </div>
          <div className="px-4 max-h-24 overflow-clip">
            <h1>{event.name}</h1>
          </div>
        </Flex>
      </div>
    </div>
  )
}
