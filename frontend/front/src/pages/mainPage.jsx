import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import ButtonComponent from "../components/Button";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <Box h="100vh" bg="#FEFBEA">
      <VStack spacing={"10"}>
        <HStack>
          <Heading fontFamily={"cursive"}>IdeoDigital invoice app</Heading>
        </HStack>
        <HStack>
          <ButtonComponent title="Get Customers" action="/get-customers" />
          <ButtonComponent title="Get Invoices" action="/get-invoices" />
          <ButtonComponent title="Edit Invoice" action="/edit-invoice" />
          <ButtonComponent title="Create Incvoice" action="/create-invoice" />
          <ButtonComponent title="Add Customer" action="/create-customer" />
        </HStack>
      </VStack>
    </Box>
  );
}

export default MainPage;
