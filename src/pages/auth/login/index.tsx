import { InputGroup } from '@/components/ui/input-group'
import { Button, Flex, Input, Text, chakra } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import NextImage from 'next/image'
import { IoIosArrowDropleftCircle, IoIosPin } from 'react-icons/io'
import { IoLogInOutline, IoMailOutline, IoTicket } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import loginImage from '@/assets/loginImage.png'
import { toaster } from '@/components/ui/toaster'
import { Field } from '@/components/ui/field'
interface FormData {
  input: string
  password: string
}

const schema = yup.object().shape({
  input: yup.string().required('Email ou Usuário são obrigatórios'),
  password: yup
    .string()
    .min(8, 'Senha precisa ter no minimo 8 caracteres')
    .required('Senha é obrigatório'),
})

const Image = chakra(NextImage)

export default function Login() {
  const navigate = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    setErrorMessage(null)

    try {
      const response = await fetch(`/api/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: data.input,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toaster.error({
          title: errorData.message || 'Login failed',
        })
        setErrorMessage(errorData.message || 'Login failed')
        return
      }

      await navigate.push('/', undefined)
      window.location.reload()
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('An error occurred during login.')
    }
  }
  return (
    <>
      <Flex
        direction="row"
        bg="rgba(0,0,0,0.8)"
        h="80px"
        alignItems="center"
        justify="center"
        w="100%"
        backdropFilter="saturate(180%) blur(9px)"
      >
        <IoIosArrowDropleftCircle
          cursor="pointer"
          onClick={() => navigate.replace('/')}
          className="text-grey w-[25%] h-[60%] ml-[-50%]"
        />
        <h1 className="font-display text-white font-medium text-[32px]">
          Entrar
        </h1>
      </Flex>
      <Flex
        bg="gray.800"
        minH="100dvh"
        maxW="100vw"
        w="100vw"
        alignItems="center"
        flexDirection={['column', , , 'row']}
      >
        <Flex
          w="100%"
          flexDirection={'column'}
          flex={[0, 0, 0, 1]}
          alignItems="center"
        >
          <div className="font-display text-white font-extrabold text-[5.5vw] mx-auto w-fit text-center">
            <h1 className=" font-display text-white font-extrabold text-[7vw]  mt-[8vw]">
              Descubra,
            </h1>
            <div className="flex gap-2 ">
              <h1 className="font-display text-white font-medium text-[6vw]  w-fit gap-0">
                Participe,
              </h1>
              <h1 className="font-display text-white font-thin text-[6vw] w-fit">
                Celebre!
              </h1>
            </div>
          </div>
          <Image
            w={['70%', '60%', '55%']}
            h={['180px', '200px', '280px']}
            my={['16px']}
            rounded="full"
            src={loginImage}
            alt={''}
          />
        </Flex>
        <Flex
          justify="center"
          flexDirection={'column'}
          flexBasis={[, , , '400px']}
          w="400px"
          h={[, , , '100dvh']}
          px="16px"
          bg={[, , , 'gray.900']}
        >
          <Text fontSize="32px" textAlign="center" className="font-display">
            Faça Login no PassPorter
          </Text>
          <Flex fontSize="24px" my="16px" justify="center">
            <Text mr="8px">*</Text>
            <Text className="font-display">Email ou Usuário</Text>
          </Flex>

          <Field
            padding="8px"
            invalid={!!errors.input}
            errorText={errors.input?.message ?? ''}
          >
            <InputGroup
              className="h-fit  group"
              w="100%"
              startElement={
                <div className="h-12 w-12 bg-grey rounded-full flex justify-center items-center -ml-3.5  border-2 border-grey group-focus-within:border-white">
                  <IoMailOutline className="scale-150" />
                </div>
              }
              startElementProps={{ color: 'white' }}
            >
              <Input
                placeholder="Digite seu E-mail ou Usuário"
                {...register('input')}
                className="bg-dark-grey h-12 font-display rounded-full border-2 border-grey group-focus-within:border-white outline-none"
              ></Input>
            </InputGroup>
          </Field>
          <Flex fontSize="24px" my="16px" justify="center">
            <Text mr="8px">*</Text>
            <Text className="font-display">Senha</Text>
          </Flex>
          <Field
            padding="8px"
            invalid={!!errors.input}
            errorText={errors.input?.message ?? ''}
          >
            <InputGroup
              className="mx-auto  h-fit group "
              w="100%"
              startElement={
                <div className="h-12 w-12 bg-grey rounded-full flex justify-center items-center -ml-3.5  border-2 border-grey group-focus-within:border-white">
                  <IoIosPin className="scale-150" />
                </div>
              }
              startElementProps={{ color: 'white' }}
            >
              <Input
                type="password"
                {...register('password')}
                placeholder="Digite sua Senha"
                className="bg-dark-grey h-12   font-display rounded-full border-2 border-grey group-focus-within:border-white outline-none"
              ></Input>
            </InputGroup>
          </Field>
          <Button
            mb="16px"
            onClick={handleSubmit(onSubmit)}
            className="bg-grey h-12  font-display rounded-full border-2 border-grey justify-start mt-5 my-2 text-white "
          >
            <div className="h-12 w-12 bg-light-green rounded-full flex justify-center items-center   border-2 border-light-green">
              <IoLogInOutline className="scale-150" />
            </div>
            Entrar
          </Button>
          <Button
            onClick={() => navigate.push('/auth/register')}
            className="bg-white h-12  font-display rounded-full border-2 border-grey justify-start text-grey "
          >
            <div className="h-12 w-12 bg-grey rounded-full flex justify-center items-center border-2 border-grey">
              <IoLogInOutline className="scale-150 text-light-green" />
            </div>
            Cadastrar-se
          </Button>
          {errorMessage}
        </Flex>
      </Flex>
    </>
  )
}
