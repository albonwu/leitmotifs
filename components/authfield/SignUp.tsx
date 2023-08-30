"use client";

import React, { useState, useEffect } from "react";
import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

const SignUp: React.FC = () => {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (error) {
      setError("");
    }
    if (signUp.password !== signUp.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    await createUserWithEmailAndPassword(signUp.email, signUp.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const createUserDocument = async (user: User) => {
    await setDoc(
      doc(firestore, "users", user.uid),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (user) {
      createUserDocument(user.user);
      redirect("/study");
    }
  }, [user]);

  return (
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
            // id prop fixes "Prop id did not match between server and client" error
            id="email"
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
            id="password"
            placeholder="Password"
            name="password"
            variant="flushed"
            type="password"
            mt="1rem"
            focusBorderColor="#5c38b3"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <Input
            id="confirmPassword"
            placeholder="Confirm password"
            name="confirmPassword"
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
          SIGN UP
        </Button>
        <Text textAlign="center" color="red" fontSize="10pt" mt="1rem">
          {error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      </form>
    </Flex>
  );
};

export default SignUp;
