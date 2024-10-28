import { AppHeadbar } from "@/components/app/app-headbar";
import "@/styles/globals.css";
import { Provider } from "@/components/ui/provider";
import type { AppProps } from "next/app";
import { Flex, Text } from "@chakra-ui/react";
import { LayoutStoreProvider } from "@/providers/layout-store.provider";
import AppSidebar from "@/components/app/app-sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <LayoutStoreProvider>
        <Flex direction="column">
          <AppHeadbar />
          <AppSidebar>
            <div>
              {" "}
              <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
              >
                <Text
                  fontSize="2xl"
                  fontFamily="monospace"
                  fontWeight="bold"
                  mt={-2}
                >
                  Logo
                </Text>
              </Flex>
            </div>
          </AppSidebar>
          <Component {...pageProps} />
        </Flex>
      </LayoutStoreProvider>
    </Provider>
  );
}
