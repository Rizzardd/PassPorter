import { Button, Card, Flex, Text } from "@chakra-ui/react";
import EventCardImage from "@/assets/eventcardimage.png";
import Image from "next/image";

export function EventCard() {
  return (
    <div>
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
        <div className="rounded-3xl bg-darkier-purple w-[28%] h-[100px]  items-center">
          <p className="text-orange font-display px-[2rem] py-[1.65rem]">
            Set. 21 <br /> 2024
          </p>
        </div>
        <div className="px-2">
          <h1>cu</h1>
        </div>
      </Flex>
    </div>
  );
}
