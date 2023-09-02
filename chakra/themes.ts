import { extendTheme } from "@chakra-ui/react";
import '@fontsource/assistant/200.css'
import '@fontsource/assistant/400.css'
import '@fontsource/assistant/600.css'
import '@fontsource/assistant/700.css'

const theme = extendTheme({
  fonts: {
    heading: "Assistant, sans-serif",
    body: "Assistant, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#fbfaf5",
      },
    }),
  },
  colors: {
    lmPurple: {
      50: "#8450ff",
      100: "#5c38b3",
    },
    lmGold: {
      50: "#fff6d3",
      75: "#ffe057",
      100: "#ffc14d",
      200: "#b39836",
    },
  },
});

export default theme;
