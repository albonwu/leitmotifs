"use client";

import { Flex, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import { useSearchParams } from "next/navigation";

const Cards: React.FC = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("deck") as string;
  const [user, loading] = useAuthState(auth);
  const [value] = useCollection(
    collection(firestore, "users", user?.uid as string, "decks", uid, "cards")
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
        <Text>Here are the cards in this deck:</Text>
        {value?.docs.map((doc) => {
          // there has to be a better way to do this
          const uid = (doc as any)._key.path.segments[10];
          const term = (doc as any)._document.data.value.mapValue.fields.term
            .stringValue;
          const def = (doc as any)._document.data.value.mapValue.fields
            .definition.stringValue;

          console.log(doc);

          return (
            <Text key={uid}>
              {term}
              <br />
              {def}
            </Text>
          );
        })}
      </Flex>
    </>
  );
};

export default Cards;
