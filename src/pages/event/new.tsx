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
import { FaAsterisk } from 'react-icons/fa'
import { IoInformationCircle } from 'react-icons/io5'

import { AppStepperCriar } from '@/components/app/app-stepper-criar'
import { CityDropdown } from '@/components/app/city-dropdown'
import { DropzoneInput } from '@/components/app/dropzone-input'
import { InputMasked } from '@/components/app/input-masked'
import { RichEditor } from '@/components/app/rich-editor'
import { StateDropdown } from '@/components/app/state-dropdown'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { FiChevronLeft } from 'react-icons/fi'
import * as yup from 'yup'
import ky from 'ky'
import { toaster } from '@/components/ui/toaster'
import { useRouter } from 'next/router'
import jsonToFormData from 'json-form-data'
import { StepperInput } from '@/components/ui/stepper-input'
import { EventItem } from '@/core/events/types'

const validationSchema = yup.object().shape({
  name: yup.string().required('O nome do evento é obrigátorio'),
  category: yup.string().required('A categoria do evento é obrigátoria'),
  date: yup.string().required('A data do evento é obrigatória'),
  time: yup.string().required('A hora do evento é obrigatória'),
  banner: yup.mixed().required('A imagem do banner é obrigatória'),
  description: yup.string(),
  duration: yup.string(),
  amountOfTickets: yup
    .string()
    .matches(/^[0-9]+$/, 'O número de ingressos deve ser um número')
    .required('O número de ingressos é obrigatório'),
  address: yup.object().shape({
    street: yup.string().required('A rua do evento é obrigatória'),
    number: yup.string().required('O número do evento é obrigatório'),
    complement: yup.string(),
    neighborhood: yup.string().required('O bairro do evento é obrigatório'),
    city: yup.string().required('A cidade do evento é obrigatória'),
    state: yup
      .string()
      .min(2, 'Estado tem de ter pelo menos 2 letras')
      .required('O estado do evento é obrigatório'),
    zipCode: yup.string().required('O cep do evento é obrigatório'),
  }),
})

const categories = createListCollection<{ label: string; value: string }>({
  items: [
    { label: 'Artes', value: 'artes' },
    { label: 'Esportes', value: 'esportes' },
    { label: 'Acadêmico', value: 'academico' },
    { label: 'Música', value: 'musica' },
    { label: 'Festival', value: 'festival' },
    { label: 'Gastronomia', value: 'gastronomia' },
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
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  })
  const navigate = useRouter()

  const onSubmit = methods.handleSubmit(async (values) => {
    try {
      const formData = jsonToFormData(values)

      const result = await ky.post('/api/events', {
        body: formData,
      })

      if (!result.ok) {
        toaster.error({
          title:
            (await result.json<{ message: string }>())?.message ||
            'Erro ao criar o evento',
        })
      }
      const id = (await result.json<EventItem>())._id
      navigate.push(`/event/${id}`)
    } catch (ex: any) {
      toaster.error({
        title: ex.message,
      })
    }
  })

  const {
    register,
    control,
    formState: { errors },
  } = methods

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
          <IconButton
            onClick={() => navigate.replace('/')}
            aria-label="Go back"
            variant="ghost"
            mr={2}
          >
            <FiChevronLeft />
          </IconButton>
          <Text fontSize="lg" fontWeight="medium">
            Criar um Evento Presencial
          </Text>
        </Flex>

        {/* <AppStepperCriar step={1} activeColor={activeColor} /> */}

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
              errorText={errors.name?.message}
              invalid={Boolean(errors.name?.message)}
              label={<RequiredLabel>Dê um nome ao seu evento</RequiredLabel>}
            >
              <Input
                {...register('name')}
                borderRadius="32px"
                px="16px"
                placeholder="Digite um Nome para o seu Evento"
                bg={inputBg}
                border="none"
                _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
              />
            </Field>
            <Field
              errorText={errors.name?.message}
              invalid={Boolean(errors.name?.message)}
            >
              <RequiredLabel>Quantas vagas para o evento?</RequiredLabel>
              <Controller
                control={control}
                name="amountOfTickets"
                render={({ field }) => (
                  <Flex>
                    <Button
                      borderRadius="32px"
                      mr="8px"
                      px="16px"
                      bg={inputBg}
                      border="none"
                      _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                      onClick={() => {
                        let currentValue = Number(field.value)
                        if (!currentValue) currentValue = 1
                        currentValue -= 10
                        currentValue = Math.max(1, currentValue)
                        field.onChange(`${currentValue}`)
                      }}
                    >
                      - 10
                    </Button>
                    <Flex
                      borderRadius="32px"
                      px="16px"
                      bg={inputBg}
                      border="none"
                      _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                    >
                      <StepperInput
                        value={field.value}
                        onValueChange={(x) => {
                          let value = Number(x.value)
                          value = Math.max(value, 1)
                          field.onChange(`${value}`)
                        }}
                        defaultValue="1"
                      />
                    </Flex>
                    <Button
                      borderRadius="32px"
                      ml="8px"
                      px="16px"
                      bg={inputBg}
                      border="none"
                      _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                      onClick={() => {
                        let currentValue = Number(field.value)
                        if (!currentValue) currentValue = 1
                        field.onChange(`${currentValue + 10}`)
                      }}
                    >
                      + 10
                    </Button>
                  </Flex>
                )}
              />
            </Field>
            <Field
              errorText={errors.category?.message}
              invalid={Boolean(errors.category?.message)}
              label={
                <RequiredLabel>
                  Escolha uma categoria para seu evento
                </RequiredLabel>
              }
            >
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={[field.value]}
                    onValueChange={({ value }) => field.onChange(value?.[0])}
                    onInteractOutside={() => field.onBlur()}
                    borderRadius="32px"
                    px="16px"
                    bg={inputBg}
                    border="none"
                    _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                    collection={categories}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Selecionar Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.items.map((framework) => (
                        <SelectItem item={framework} key={framework.value}>
                          {framework.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
            </Field>

            <Field
              errorText={errors.date?.message}
              invalid={Boolean(errors.date?.message)}
              label={<RequiredLabel>Quando será seu evento?</RequiredLabel>}
            >
              <Flex gap={4} mb={4} w="100%">
                <Input
                  {...register('date')}
                  type="date"
                  borderRadius="32px"
                  px="16px"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
                <Input
                  {...register('time')}
                  type="time"
                  borderRadius="32px"
                  px="16px"
                  bg={inputBg}
                  border="none"
                  _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                />
              </Flex>
            </Field>
            <Field
              errorText={errors.duration?.message}
              invalid={Boolean(errors.duration?.message)}
              label={'Qual duração do seu evento?'}
            >
              <Controller
                control={control}
                name="duration"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={[field.value ?? '']}
                    onValueChange={({ value }) =>
                      field.onChange(value?.[0] ?? '')
                    }
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
                )}
              />
            </Field>

            <DropzoneInput
              label={
                <RequiredLabel>Adicione um banner ao seu evento</RequiredLabel>
              }
              name="banner"
              accept={{ 'image/jpeg': [], 'image/png': [] }}
            />

            <Field
              errorText={errors.description?.message}
              invalid={Boolean(errors.description?.message)}
              label="Descreva seu evento"
            >
              <RichEditor name="description" />
            </Field>

            <Field
              label={
                <RequiredLabel>Em qual local será o seu evento?</RequiredLabel>
              }
            >
              <Stack gap={4} w="100%">
                <Flex>
                  <StateDropdown mr="4px" name="address.state" />

                  <CityDropdown
                    ml="4px"
                    stateName="address.state"
                    name="address.city"
                  />
                </Flex>
                <Field
                  errorText={errors.address?.street?.message}
                  invalid={Boolean(errors.address?.street?.message)}
                >
                  <Input
                    {...register('address.street')}
                    borderRadius="32px"
                    px="16px"
                    placeholder="Logradouro"
                    bg={inputBg}
                    border="none"
                    _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                  />
                </Field>
                <Field
                  errorText={errors.address?.complement?.message}
                  invalid={Boolean(errors.address?.complement?.message)}
                >
                  <Input
                    {...register('address.complement')}
                    borderRadius="32px"
                    px="16px"
                    placeholder="complemento, ex: quadra, lote, bloco"
                    bg={inputBg}
                    border="none"
                    _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                  />
                </Field>{' '}
                <Field
                  errorText={errors.address?.neighborhood?.message}
                  invalid={Boolean(errors.address?.neighborhood?.message)}
                >
                  <Input
                    {...register('address.neighborhood')}
                    borderRadius="32px"
                    px="16px"
                    placeholder="Bairro"
                    bg={inputBg}
                    border="none"
                    _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                  />
                </Field>
                <Flex>
                  <Field
                    errorText={errors.address?.number?.message}
                    invalid={Boolean(errors.address?.number?.message)}
                  >
                    <Input
                      {...register('address.number')}
                      borderRadius="32px"
                      px="16px"
                      placeholder="Número"
                      bg={inputBg}
                      border="none"
                      _focus={{ boxShadow: 'none', borderColor: 'transparent' }}
                    />
                  </Field>
                  <Field
                    errorText={errors.address?.zipCode?.message}
                    invalid={Boolean(errors.address?.zipCode?.message)}
                  >
                    <Controller
                      control={control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <InputMasked
                          onChange={field.onChange}
                          value={field.value}
                          onBlur={field.onBlur}
                          mask="_____-___"
                          borderRadius="32px"
                          px="16px"
                          ml="8px"
                          placeholder="CEP"
                          bg={inputBg}
                          border="none"
                          _focus={{
                            boxShadow: 'none',
                            borderColor: 'transparent',
                          }}
                        />
                      )}
                    />
                  </Field>
                </Flex>
              </Stack>
            </Field>

            <Button colorScheme="green" size="lg" w="full" type="submit">
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
