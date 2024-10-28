import { useLayoutStore } from "@/providers/layout-store.provider";
import { IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

export function MenuToggleButton() {
  const toggleMenu = useLayoutStore((x) => x.toggleMenu);

  return (
    <IconButton
      onClick={toggleMenu}
      hideFrom="md"
      variant="ghost"
      aria-label="Abrir Menu"
      ml="3"
    >
      <FiMenu className="w-[1.8rem] h-auto"/>
    </IconButton>
  );
}
