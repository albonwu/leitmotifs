"use client";

import { Flex, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";

const handleClick = async (uid: string, title: string) => {
  await addDoc(collection(firestore, "users", uid, "decks"), {
    title: "gamer",
  });
};

const DashView: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [value] = useCollection(
    collection(firestore, "users", user?.uid as string, "decks")
  );

  return (
    <>
      <Flex
        mr="auto"
        ml="auto"
        justifyContent="center"
        textAlign="center"
        flexDir="column"
      >
        <Text fontSize="2rem">Welcome back!</Text>
        <Text>These are your decks:</Text>
        {value?.docs.map((doc) => {
          // there has to be a better way to do this
          const uid = (doc as any)._key.path.segments[8];
          const title = (doc as any)._document.data.value.mapValue.fields.title
            .stringValue;

          return (
            <Link key={uid} href={`/study?deck=${uid}`}>
              {title}
            </Link>
          );
        })}
        <Button onClick={() => handleClick(user?.uid as string, "hello")}>
          Click to add deck
        </Button>
      </Flex>
    </>
  );
};

export default DashView;
