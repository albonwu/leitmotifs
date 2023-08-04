"use client";

import React from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";

const SignUp: React.FC = () => {
  return (
    <>
      <Flex
        w="30rem"
        maxWidth="60vw"
        mt="6rem"
        ml="auto"
        mr="auto"
        flexDir="column"
        alignItems="center"
        fontFamily="Assistant"
      >
        <FormControl>
          <Input
            placeholder="Email address"
            variant="flushed"
            type="email"
            focusBorderColor="#5c38b3"
          />
          <Input
            placeholder="Password"
            variant="flushed"
            type="password"
            mt="1rem"
            focusBorderColor="#5c38b3"
            autoComplete="off"
          />
          <Input
            placeholder="Confirm password"
            variant="flushed"
            type="password"
            mt="1rem"
            focusBorderColor="#5c38b3"
            autoComplete="new-password"
          />
        </FormControl>
        <Button
          mt="3rem"
          w="12rem"
          maxWidth="35vw"
          h="3rem"
          background="#5c38b3"
          color="white"
          fontWeight="800"
          _hover={{ bg: "#8450ff" }}
        >
          SIGN UP
        </Button>
        <Text
          mt="1.5rem"
          fontWeight="600"
          onClick={() => console.log("clicked")}
          _hover={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Already joined? Log in here.
        </Text>
        {/* <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            OR
          </AbsoluteCenter>
        </Box> */}
        <Flex align="center">
          <Divider color="black" />
          <Text padding="2">OR</Text>
          <Divider />
        </Flex>
      </Flex>
    </>
  );
};

export default SignUp;
