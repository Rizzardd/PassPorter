import Image from "next/image";
import EventCardImage from "@/assets/eventcardimage.png";
import BarCode from "@/assets/barcode.svg";
import { IoCheckmark, IoDownloadOutline } from "react-icons/io5";

export default function TicketCard() {
  return (
    <div className="flex justify-center items-center h-full mt-10">
      <div className="w-[300px] sm:w-[380px] sm:h-[700px] bg-grey rounded-3xl shadow-md p-4 relative">
        <div className="text-center text-white text-xl font-semibold  font-display">
          Ingresso
        </div>
        <div className="w-full py-5 ">
          <div className="absolute top-[19.2rem] sm:top-[22.8rem] left-[-8px] h-6 w-6 bg-dark-grey rounded-full"></div>
          <div className="absolute top-[19.2rem] sm:top-[22.8rem] right-[-8px] h-6 w-6 bg-dark-grey rounded-full"></div>
          <div className="absolute bottom-[5.8rem] sm:top-[36rem] left-[-8px] h-6 w-6 bg-dark-grey rounded-full"></div>
          <div className="absolute bottom-[5.8rem] sm:top-[36rem] right-[-8px] h-6 w-6 bg-dark-grey rounded-full"></div>

          <Image
            alt=""
            src={EventCardImage}
            className="w-full h-full rounded-3xl mb-5"
          />

          <div className="items-center w-full flex justify-between mx-auto">
            <h1 className="font-display text-white font-medium text-lg text-start">
              Palestra sobre Virtual Reality
            </h1>
            <div className="h-[3vh] w-[3vh] bg-light-green rounded-full flex justify-center items-center border-2 border-light-green mx-auto sm:ml-24">
              <IoDownloadOutline className="scale-125 text-dark-grey" />
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="border-t border-dashed border-zinc-600 mb-4"></div>

        {/* Informações do ingresso */}
        <div className="flex justify-between text-gray-400 text-sm font-display mt-9">
          <div>
            <p>Local</p>
            <p className="text-white">Faculdade de Tecnologia Fatec Senai</p>
          </div>
          <div className="text-right">
            <p>Cidade</p>
            <p className="text-white">Cuiabá - MT</p>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="mt-4 font-display">
            <p className="text-gray-400 text-sm">Nome</p>
            <p className="text-white text-sm">John Doe</p>
          </div>

          <div className="mt-4 flex justify-between font-display">
            <div>
              <p className="text-gray-400 text-sm">Assento</p>
              <p className="text-white">--</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="mt-4 font-display">
            <p className="text-gray-400 text-sm">Data</p>
            <p className="text-white text-sm">Março 29, 2024</p>
          </div>

          <div className="mt-4 flex justify-between font-display">
            <div>
              <p className="text-gray-400 text-sm">Horário</p>
              <p className="text-white">22:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-zinc-600 mt-4 mb-2"></div>

        {/* Código de barras */}
        <div className="h-20">
          <Image alt="" src={BarCode} />
        </div>
      </div>
    </div>
  );
}
