"use client";

import { Flex, Button, Text, Input } from "@chakra-ui/react";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import {
  useCollectionDataOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import { useSearchParams } from "next/navigation";
import AddCard from "./AddCard";
import Cards from "./Cards";
import FlashCard from "./FlashCard";

const DeckView: React.FC = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("deck") as string;
  const [user, loading] = useAuthState(auth);
  const [value] = useDocumentDataOnce(
    doc(firestore, "users", user?.uid as string, "decks", uid)
  );
  const [cards] = useCollectionDataOnce(
    collection(firestore, "users", user?.uid as string, "decks", uid, "cards")
  );

  return (
    <>
      {value ? (
        <Flex
          ml="auto"
          mr="auto"
          justifyContent="center"
          flexDir="column"
          textAlign="center"
        >
          <Text fontSize="2rem" fontWeight="800">
            {value?.title}
          </Text>
          {/* <Cards /> */}
          {cards?.map((card) => {
            return (
              // TODO: add a unique key
              <FlashCard
                key={card.term}
                term={card.term}
                def={card.definition}
              />
            );
          })}
        </Flex>
      ) : (
        <>Deck not found.</>
      )}
    </>
  );
};

export default DeckView;
