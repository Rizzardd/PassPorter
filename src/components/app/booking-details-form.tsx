import { PasswordInput } from "@/components/ui/password-input";
import { Button, Fieldset, Input, Stack, Flex } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { IoCheckmark } from "react-icons/io5";

export default function BookingDetailsForm() {
  return (
    <div className="mt-[-1rem]">
      <Fieldset.Root size="sm" maxW="md" className="">
        <Stack className="text-center mb-8">
          <Fieldset.Legend className="font-display text-white font-normal text-[17px]">
            Informe seus dados para concluir o pedido
          </Fieldset.Legend>
        </Stack>

        <Fieldset.Content className="gap-7 w-fit flex mx-auto">
          <div className="w-full flex flex-row justify-between">
            <Field label="Primeiro Nome" className="gap-3">
              <Input
                name="email"
                type="email"
                placeholder="Digite seu Último Nome"
                className="bg-dark-grey h-[6vh] w-[42vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>

            <Field label="Ultimo Nome" className="gap-3">
              <Input
                name="firstName"
                placeholder="Digite seu Usuário"
                className="bg-dark-grey h-[6vh] w-[42vw] font-display rounded-full border-2 border-grey  "
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

          <Field label="Endereço" className="gap-3">
            <Input
              name="email"
              type="email"
              placeholder="Digite seu Último Nome"
              className="bg-dark-grey h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey  "
            />
          </Field>

          <div className="w-full flex flex-row justify-between">
            <Field label="Cidade" className="gap-3">
              <Input
                name="email"
                type="email"
                placeholder="Digite seu Último Nome"
                className="bg-dark-grey h-[6vh] w-[42vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>

            <Field label="Estado" className="gap-3">
              <Input
                name="firstName"
                placeholder="Digite seu Usuário"
                className="bg-dark-grey h-[6vh] w-[42vw] font-display rounded-full border-2 border-grey  "
              />
            </Field>
          </div>
          <Field label="CEP" className="gap-3">
            <Input
              name="email"
              type="email"
              placeholder="Digite seu Último Nome"
              className="bg-dark-grey h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey  "
            />
          </Field>
        </Fieldset.Content>

        <div className="flex w-full py-8 px-7 justify-between mx-auto">
          <h1>Método de Pagamento</h1>
          <span className="text-light-green text-[20px]">--</span>
        </div>

        <div className="w-fit flex mx-auto ">
          <Button className="bg-white h-[6vh] w-[90vw] font-display rounded-full border-2 border-grey justify-start text-grey ">
          <div className="h-[6vh] w-[6vh] bg-light-green rounded-full flex justify-center items-center border-2 border-light-green">
              <IoCheckmark className="scale-150 text-dark-grey" />
            </div>
            Cadastrar-se
          </Button>
        </div>
      </Fieldset.Root>
    </div>
  );
}
