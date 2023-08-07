"use client";

import React from "react";
import SignUp from "@/components/authfield/SignUp";
import SignIn from "@/components/authfield/SignIn";
import { Flex, Text } from "@chakra-ui/react";

const HomeAuth: React.FC = () => {
  const [authState, setAuthState] = React.useState<string>("signup");
  return (
    <>
      {authState === "signin" && (
        <>
          <SignIn />
          <Text
            textAlign="center"
            fontSize="0.8rem"
            mt="1.5rem"
            fontWeight="600"
            onClick={() => setAuthState("signup")}
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
          >
            New user? Sign up here.
          </Text>
        </>
      )}
      {authState === "signup" && (
        <>
          <SignUp />
          <Text
            textAlign="center"
            mt="1.5rem"
            fontSize="0.9rem"
            fontFamily="Assistant"
            fontWeight="600"
            onClick={() => setAuthState("signin")}
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Already joined? Sign in here.
          </Text>
        </>
      )}
      {/* {props.view === "resetPassword" && <ResetPassword />} */}
    </>
  );
};

export default HomeAuth;
