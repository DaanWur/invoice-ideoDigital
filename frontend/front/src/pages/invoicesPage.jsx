import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
  HStack,
  Heading,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InvoicesPage() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [items, setItems] = useState([]);

  async function onSubmit(values) {
    const data = await axios.get(
      `http://localhost:8000/invoices/${values.clientId}`
    );

    const edited = data.data[0].map((obj) => JSON.parse(obj));
    setItems(edited);
  }
  return (
    <Box h="100vh" bg="#FEFBEA">
      <VStack spacing="10">
        <HStack>
          <Heading fontFamily={"cursive"}>All invoices</Heading>
        </HStack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name} w="100%">
            <FormLabel htmlFor="clientId">Client ID</FormLabel>
            <Input
              id="clientId"
              placeholder="Insert client id"
              {...register("clientId", {
                required: "This is required",
              })}
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="facebook"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>

        <TableContainer
          w="50%"
          borderRadius="33px"
          border="1px"
          borderColor="facebook.300"
        >
          <Table variant="striped" colorScheme="facebook" shadow="outline">
            <TableCaption>All invoices of a specific client</TableCaption>
            <Thead>
              <Tr>
                <Th>Client ID</Th>
                <Th>Customer ID</Th>
                <Th>Cost</Th>
                <Th>Created At</Th>
              </Tr>
            </Thead>
            <Tbody borderRadius="33px">
              {items.map((invoice, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{invoice["client_id"]}</Td>
                    <Td>{invoice["customer_id"]}</Td>
                    <Td>{invoice["cost"]}</Td>
                    <Td>
                      {invoice["created_at"].slice(0, 19).replace("T", " ")}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Button colorScheme="red" onClick={() => navigate("/")}>
          Main Page
        </Button>
      </VStack>
    </Box>
  );
}

export default InvoicesPage;
