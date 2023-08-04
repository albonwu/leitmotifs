import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    fonts: {
        heading: "Assistant, sans-serif",
        body: "Assistant, sans-serif",
    },
    styles: {
        global: () => ({
            body: {
                bg: "#fbfaf5",
            }
        })
    },
})

export default theme