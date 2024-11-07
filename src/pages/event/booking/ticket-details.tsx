import TicketCard from '@/components/app/ticket-card'
import { Button } from '@chakra-ui/react'
import { IoCheckmark } from 'react-icons/io5'

export default function TicketDetails() {
  return (
    <div className="bg-dark-grey h-full w-full">
      <TicketCard />

      <div className="w-[300px] flex flex-col  mt-5 mx-auto">
        <h1 className="py-2 font-display text-white font-bold text-[22px]">
          Reserva Confirmada
        </h1>
        <p className="font-display text-white font-thin text-[14px]">
          Temos o prazer de informar que o seu pedido de reserva foi recebido e
          confirmado.
        </p>
      </div>

      <div className="mb-5  w-[300px] mx-auto">
        <div className="w-full flex mx-auto py-5 w ">
          <Button className="bg-white h-12 w-full font-display rounded-full border-2 border-grey justify-start text-grey ">
            <div className="h-12 w-12 bg-light-green rounded-full flex justify-center items-center border-2 border-light-green">
              <IoCheckmark className="scale-150 text-dark-grey" />
            </div>
            Cadastrar-se
          </Button>
        </div>
        <div className="w-full flex mx-auto py-5 w ">
          <Button className="bg-white h-12 w-full font-display rounded-full border-2 border-grey justify-start text-grey ">
            <div className="h-12 w-12 bg-light-green rounded-full flex justify-center items-center border-2 border-light-green">
              <IoCheckmark className="scale-150 text-dark-grey" />
            </div>
            Cadastrar-se
          </Button>
        </div>
      </div>
    </div>
  )
}
