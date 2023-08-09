"use client";

import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import { Button, Flex, Text } from "@chakra-ui/react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const handleClick = async (uid: string, title: string) => {
  await addDoc(collection(firestore, "users", uid, "decks"), {
    title: "gamer",
  });
};

const Study: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [value] = useCollectionData(
    collection(firestore, "users", "BxerQEwkfhRtnw8yLWfdqHrgcfi2", "decks")
  );

  console.log(value);
  console.log(user?.uid);

  return (
    <Protected>
      <Flex
        mr="auto"
        ml="auto"
        justifyContent="center"
        textAlign="center"
        flexDir="column"
      >
        <Text fontSize="2rem">Welcome back!</Text>
        <Text>These are your decks:</Text>
        {value?.map((doc) => {
          return (
            <>
              <Text>{doc.title}</Text>
            </>
          );
        })}
        <Button onClick={() => handleClick(user?.uid as string, "hello")}>
          Click to add deck
        </Button>
      </Flex>
    </Protected>
  );
};

export default Study;
