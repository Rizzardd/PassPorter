import { InputGroup } from "@/components/ui/input-group";
import { Button, Input } from "@chakra-ui/react";
import Image from "next/image";
import { IoIosPin } from "react-icons/io";
import { IoLogInOutline, IoMailOutline, IoTicket } from "react-icons/io5";

export default function Login() {
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
          className="mx-auto  h-fit  "
          startElement={
            <div className="h-[6vh] w-[6vh] bg-grey rounded-full flex justify-center items-center -ml-3.5  border-2 border-grey">
              <IoMailOutline className="scale-150" />
            </div>
          }
          startElementProps={{ color: "white" }}
        >
          <Input
            placeholder="Digite seu E-mail ou Usuário"
            className="bg-dark-grey h-[6vh] w-[85vw] font-display rounded-full border-2 border-grey  "
            
          ></Input>
        </InputGroup>

        <div className="flex gap-2.5 self-start ml-[10%] ">
        <p>*</p>
        <p className="font-display text-white font-thin text-[4.5vw] w-fit">
          Senha
        </p>
      </div>

        <InputGroup
          className="mx-auto  h-fit  "
          startElement={
            <div className="h-[6vh] w-[6vh] bg-grey rounded-full flex justify-center items-center -ml-3.5  border-2 border-grey ">
              <IoIosPin className="scale-150" />
            </div>
          }
          startElementProps={{ color: "white" }}
        >
          <Input
            placeholder="Digite sua Senha"
            className="bg-dark-grey h-[6vh] w-[85vw] font-display rounded-full border-2 border-grey "
          
          ></Input>
        </InputGroup>
        <Button className="bg-grey h-[6vh] w-[85vw] font-display rounded-full border-2 border-grey justify-start mt-5 my-2 text-white ">
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
      </div>
    </main>
  );
}
