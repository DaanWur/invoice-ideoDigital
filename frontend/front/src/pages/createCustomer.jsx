import {
  VStack,
  FormLabel,
  HStack,
  Box,
  Heading,
  Button,
  FormControl,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function CreateCustomer() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    await axios.post("http://localhost:8000/customers/create", {
      email: values.email,
      name: values.name,
      phone_number: values.phone,
    });
    alert("Customer added succesfully");
    navigate("/");
  }

  const route = "http://localhost:8000/customers/create";
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box h="100vh" bg="#FEFBEA">
        <VStack spacing={14}>
          <HStack>
            <Heading fontFamily={"cursive"}>Add Customer</Heading>
          </HStack>
          <FormControl alignItems={"center"} w={"25%"}>
            <HStack mt="10">
              <FormLabel fontFamily={"cursive"}>Name</FormLabel>
              <Input
                placeholder="Insert Name"
                bg="facebook.100"
                id="name"
                {...register("name", { required: "'This is required'" })}
              />
            </HStack>
            <HStack mt="10">
              <FormLabel fontFamily={"cursive"}>Email</FormLabel>
              <Input
                placeholder="Insert Email"
                bg="facebook.100"
                id="email"
                {...register("email", { required: "'This is required'" })}
              />
            </HStack>
            <HStack mt="10">
              <FormLabel fontFamily={"cursive"}>Phone Number</FormLabel>
              <Input
                placeholder="Insert Phone Number"
                bg="facebook.100"
                id="phone"
                {...register("phone", { required: "'This is required'" })}
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

export default CreateCustomer;
