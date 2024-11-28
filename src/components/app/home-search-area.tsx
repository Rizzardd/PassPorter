import { Flex, Icon, Input } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'
import { IoIosPin } from 'react-icons/io'
import { IoTicket } from 'react-icons/io5'

export function HomeSearchArea({
  onNameChange,
  onLocaleChange,
  name,
  locale,
  onSearch,
  loading,
}: {
  onNameChange: (name: string) => void
  onLocaleChange: (locale: string) => void
  name: string
  locale: string
  onSearch: () => void
  loading: boolean
}) {
  return (
    <Flex justifyContent="center">
      <Flex
        fontSize={['18px', '18px', '20px', '24px']}
        my={['-16px', '-16px', '-8px', '32px']}
        w={['100%', '100%', 'calc(100% - 80px)']}
        alignItems="center"
        flexDirection={['column', 'column', 'column', 'row']}
        gap={['8px', '8px', '16px', 0]}
      >
        <InputGroup
          flex={1}
          w={[
            'calc(100dvw - 72px)',
            'calc(100dvw - 72px)',
            'calc(100dvw - 180px)',
            'unset',
          ]}
          startElement={
            <Icon w={['24px', '24px', '35px']} h={['24px', '24px', '35px']}>
              <IoIosPin />
            </Icon>
          }
          startElementProps={{ color: '#F68A66' }}
        >
          <Input
            onChange={(e) => onLocaleChange(e.target.value)}
            value={locale}
            h={['50px', '50px', '65px', '80px']}
            mr={[0, 0, 0, '9%']}
            bg="white"
            placeholder="Buscar Local"
            className="font-display"
            color={'#1b1b1b'}
          />
        </InputGroup>

        <InputGroup
          flex={1}
          w={[
            'calc(100dvw - 72px)',
            'calc(100dvw - 72px)',
            'calc(100dvw - 180px)',
            'unset',
          ]}
          startElement={
            <Icon w={['24px', '24px', '35px']} h={['24px', '24px', '35px']}>
              <IoTicket />
            </Icon>
          }
          startElementProps={{ color: '#F68A66' }}
        >
          <Input
            onChange={(e) => onNameChange(e.target.value)}
            value={name}
            h={['50px', '50px', '65px', '80px']}
            mr={[0, 0, 0, '9%']}
            bg="white"
            placeholder="Buscar Evento"
            className="font-display"
            color={'#1b1b1b'}
          />
        </InputGroup>
        <Button
          loading={loading}
          onClick={onSearch}
          w="180px"
          h={['60px', '60px', '60px', '80px']}
          bg="#F68A66"
        >
          Buscar
        </Button>
      </Flex>
    </Flex>
  )
}
