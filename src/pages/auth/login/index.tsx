import { InputGroup } from '@/components/ui/input-group'
import { Button, Input } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Image from 'next/image'
import { IoIosPin } from 'react-icons/io'
import { IoLogInOutline, IoMailOutline, IoTicket } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/authenticateUser`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            login: data.input,
            password: data.password,
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Login failed')
        return
      }

      const res = await response.json()
      const token = res.token

      localStorage.setItem('token', token)
      navigate.push('/')
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('An error occurred during login.')
    }
  }
  return (
    <main className="bg-dark-grey w-full">
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

      <div className="rounded-full bg-[url('../assets/loginImage.png')] mx-auto bg-cover h-[20rem] w-[50%] bg-center my-[3rem]"></div>

      <h1 className="font-display text-white font-medium text-[6vw] text-center mt-[-0.5rem]">
        Faça Login no PassPorter
      </h1>

      <div className="flex flex-col items-center gap-4 my-[2rem]">
        <div className="flex gap-2.5 self-start ml-[10%] ">
          <p>*</p>
          <p className="font-display text-white font-thin text-[4.5vw] w-fit">
            Email ou Usuário
          </p>
        </div>
        <InputGroup
          className="mx-auto  h-fit  group "
          startElement={
            <div className="h-[6vh] w-[6vh] bg-grey rounded-full flex justify-center items-center -ml-3.5  border-2 border-grey group-focus-within:border-white">
              <IoMailOutline className="scale-150" />
            </div>
          }
          startElementProps={{ color: 'white' }}
        >
          <Input
            placeholder="Digite seu E-mail ou Usuário"
            {...register('input')}
            className="bg-dark-grey h-[6vh] w-[85vw] font-display rounded-full border-2 border-grey group-focus-within:border-white outline-none"
          ></Input>
        </InputGroup>

        <div className="flex gap-2.5 self-start ml-[10%] ">
          <p>*</p>
          <p className="font-display text-white font-thin text-[4.5vw] w-fit">
            Senha
          </p>
        </div>

        <InputGroup
          className="mx-auto  h-fit group "
          startElement={
            <div className="h-[6vh] w-[6vh] bg-grey rounded-full flex justify-center items-center -ml-3.5  border-2 border-grey group-focus-within:border-white">
              <IoIosPin className="scale-150" />
            </div>
          }
          startElementProps={{ color: 'white' }}
        >
          <Input
            type="password"
            {...register('password')}
            placeholder="Digite sua Senha"
            className="bg-dark-grey h-[6vh] w-[85vw] font-display rounded-full border-2 border-grey group-focus-within:border-white outline-none"
          ></Input>
        </InputGroup>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-grey h-[6vh] w-[85vw] font-display rounded-full border-2 border-grey justify-start mt-5 my-2 text-white "
        >
          <div className="h-[6vh] w-[6vh] bg-light-green rounded-full flex justify-center items-center   border-2 border-light-green">
            <IoLogInOutline className="scale-150" />
          </div>
          Entrar
        </Button>
        <Button className="bg-white h-[6vh] w-[85vw] font-display rounded-full border-2 border-grey justify-start text-grey ">
          <div className="h-[6vh] w-[6vh] bg-grey rounded-full flex justify-center items-center border-2 border-grey">
            <IoLogInOutline className="scale-150 text-light-green" />
          </div>
          Cadastrar-se
        </Button>
        {errorMessage}
      </div>
    </main>
  )
}
