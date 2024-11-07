import TicketCard from '@/components/app/ticket-card'
import { Button } from '@chakra-ui/react'
import { IoQrCodeOutline } from 'react-icons/io5'

export default function Ticket() {
  return (
    <div className="bg-dark-grey h-full w-full">
      <TicketCard />

      <div className="  w-[300px]  flex mx-auto py-5 w ">
        <Button className="bg-white h-12 w-full font-display rounded-full border-2 border-grey justify-start text-grey ">
          <div className="h-12 w-12 bg-light-green rounded-full flex justify-center items-center border-2 border-light-green">
            <IoQrCodeOutline className="scale-125 text-dark-grey" />
          </div>
          Mostrar QR Code
        </Button>
      </div>
    </div>
  )
}
