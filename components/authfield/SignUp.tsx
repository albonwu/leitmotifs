"use client";

import React, { useState } from "react";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/errors";

const SignUp: React.FC = () => {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (error) {
      setError("");
    }
    if (signUp.password !== signUp.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log("submitted")
    console.log(signUp.email)
    console.log(signUp.password)
    await createUserWithEmailAndPassword(signUp.email, signUp.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

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
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", textAlign: "center" }}
        >
          <FormControl>
            <Input
              placeholder="Email address"
              name="email"
              variant="flushed"
              type="email"
              focusBorderColor="#5c38b3"
              autoComplete="off"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Password"
              name="password"
              autoComplete="new-password"
              variant="flushed"
              type="password"
              mt="1rem"
              focusBorderColor="#5c38b3"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Confirm password"
              name="confirmPassword"
              variant="flushed"
              autoComplete="new-password"
              type="password"
              mt="1rem"
              focusBorderColor="#5c38b3"
              onChange={handleChange}
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
            type="submit"
            _hover={{ bg: "#8450ff" }}
          >
            SIGN UP
          </Button>
          <Text textAlign="center" color="red" fontSize="10pt">
            {error ||
              FIREBASE_ERRORS[
                userError?.message as keyof typeof FIREBASE_ERRORS
              ]}
          </Text>
          <Text
            mt="1.5rem"
            fontWeight="600"
            onClick={() => console.log("clicked")}
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Already joined? Log in here.
          </Text>
        </form>
      </Flex>
    </>
  );
};

export default SignUp;
