import { IoIosArrowDropleftCircle, IoIosPin } from "react-icons/io";
import { PasswordInput } from "@/components/ui/password-input"
import { Button, Fieldset, Input, Stack, Flex } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

import { IoLogInOutline } from "react-icons/io5";

export default function Register() {
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

      <div>
        <Fieldset.Root size="sm" maxW="md" className="">
          <Stack className="text-center my-[15vw]">
            <Fieldset.Legend className="font-display text-white font-medium text-[7vw]">
              Faça seu cadastro <br /> no{" "}
              <span className="font-display text-light-purple font-medium text-[6vw]">
                PassPorter
              </span>
            </Fieldset.Legend>
          </Stack>

          <Fieldset.Content className="gap-7 w-fit flex mx-auto">
            <Field label="Primeiro Nome" className="gap-3">
              <Input
                name="firstName"
                 placeholder="Digite seu Primeiro Nome"
                className="bg-dark-grey h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>

            <Field label="Ultimo Nome" className="gap-3">
              <Input
                name="email"
                type="email"
                placeholder="Digite seu Último Nome"
                className="bg-dark-grey h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>

            <Field label="Usuário" className="gap-3">
              <Input
                name="firstName"
                placeholder="Digite seu Usuário"
                className="bg-dark-grey h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>

            <div className="flex flex-row gap-9">
                
            <Field label="Idade" className="gap-3">
              <Input
                name="email"
                type="email"
                placeholder="Digite seu Último Nome"
                className="bg-dark-grey h-[6vh] w-[40vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>

            <Field label="Gênero" className="gap-3">
              <Input
                name="firstName"
                placeholder="Digite seu Usuário"
                className="bg-dark-grey h-[6vh] w-[40vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>
            </div>

            <div className="flex flex-row gap-2">
                
                <Field label="Telefone" className="gap-3">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Digite seu Último Nome"
                    className="bg-dark-grey h-[6vh] w-[22vw] font-display rounded-full border-2 border-grey  "
                  />
                </Field>
    
                <Field label="" className="mt-[7vw]">
                  <Input
                    name="firstName"
                    placeholder="Digite seu Usuário"
                    className="bg-dark-grey h-[6vh] w-[63vw] font-display rounded-full border-2 border-grey  "
                  />
                </Field>
                </div>
                <Field label="E-mail" className="gap-3">
              <Input
                name="email"
                type="email"
                placeholder="Digite seu Último Nome"
                className="bg-dark-grey h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>

          <Field  label="Senha" className="gap-3" >
            
          <PasswordInput   placeholder="Digite sua Senha" className="bg-dark-grey h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey  "/>
          
          </Field>
          <Field label="Confirmar Senha" className="gap-3">
          <PasswordInput   placeholder="Confirme sua Senha" className="bg-dark-grey h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey  "/>
          </Field>
          
          </Fieldset.Content>


      <div className="w-fit flex mx-auto my-8">
      <Button className="bg-white h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey justify-start text-grey ">
           <div className="h-[6vh] w-[6vh] bg-grey rounded-full flex justify-center items-center border-2 border-grey">
              <IoLogInOutline className="scale-150 text-light-green" />
            </div>
            Cadastrar-se
        </Button>
      </div>
        </Fieldset.Root>
      </div>
    </main>
  );
}
