import { BookingDetailsCard } from '@/components/app/booking-details-card'
import BookingDetailsForm from '@/components/app/booking-details-form'
import { EventCard } from '@/components/app/event-card'
import { Flex } from '@chakra-ui/react'
import { IoIosArrowDropleftCircle } from 'react-icons/io'

export default function BookingDetails() {
  return (
    <main>
      <div className="w-full h-full ">
        <BookingDetailsCard />
        <div className="px-4">
          <h1 className="font-display text-white font-medium text-[6vw] mb-5">
            Detalhes do Pedido
          </h1>
          <div className="w-full flex justify-between  mb-5">
            <p className="font-display text-white font-thin text-[4.5vw]">
              1X <span className="ml-3">Ingresso Comum</span>
            </p>
            <p className="font-display text-white font-thin text-[4.5vw]">
              R$0
            </p>
          </div>
          <div className="w-full flex justify-between mb-5">
            <p className="font-display text-white font-thin text-[4.5vw]">
              Subtotal
            </p>
            <p className="font-display text-white font-thin text-[4.5vw]">
              R$0
            </p>
          </div>
          <div className="w-full flex justify-between mb-5">
            <p className="font-display text-white font-thin text-[4.5vw]">
              Taxas
            </p>
            <p className="font-display text-white font-thin text-[4.5vw]">
              R$0
            </p>
          </div>
        </div>
        <div className="bg-dark-grey h-12 w-[90vw] font-display rounded-full mx-auto py-[0.85rem] flex ">
          <p className="font-display text-white font-thin text-[4.5vw] ml-5">
            Total
          </p>
          <p className="font-display text-white font-thin text-[4.5vw] ml-[13.5rem]">
            R$0
          </p>
        </div>
        <hr className="my-12 mx-auto h-0.5 border-t-0 w-72 bg-dark-grey" />

        <BookingDetailsForm />
      </div>
    </main>
  )
}
