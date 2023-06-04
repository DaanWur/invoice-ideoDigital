import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import MainPage from "./pages/mainPage";
import CreateCustomer from "./pages/createCustomer";
import CreateInvoice from "./pages/createInvoice";
import InvoicesPage from "./pages/invoicesPage";
import CustomersPage from "./pages/customersPage";
import EditPage from "./pages/editPage";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/create-customer" element={<CreateCustomer />} />
          <Route exact path="/create-invoice" element={<CreateInvoice />} />
          <Route exact path="/get-invoices" element={<InvoicesPage />} />
          <Route exact path="/get-customers" element={<CustomersPage />} />
          <Route exact path="/edit-invoice" element={<EditPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
