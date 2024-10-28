import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { TbSquareRoundedChevronDownFilled } from "react-icons/tb";
import { HiOutlinePlus } from "react-icons/hi";
import { MenuToggleButton } from "./menu-toggle-button";

export function AppHeadbar({}: React.PropsWithChildren<{}>) {
  return (
    <Flex
      direction="row"
      bg="rgba(0,0,0,0.8)"
      h="80px"
      alignItems="center"
      justify="center"
      backdropFilter="saturate(180%) blur(9px)"

    >
      <MenuToggleButton/>
      <Flex h="52px" maxW="1100px" w="100%">
        <Flex
          justify="flex-start"
          alignItems="center"
          flexBasis="50%"
          flexShrink={0}
        >
          <Image
            mr="16px"
            src="https://fakeimg.pl/100x46/ffffff/454545?text=Logo&font=noto"
            h="40px"
            className="hidden"
          />
          <Button mr="16px" hidden>Home</Button>
          <Button mr="16px" hidden>Eventos</Button>
        </Flex>
        <Flex
          justify="flex-end"
          flexShrink={0}
          flexBasis="50%"
          alignItems="center"
        >
          <Button bg="white" color="black" px="16px" mr="16px" className="hidden">
            Criar Eventos
          </Button>
          <MenuRoot >
            <MenuTrigger asChild className="mr-[1rem]">
              <Button>
                <Avatar src="https://avatar.iran.liara.run/public" />
                <TbSquareRoundedChevronDownFilled />
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="new-txt">New Text File</MenuItem>
              <MenuItem value="new-file">New File...</MenuItem>
              <MenuItem value="new-win">New Window</MenuItem>
              <MenuItem value="open-file">Open File...</MenuItem>
              <MenuItem value="export">Export</MenuItem>
            </MenuContent>
          </MenuRoot>
        </Flex>
      </Flex>
    </Flex>
  );
}
