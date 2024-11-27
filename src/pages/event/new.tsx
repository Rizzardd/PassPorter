'use client'

import { Field } from '@/components/ui/field'

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import {
  Button,
  Container,
  createListCollection,
  Flex,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { FaAsterisk } from 'react-icons/fa'
import { IoInformationCircle } from 'react-icons/io5'

import { AppStepperCriar } from '@/components/app/app-stepper-criar'
import { RichEditor } from '@/components/app/rich-editor'
import { useState } from 'react'
import { FiChevronLeft, FiImage } from 'react-icons/fi'
import { DropzoneInput } from '@/components/app/dropzone-input'
import { useForm, FormProvider } from 'react-hook-form'

const frameworks = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})
const durations = createListCollection({
  items: Array.from({ length: 12 }).map((_, i) => {
    const index = i + 1
    const hourComponent = Math.floor(index / 4)
    const minuteComponent = ((index % 4) * 15) % 60

    let result = `${hourComponent}h`
    if (minuteComponent) result += ` ${minuteComponent}min`
    return { label: result, value: index * 15 }
  }),
})
export default function EventForm() {
  const methods = useForm({
    mode: 'onBlur',
  })

  const onSubmit = methods.handleSubmit((values) => {
    console.log('values', values)
  })

  const [step, setStep] = useState(2)
  const bgColor = '#1b1b1b'
  const inputBg = '#1b1b1b'
  const activeColor = 'green.400'

  return (
    <FormProvider {...methods}>
      <Container
        as="form"
        onSubmit={onSubmit}
        onClick={(e) => {}}
        className="font-display"
        maxW="container.sm"
        bg={bgColor}
        minH="100vh"
        p={4}
      >
        <Flex align="center" mb={8}>
          <IconButton aria-label="Go back" variant="ghost" mr={2}>
            <FiChevronLeft />
          </IconButton>
          <Text fontSize="lg" fontWeight="medium">
            Criar um Evento Presencial
          </Text>
        </Flex>

        <AppStepperCriar step={step} activeColor={activeColor} />

        <Flex bg="#303030" rounded="16px" flexDirection="column">
          <Flex
            h="42px"
            alignItems="center"
            roundedTop="16px"
            borderBottom="1px solid #1b1b1b"
            p="8px 12px"
          >
            <Icon mr="8px" w="20px" h="20px" color="#B3D654">
              <IoInformationCircle />
            </Icon>
            <Text>Detalhes</Text>
          </Flex>

          <Stack gap={6} p="8px 12px">
            <Field
              label={<RequiredLabel>Dê um nome ao seu evento</RequiredLabel>}
            >
              <Input
                borderRadius="32px"
                px="16px"
                placeholder="Digite um Nome para o seu Evento"
                bg={inputBg}
                border="none"
                _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
              />
            </Field>

            <Field
              label={
                <RequiredLabel>
                  Escolha uma categoria para seu evento
                </RequiredLabel>
              }
            >
              <SelectRoot
                borderRadius="32px"
                px="16px"
                bg={inputBg}
                border="none"
                _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                collection={frameworks}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Selecionar Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.items.map((framework) => (
                    <SelectItem item={framework} key={framework.value}>
                      {framework.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            <Field
              label={<RequiredLabel>Quando será seu evento?</RequiredLabel>}
            >
              <Flex gap={4} mb={4} w="100%">
                <Input
                  type="date"
                  borderRadius="32px"
                  px="16px"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
                <Input
                  type="time"
                  borderRadius="32px"
                  px="16px"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
              </Flex>

              <Field label={'Qual duração do seu evento?'}>
                <SelectRoot
                  borderRadius="32px"
                  px="16px"
                  bg={inputBg}
                  border="none"
                  textAlign="center"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                  collection={durations}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="0h" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.items.map((duration) => (
                      <SelectItem item={duration} key={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            </Field>

            <DropzoneInput
              name="image"
              accept={{ 'image/*': ['png', 'jpg'] }}
            />

            <Field label="Descreva seu evento">
              <RichEditor />
            </Field>

            <Field
              label={
                <RequiredLabel>Em qual local será o seu evento?</RequiredLabel>
              }
            >
              <Stack gap={4} w="100%">
                <Input
                  borderRadius="32px"
                  px="16px"
                  placeholder="Digite seu Estado"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />

                <Input
                  borderRadius="32px"
                  px="16px"
                  placeholder="Digite sua Cidade"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
                <Input
                  borderRadius="32px"
                  px="16px"
                  placeholder="Digite seu CEP"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
                <Input
                  borderRadius="32px"
                  px="16px"
                  placeholder="Digite seu Bairro"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
                <Input
                  borderRadius="32px"
                  px="16px"
                  placeholder="Digite o Número da casa/apartamento"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
                <Input
                  borderRadius="32px"
                  px="16px"
                  placeholder="Digite o complemento, ex: quadra, lote, bloco"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
              </Stack>
            </Field>

            <Button
              colorScheme="green"
              size="lg"
              w="full"
              onClick={() => setStep(Math.min(step + 1, 3))}
            >
              Próximo
            </Button>
          </Stack>
        </Flex>
      </Container>
    </FormProvider>
  )
}

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <Flex alignItems="center">
      <Icon color="#B3D654" mr="8px">
        <FaAsterisk />
      </Icon>
      {children}
    </Flex>
  )
}
