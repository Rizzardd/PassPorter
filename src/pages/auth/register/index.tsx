import { IoIosArrowDropleftCircle, IoIosPin } from 'react-icons/io'
import { PasswordInput } from '@/components/ui/password-input'
import { Button, Fieldset, Input, Stack, Flex } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'

import { IoLogInOutline } from 'react-icons/io5'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object().shape({
  name: yup.string().required('Primeiro Nome é obrigatório'),
  surname: yup.string().required('Último Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  username: yup.string().required('Usuário é obrigatório'),
  birthDate: yup
    .date()
    .required('Data de Nascimento é obrigatória')
    .max(new Date(), 'Data de Nascimento não pode estar no futuro'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .matches(/[0-9]/, 'Senha deve conter ao menos 1 número')
    .matches(/[A-Z]/, 'Senha deve conter ao menos 1 letra maiúscula')
    .matches(/[a-z]/, 'Senha deve conter ao menos 1 letra minúscula')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Senha deve conter ao menos 1 caractere especial'
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
  phone: yup.object().shape({
    areacode: yup
      .string()
      .required('Código de área é obrigatório')
      .matches(/^[0-9]+$/, 'Código de área deve conter apenas números'),
    number: yup
      .string()
      .required('Número é obrigatório')
      .matches(/^[0-9]+$/, 'Número deve conter apenas números')
      .min(8, 'Número deve conter pelo menos 8 dígitos'),
  }),
})

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: any) => {
    console.log('Form Data:', data)
  }

  return (
    <main className="bg-dark-grey w-full">
      <Flex
        direction="row"
        bg="rgba(0,0,0,0.8)"
        h="80px"
        alignItems="center"
        justify="center"
        backdropFilter="saturate(180%) blur(9px)"
      >
        <IoIosArrowDropleftCircle className="text-grey w-[25%] h-[60%] ml-[-50%]" />
        <h1 className="font-display text-white font-medium text-[6vw]">
          Cadastro
        </h1>
      </Flex>

      <div className="w-full flex flex-col items-center px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full">
          <Stack className="text-center my-16">
            <div className="font-display text-white font-semibold text-[40px] leading-none">
              Faça seu cadastro <br /> no{' '}
              <span className="text-light-purple">PassPorter</span>
            </div>
          </Stack>

          <div className="gap-7 w-fit flex mx-auto flex-col">
            <Field label="Primeiro Nome" className="gap-3">
              <Input
                {...register('name')}
                placeholder="Digite seu Primeiro Nome"
                className="bg-dark-grey h-12 w-full font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </Field>

            <Field label="Último Nome" className="gap-3">
              <Input
                {...register('surname')}
                placeholder="Digite seu Último Nome"
                className="bg-dark-grey h-12 w-full font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
              />
              <p className="text-red-500">{errors.surname?.message}</p>
            </Field>

            <Field label="Usuário" className="gap-3">
              <Input
                {...register('username')}
                placeholder="Digite seu Usuário"
                className="bg-dark-grey h-12 w-full font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
              />
              <p className="text-red-500">{errors.username?.message}</p>
            </Field>

            <Field label="Data de Nascimento" className="gap-3">
              <Input
                {...register('birthDate')}
                type="date"
                placeholder="Selecione sua Data de Nascimento"
                className="bg-dark-grey h-12 w-full font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
              />
              <p className="text-red-500">{errors.birthDate?.message}</p>
            </Field>

            <div className="flex flex-row gap-2 items-center">
              <Field label="Telefone" className="gap-3 w-full">
                <div className="flex w-full justify-between gap-3">
                  <Input
                    {...register('phone.areacode')}
                    placeholder="DDD"
                    className="bg-dark-grey h-12 w-[20%] font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
                  />
                  <Input
                    {...register('phone.number')}
                    placeholder="Número"
                    className="bg-dark-grey h-12 w-full font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
                  />
                </div>
                <p className="text-red-500">
                  {errors.phone?.areacode?.message}
                </p>
                <p className="text-red-500">{errors.phone?.number?.message}</p>
              </Field>
            </div>

            <Field label="E-mail" className="gap-3">
              <Input
                {...register('email')}
                type="email"
                placeholder="Digite seu E-mail"
                className="bg-dark-grey h-12 w-full font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </Field>

            <Field label="Senha" className="gap-3">
              <PasswordInput
                {...register('password')}
                placeholder="Digite sua Senha"
                className="bg-dark-grey h-12 w-full font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </Field>

            <Field label="Confirmar Senha" className="gap-3">
              <PasswordInput
                {...register('passwordConfirmation')}
                placeholder="Confirme sua Senha"
                onChange={() => trigger('passwordConfirmation')}
                className="bg-dark-grey h-12 w-full font-display rounded-full border-2 border-grey focus:border-white outline-none px-4"
              />
              <p className="text-red-500">
                {errors.passwordConfirmation?.message}
              </p>
            </Field>
          </div>

          <div className="w-full flex mx-auto my-8">
            <Button
              type="submit"
              className="bg-grey h-12 w-full font-display rounded-full border-2 border-grey justify-start text-white "
            >
              <div className="h-12 w-12 bg-light-green rounded-full flex justify-center items-center border-2 border-grey">
                <IoLogInOutline className="scale-150 text-grey" />
              </div>
              Finalizar Cadastro
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
