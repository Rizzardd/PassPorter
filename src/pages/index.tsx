import BannerFirstSection from "@/components/app/banner-first-section";
import { EventCard } from "@/components/app/event-card";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { Input } from "@chakra-ui/react";
import { Divide } from "lucide-react";
import { IoIosColorPalette, IoIosPin } from "react-icons/io";

import {
  IoBalloon,
  IoBaseball,
  IoBook,
  IoFastFood,
  IoGrid,
  IoMusicalNotesSharp,
  IoTicket,
} from "react-icons/io5";

const CardCategory = [
  { icon: <IoGrid />, name: "Todos" },
  { icon: <IoIosColorPalette />, name: "Artes" },
  { icon: <IoBaseball />, name: "Esportes" },
  { icon: <IoBook />, name: "Acadêmico" },
  { icon: <IoMusicalNotesSharp />, name: "Música" },
  { icon: <IoBalloon />, name: "Festival" },
  { icon: <IoFastFood />, name: "Gastronomia" },
];

export default function Home() {
  return (
    <div className=" justify-items-center bg-dark-grey h-fit">
      <BannerFirstSection />
      <div className="mt-[-6%] flex flex-col items-center gap-3">
        <InputGroup
          className="mx-auto  h-fit "
          startElement={<IoIosPin className="scale-150" />}
          startElementProps={{ color: "#F68A66" }}
        >
          <Input
            placeholder="Buscar Local"
            className="bg-white h-[6vh] w-[70vw] font-display"
            color={"#1b1b1b"}
          ></Input>
        </InputGroup>

        <InputGroup
          className="mx-auto h-fit "
          startElement={<IoTicket className="scale-150" />}
          startElementProps={{ color: "#F68A66" }}
        >
          <Input
            placeholder="Buscar Evento"
            className="bg-white h-[6vh] w-[70vw] font-display "
            color={"#1b1b1b"}
          ></Input>
        </InputGroup>
        <Button className="w-[30vw] h-[14vw] bg-orange font-display mt-[6.6%]">
          Buscar
        </Button>
      </div>

      <div className=" flex flex-wrap gap-2 mt-[9.5%] px-5">
        {CardCategory.map((e, i) => (
          <Button className="w-fit px-4 h-[12vw] bg-light-purple font-display hover:bg-dark-purple">
            {e.icon}
            {e.name}
          </Button>
        ))}
      </div>

      <div className="mt-[9.4%] px-5">
        <EventCard />
      </div>
    </div>
  );
}
