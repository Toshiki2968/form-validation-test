import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import ZodForm from "./ZodForm";
import ValibotForm from "./ValibotForm";

function App() {
  return (
    <ChakraProvider>
      <div>
        <ZodForm />
        <ValibotForm />
      </div>
    </ChakraProvider>
  );
}

export default App;
