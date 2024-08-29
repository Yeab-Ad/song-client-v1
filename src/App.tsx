import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import Main from "./Main";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Main />
    </Box>
  </ChakraProvider>
);
