import { EventCard } from '@/components/app/event-card'
import SocialMedia from '@/components/app/socialmedia'
import TranslucentCard from '@/components/app/translucentcard'
import { Button } from '@/components/ui/button'
import { ObjectId } from 'mongodb'
import {
  IoBarChart,
  IoCalendar,
  IoFolder,
  IoHome,
  IoSettings,
} from 'react-icons/io5'

export default function OrganizerProfile() {
  const CardCategory = [
    { icon: <IoHome />, name: 'Home' },
    { icon: <IoSettings />, name: 'Configurações' },
    { icon: <IoFolder />, name: 'Meus Eventos' },
  ]
  return (
    <div className="flex flex-col items-center">
      <TranslucentCard />
      <div className=" bg-dark-grey w-full h-full rounded-t-3xl px-5 py-4  flex flex-col items-center justify-center ">
        <div className="flex flex-col w-full max-w-[400px] ">
          <Button className="bg-grey h-16 w-full max-w-[400px] mt-5 font-display rounded-full border-2 border-grey text-white mb-5 mx-5 items-center justify-center">
            <IoBarChart className="scale-125 text-light-green " />
            Minha Organização
          </Button>
          <Button className="bg-grey h-16 w-full max-w-[400px] font-display rounded-full border-2 border-grey text-white mb-10 mx-5 items-center justify-center">
            <IoCalendar className="scale-125 text-light-green " />
            Criar Evento
          </Button>
        </div>
        <div className=" flex gap-5 ">
          {CardCategory.map((e, i) => (
            <Button className="w-fit px-4 h-10 bg-light-purple font-display hover:bg-dark-purple">
              {e.icon}
              {e.name}
            </Button>
          ))}
        </div>
        <div className="bg-light-green w-[350px] h-[120px] rounded-xl mt-10 flex flex-col items-center justify-center">
          <div className="h-12 w-12 bg-lime-green rounded-full flex justify-center items-center border-lime-green mt-[10px]">
            <h1 className="text-dark-grey text-[25px] font-display font-semibold">
              1
            </h1>
          </div>
          <h1 className="text-dark-grey text-[25px] font-display font-semibold">
            Eventos Criados
          </h1>
        </div>
        <div className="bg-light-green w-[350px] h-[120px] rounded-xl mt-10 flex flex-col items-center justify-center">
          <div className="h-12 w-12 bg-lime-green rounded-full flex justify-center items-center border-lime-green mt-[10px]">
            <h1 className="text-dark-grey text-[25px] font-display font-semibold">
              1
            </h1>
          </div>
          <h1 className="text-dark-grey text-[25px] font-display font-semibold">
            Eventos Criados
          </h1>
        </div>
        <div className="mt-10 px-5 gap-10 grid mx-auto">
          <EventCard
            _id={'test'}
            name={'a'}
            date={new Date()}
            imageUrl={
              'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/02/jupiter_nasa.jpg?w=1200&h=675&crop=1'
            }
          />
        </div>
        <SocialMedia />
      </div>
    </div>
  )
}
