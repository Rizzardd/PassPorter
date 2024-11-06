import { Button, Card, Flex, Text } from "@chakra-ui/react";
import EventCardImage from "@/assets/eventcardimage.png";
import Image from "next/image";
import { IoCalendarOutline, IoTimeSharp } from "react-icons/io5";




export function BookingDetailsCard() {
  return (

<div className=" w-[90%] h-[90%] mx-auto py-10">
      <Image
        alt=""
        src={EventCardImage}
        className="w-full h-full rounded-3xl"
      />
      <Flex
        direction="row"
        bg="rgba(255,255,255,0.1)"
        h="100px"
        alignItems="center"
 
        backdropFilter="saturate(180%) blur(20px)"
        className="rounded-3xl mt-[-25.8%]"
      >
        
        <div className="px-2">
          <h1 className="font-display text-white font-medium">Palestra sobre Virtual Reality</h1>
        <div className="flex flex-row gap-2 mt-2">
        <IoCalendarOutline className="w-[1.6rem] h-auto" />
        <p className="font-display text-white font-medium">Março 29, 2024</p>
        <IoTimeSharp className="w-[1.6rem] h-auto ml-5"   />
        <p className="font-display text-white font-medium">22:00 - 00:00</p>
        </div>
        </div>
      </Flex>
    </div>
   
  );
}
