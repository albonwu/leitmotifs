"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "@/chakra/themes";
import { RecoilRoot } from "recoil";
import "@fontsource/assistant/200.css";
import "@fontsource/assistant/400.css";
import "@fontsource/assistant/600.css";
import "@fontsource/assistant/700.css";
import styled from "@emotion/styled";

const FontContainer = styled.div`
  font-family: "Assistant", sans-serif;
`;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={Theme}>
        <RecoilRoot>
          <FontContainer>{children}</FontContainer>
        </RecoilRoot>
      </ChakraProvider>
    </CacheProvider>
  );
}
