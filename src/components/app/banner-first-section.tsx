import Image from "next/image";
import AssetFirstBanner from "@/assets/asset-banner-first-section.png";

export default function BannerFirstSection() {
  return (
    <main className=" justify-items-center">
      <div className="flex w-full h-[90vw] md:h-[80vw] mt-[-23.5vw] ">
        <div className=" bg-light-purple w-[15%] h-full pt-[23.5vw]">
          <p className=" font-display rotate-[-90deg] text-[3.60vw] w-[400%] ml-[-150%] mt-[29vw] md:mt-[16.5vw] ">
            Adquira seu Ingresso no PassPorter!
          </p>
        </div>
        <div className=" bg-light-pink w-[3%] h-full pt-[23.5vw]"></div>
        <div className=" bg-salmon w-[3%] h-full pt-[23.5vw]"></div>
        <div className=" bg-dark-purple w-full h-full pt-[23.5vw]">
          <h1 className=" font-display text-white font-extrabold text-[5.5vw] ml-[12%] mt-[8vw]">
            Descubra,
          </h1>
          <div className="flex gap-2 ml-[-5%]">
            <h1 className="font-display text-white font-medium text-[4.5vw] ml-[10%] w-fit gap-0">
              Participe,
            </h1>
            <h1 className="font-display text-white font-thin text-[4.5vw] w-fit">
              {" "}
              Celebre!
            </h1>
          </div>
          <p className="font-display text-white font-thin w-fit text-[3vw] ml-[3%] mt-[2vw]">
            Descubra o melhor da diversão! <br />
            Conecte-se com amigos, crie <br /> novas memórias e aproveite tudo{" "}
            <br /> o que a sua cidade tem a <br /> oferecer.
          </p>
          <Image alt="" src={AssetFirstBanner} className="w-[40%] h-[50%] ml-[55%] mt-[-24vw]"/>
        </div>
      </div>
    </main>
  );
}
