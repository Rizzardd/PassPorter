import Wallpaper from '@/assets/wallpaper.png'
import Image from 'next/image'
import { Flex } from '@chakra-ui/react'
import { Avatar } from '@/components/ui/avatar'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

export default function EventDetails() {
  return (
    <div>
      <div className=" justify-items-center h-fit rounded-t-lg relative ">
        <Image alt="" src={Wallpaper} />
        <div className="absolute bottom-0 w-full  ">
          <Flex
            direction="row"
            bg="rgba(0,0,0,0.8)"
            h="125px"
            alignItems="center"
            justify="center"
            backdropFilter="saturate(180%) blur(9px)"
            className="rounded-t-3xl"
          >
            <div className=" flex flex-wrap gap-2  px-5">
              <Avatar size="2xl" src="https://avatar.iran.liara.run/public" />
            </div>
            <div className=" px-2 flex flex-col w-full mx-auto">
              <div className="flex flex-row w-full gap-2">
                <h1 className="font-display text-white font-normal text-[15px]">
                  Tâmara Salles
                </h1>
                <RiVerifiedBadgeFill className="mt-[3px] text-light-green" />
              </div>
              <p className="font-display text-white font-thin text-[13px]">
                Organizador
              </p>
            </div>
          </Flex>
        </div>
      </div>
      <div className="bg-dark-grey w-full h-full rounded-t-3xl px-6 py-2 flex flex-col">
        <div className="rounded-t-lg bg-light-purple w-[60px] h-[30px] flex text-center items-center">
          <p className="font-display text-white font-normal text-[15px] p-4">
            Mar
          </p>
        </div>
        <div className="bg-white rounded-b-lg  w-[60px] h-[30px] flex text-center items-center">
          <p className="font-display text-black font-bold text-[20px] p-[1.20rem]">
            29
          </p>
        </div>
      </div>
    </div>
  )
}
