"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "@/chakra/themes";
import Fonts from "@/components/Fonts";
import { RecoilRoot } from "recoil";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={Theme}>
        <RecoilRoot>
        <Fonts />
        {children}
        </RecoilRoot>
      </ChakraProvider>
    </CacheProvider>
  );
}
