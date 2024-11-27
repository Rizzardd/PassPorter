import Image from 'next/image'
import assetFirstBanner from '@/assets/asset-banner-first-section.png'
import { Text, Flex, AspectRatio } from '@chakra-ui/react'

export function HeroBanner() {
  return (
    <Flex w="100%" h={['340px', '420px', '520px', '620px']} bg="#3F2C5A">
      <HeroSideDetails />
      <Flex w="100%" justify="center" mr={['0', '0', '0', '119px']}>
        <Flex maxW="1440px" w="100%">
          <HeroCenterText />
          <HeroImage />
        </Flex>
      </Flex>
    </Flex>
  )
}

function HeroSideDetails() {
  return (
    <Flex bg="#7E56AD">
      <Flex
        justify="center"
        alignItems="center"
        w={['36px', '36px', '42px', '81px']}
        rotate="180deg"
        writingMode="vertical-lr"
      >
        <Text
          mb={['80px', '80px']}
          fontFamily="Urbanist"
          fontSize={['16px', '20px', '24px', '30px']}
          fontWeight="500"
          lineHeight="36px"
        >
          Adquira seu Ingresso no PassPorter!
        </Text>
      </Flex>
      <Flex bg="#DB94B9" w={['8px', '12px', '16px', '19px']}></Flex>
      <Flex bg="#FEBFAD" w={['8px', '12px', '16px', '19px']}></Flex>
    </Flex>
  )
}

function HeroCenterText() {
  return (
    <Flex
      flex={1}
      flexDir="column"
      mb="16px"
      justify="center"
      alignItems="center"
    >
      <Flex>
        <Text
          fontFamily="Urbanist"
          fontSize={['24px', '36px', '36px', '60px']}
          fontWeight="800"
          mt={['80px', '80px', '0']}
          lineHeight={['30px', '30px', '30px', '72px']}
        >
          Descubra,
        </Text>
      </Flex>
      <Flex>
        <Text
          fontFamily="Urbanist"
          fontSize={['24px', '36px', '36px', '60px']}
          fontWeight="500"
          lineHeight={['30px', '72px']}
        >
          Participe,
        </Text>
        <Text
          fontFamily="Urbanist"
          fontSize={['24px', '36px', '36px', '60px']}
          fontWeight="300"
          lineHeight={['30px', '72px']}
        >
          Celebre!
        </Text>
      </Flex>

      <Flex
        w="100%"
        px={['16px', '24px', '24px', '64px']}
        mt="16px"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontFamily="Urbanist"
          fontSize={['20px', '20px', '24px', '28px']}
          fontWeight="400"
          lineHeight={['24px', '28px', '30px', '33.6px']}
        >
          Descubra o melhor da diversão! <br />
          Conecte-se com amigos, crie novas memórias e aproveite tudo o que a
          sua cidade tem a oferecer.
        </Text>
      </Flex>
    </Flex>
  )
}

function HeroImage() {
  return (
    <Flex
      hideBelow="md"
      flexBasis={[, , '40%', '30%']}
      mr={[, , '0px', '36px']}
      mt={[, , '90px', '80px']}
      py={[, , '0px', '32px']}
    >
      <AspectRatio ratio={507 / 511} flex={1} h="100%">
        <Image
          objectFit="cover"
          objectPosition="center"
          alt=""
          src={assetFirstBanner}
        />
      </AspectRatio>
    </Flex>
  )
}
