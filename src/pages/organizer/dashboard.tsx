import TranslucentCard from '@/components/app/translucentcard'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdAddCircle,
  IoMdArrowDropdown,
} from 'react-icons/io'
import { IoBarChart, IoEye, IoTicket, IoTrendingUp } from 'react-icons/io5'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Mensal')
  return (
    <div className="flex flex-col items-center">
      <TranslucentCard />
      <div className=" bg-dark-grey w-full h-full rounded-t-3xl px-5 py-4  flex flex-col items-center justify-center ">
        <div className="flex flex-col w-full max-w-[400px] ">
          <Button className="bg-grey h-16 w-full max-w-[400px] mt-5 font-display rounded-full border-2 border-grey text-white mb-5 mx-5 items-center justify-center">
            <IoMdAddCircle className="scale-125 text-light-green " />
            Adicionar Organização
          </Button>
        </div>

        <div className="bg-grey w-[350px] h-[530px] rounded-2xl mt-10">
          <div className="flex items-center justify-start ml-7 h-fit mt-5">
            <div className="flex space-x-2">
              <button className="bg-lime-300 hover:bg-lime-400 text-black p-2 rounded-md">
                <IoIosArrowBack />
              </button>
              <button className="bg-lime-300 hover:bg-lime-400 text-black p-2 rounded-md">
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          <h1 className="text-[20px] font-display font-normal text-center mt-5">
            1 de Abril, 2024 - 30 de Abril, 2024
          </h1>
          <div className="flex flex-col w-full max-w-[400px] ">
            <Button className="bg-dark-grey h-16 w-full max-w-[300px] mt-5 font-display rounded-full  text-white mb-5 mx-5 items-center justify-center">
              Eventos Selecionados (1)
              <IoMdArrowDropdown className="scale-125 text-light-green " />
            </Button>
          </div>
          <div className="flex flex-col gap-4 p-4  items-center justify-center">
            {/* Card de Ingressos Vendidos */}
            <div className="w-80 bg-light-green text-black p-4 rounded-lg flex flex-col gap-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">
                  Ingressos Vendidos
                </span>
                <IoTicket size={24} />
              </div>
              <div className="text-2xl font-bold">0</div>
              <div className="flex items-center text-sm text-black/60">
                <IoTrendingUp className="mr-1" />
                0.00% do Período Anterior
              </div>
            </div>

            {/* Card de Visualizações na Página */}
            <div className="w-80 bg-light-green text-black p-4 rounded-lg flex flex-col gap-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">
                  Visualizações na Página
                </span>
                <IoEye size={24} />
              </div>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center text-sm text-black/60">
                <IoTrendingUp className="mr-1" />
                0.00% do Período Anterior
              </div>
            </div>
          </div>
        </div>
        <div className="bg-grey w-[350px] h-[420px] rounded-2xl mt-10 justify-center items-center flex">
          <div className="w-80 p-4  rounded-lg shadow-lg">
            {/* Dropdown */}
            <div className="relative">
              <button className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg text-left focus:outline-none">
                Ingressos Vendidos
                <span className="absolute right-4">&#9660;</span>
              </button>
            </div>

            {/* Título */}
            <p className="mt-4 text-sm text-gray-300">
              Veja a representação gráfica abaixo
            </p>

            {/* Tabs */}
            <div className="flex mt-4 space-x-2">
              {['Mensal', 'Semanal', 'Diário'].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-1 rounded-full ${
                    activeTab === tab
                      ? 'bg-lime-400 text-black'
                      : 'bg-gray-700 text-white'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Gráfico */}
            <div className="mt-6 grid grid-rows-10 grid-cols-1 gap-y-1 h-52">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="border-t border-gray-600">
                  <span className="text-gray-500 text-sm">{9 - i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
