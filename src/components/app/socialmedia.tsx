import { Button } from '@chakra-ui/react'
import {
  IoLogoDiscord,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
} from 'react-icons/io5'

export default function SocialMedia() {
  const CardCategory = [
    { icon: <IoLogoFacebook /> },
    { icon: <IoLogoInstagram /> },
    { icon: <IoLogoDiscord /> },
    { icon: <IoLogoLinkedin /> },
    { icon: <IoLogoYoutube /> },
  ]

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10">
      <div className="">
        <h1 className="text-white text-[18px] font-display font-thin text-center">
          Me encontre também em:
        </h1>
        {CardCategory.map((e) => (
          <Button className="w-fit px-2 mt-2 h-10 scale-150  font-display text-light-green">
            {e.icon}
          </Button>
        ))}
      </div>
    </div>
  )
}
