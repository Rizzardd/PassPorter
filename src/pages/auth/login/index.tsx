import Image from "next/image";



export default function Login() {
    return (
      <main className="bg-dark-grey w-full">
        <div className="font-display text-white font-extrabold text-[5.5vw] mx-auto w-fit">
          <h1 className=" font-display text-white font-extrabold text-[7vw] ml-[12%] mt-[8vw]">
            Descubra,
          </h1>
          <div className="flex gap-2 ml-[-17%]">
            <h1 className="font-display text-white font-medium text-[6vw] ml-[10%] w-fit gap-0">
              Participe,
            </h1>
            <h1 className="font-display text-white font-thin text-[6vw] w-fit">
              Celebre!
            </h1>
          </div>
        </div>

       <div className="rounded-full bg-[url('../../../assets/loginImage.png')] h-[10rem] w-[50%]"></div>
      </main>
    );
  }
  