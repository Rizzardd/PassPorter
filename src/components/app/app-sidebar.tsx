import { useScreenDetector } from "@/hooks/useScreenDetector";
import { useLayoutStore } from "@/providers/layout-store.provider";
import { Flex } from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
} from "../ui/drawer";

export default function AppSidebar({ children }: React.PropsWithChildren<{}>) {
  const { isMobile } = useScreenDetector();
  const { menuIsOpened, setMenuOpened } = useLayoutStore();

  if (isMobile) {
    return (
      <DrawerRoot
        placement="start"
        open={menuIsOpened}
        size="full"
        onOpenChange={(evt) => setMenuOpened(evt.open)}
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerBody>{children}</DrawerBody>
          <DrawerCloseTrigger/>
        </DrawerContent>
      </DrawerRoot>
    );
  }

  return (
    <Flex
      borderRight="1px solid rgba(120,120,120,0.15)"
      maxW="440px"
      h="100%"
      flexBasis="30%"
      hideBelow="md"
    >
      {children}
    </Flex>
  );
}
