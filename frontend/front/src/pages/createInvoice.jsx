import {
  VStack,
  FormLabel,
  HStack,
  Box,
  Heading,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function CreateInvoice() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    try {
      console.log(values);
      await axios.post("http://localhost:8000/invoices/create", {
        client_id: values.clientId,
        customer_id: values.customerId,
        cost: values.cost,
      });
      alert("Invoice created succesfully");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box h="100vh" bg="#FEFBEA">
        <VStack spacing={14}>
          <HStack>
            <Heading fontFamily={"cursive"}>Create Invoice</Heading>
          </HStack>
          <FormControl alignItems={"center"} w={"15%"}>
            <HStack mt="10">
              <FormLabel fontFamily={"cursive"}>Client Id</FormLabel>
              <Input
                placeholder="Insert Client Id"
                bg="facebook.100"
                id="clientId"
                type="number"
                {...register("clientId", { required: "'This is required'" })}
              />
            </HStack>
            <HStack mt="10">
              <FormLabel fontFamily={"cursive"}>Customer Id</FormLabel>
              <Input
                type="number"
                placeholder="Insert Customer Id"
                bg="facebook.100"
                id="customerId"
                {...register("customerId", { required: "'This is required'" })}
              />
            </HStack>
            <HStack mt="10">
              <FormLabel fontFamily={"cursive"}>Cost</FormLabel>
              <Input
                type="number"
                placeholder="Insert Cost"
                bg="facebook.100"
                id="cost"
                {...register("cost", { required: "'This is required'" })}
              />
            </HStack>
          </FormControl>
          <Button isLoading={isSubmitting} colorScheme="facebook" type="submit">
            Submit
          </Button>
        </VStack>
      </Box>
    </form>
  );
}

export default CreateInvoice;
