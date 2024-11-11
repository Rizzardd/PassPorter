import { Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { EventCardItem } from '@/core/events/types'
import { IoIosRemoveCircle, IoMdAddCircle } from 'react-icons/io'
import cardimage from '../../assets/eventcardimage.png'

export default function EventDetailsCard() {
  return (
    <div className="max-w-[400px] relative">
      <Image
        src={cardimage}
        alt=""
        width={100}
        height={100}
        unoptimized
        className="w-full aspect-[16/11] object-cover rounded-3xl"
      />

      <div className="absolute bottom-0 w-full">
        <Flex
          direction="row"
          bg="#303030"
          h="100px"
          alignItems="center"
          className="rounded-3xl"
        >
          <div className="px-4">
            <h1 className="py-1 font-bold font-display text-[20px]">
              Preço Unico
            </h1>
            <p className="font-semibold font-display text-[15px]">
              Palestra sobre Virtual Reality
            </p>
          </div>
          <div className="flex px-10">
            <IoIosRemoveCircle className="scale-150 w-[20px] h-[20px]" />
            <p className="font-semibold font-display px-5 text-[25px] mt-[-8px]">
              1
            </p>
            <IoMdAddCircle className="scale-150 w-[20px] h-[20px]" />
          </div>
        </Flex>
      </div>
    </div>
  )
}
