'use client'

import { Box, Flex, Text } from '@chakra-ui/react'

export function AppStepperCriar({
  step,
  activeColor,
}: {
  activeColor: string
  step: number
}) {
  return (
    <Flex justify="space-between" mb={8} position="relative">
      <Flex position="relative" direction="column" align="center" zIndex={1}>
        <Flex
          w={6}
          h={6}
          justify="center"
          alignItems="center"
          borderRadius="full"
          bg={step >= 1 ? '#94b048' : 'gray.300'}
        >
          <Box
            w={3}
            h={3}
            borderRadius="full"
            bg={step >= 1 ? '#b3d654' : 'gray.300'}
          />
        </Flex>
        <Text fontSize="sm" mt={2}>
          Detalhes
        </Text>
        <Box
          position="absolute"
          top="3"
          left="0"
          width={'50%'}
          height="4px"
          marginTop={'-2px'}
          bg="#b3d654"
          zIndex={0}
        />
      </Flex>
      <Flex direction="column" align="center" zIndex={1}>
        <Flex
          w={6}
          h={6}
          justify="center"
          alignItems="center"
          borderRadius="full"
          bg={step >= 1 ? '#94b048' : 'gray.300'}
        >
          <Box
            w={3}
            h={3}
            borderRadius="full"
            bg={step >= 1 ? '#b3d654' : 'gray.300'}
          />
        </Flex>
        <Text fontSize="sm" mt={2}>
          Ingressos
        </Text>
      </Flex>
      <Flex direction="column" align="center" zIndex={1}>
        <Flex
          w={6}
          h={6}
          justify="center"
          alignItems="center"
          borderRadius="full"
          bg={step >= 1 ? '#94b048' : 'gray.300'}
        >
          <Box
            w={3}
            h={3}
            borderRadius="full"
            bg={step >= 1 ? '#b3d654' : 'gray.300'}
          />
        </Flex>
        <Text fontSize="sm" mt={2}>
          Configuração
        </Text>
      </Flex>
      {/* Progress line */}
      <Box
        position="absolute"
        top="3"
        left="0"
        right="0"
        height="4px"
        marginTop={'-2px'}
        bg="#242424"
        zIndex={0}
      />
      {step > 1 ? (
        <Box
          position="absolute"
          top="3"
          left="0"
          width={step == 2 ? '50%' : '100%'}
          height="4px"
          marginTop={'-2px'}
          bg="#b3d654"
          zIndex={1}
        />
      ) : null}
    </Flex>
  )
}
