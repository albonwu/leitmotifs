"use client";

import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [emailCopy, setEmailCopy] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailCopy(signUp.email);
    await signInWithEmailAndPassword(signUp.email, signUp.password);

    if (user && !error) {
      console.log("success");
      router.push("/study");
    }
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
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Password"
              name="password"
              variant="flushed"
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
            SIGN IN
          </Button>
          <Text textAlign="center" color="red" fontSize="10pt">
            {error &&
              FIREBASE_ERRORS[
                error?.message as keyof typeof FIREBASE_ERRORS
              ]?.replace("${email}", emailCopy)}
          </Text>
        </form>
      </Flex>
    </>
  );
};

export default SignIn;
