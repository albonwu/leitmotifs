"use client";

import { Flex, Button, Text, Input } from "@chakra-ui/react";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import {
  useCollectionDataOnce,
  useCollectionOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import { useSearchParams } from "next/navigation";
import FlashCard from "./FlashCard";
import AnswerButtons from "./AnswerButtons";
import Gallery from "./Gallery";

const DeckView: React.FC = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("deck") as string;
  const [user, loading] = useAuthState(auth);
  const [value] = useDocumentDataOnce(
    doc(firestore, "users", user?.uid as string, "decks", uid)
  );
  const [cards] = useCollectionOnce(
    collection(firestore, "users", user?.uid as string, "decks", uid, "cards")
  );

  const currentCards = cards?.docs.filter((card) => {
    const lastDate = card.data().lastDate;
    const currentDate = new Date();
    if (!lastDate) return true;
    const diff = Math.abs(currentDate.getTime() - lastDate.toDate().getTime());
    const diffDays = Math.floor(diff / (1000 * 60));
    console.log(diffDays + " minutes have passed since " + card.data().term);
    return diffDays >= Math.pow(2, card.data().box - 1);
  });

  return (
    <>
      {value ? (
        <Flex
          mt="2rem"
          ml="auto"
          mr="auto"
          justifyContent="center"
          flexDir="column"
          textAlign="center"
        >
          <Text fontSize="2rem" fontWeight="800">
            {value?.title}
          </Text>
          <Gallery uid={uid} cards={currentCards} />
        </Flex>
      ) : (
        <>Deck not found.</>
      )}
    </>
  );
};

export default DeckView;
