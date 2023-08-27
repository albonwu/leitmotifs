"use client";

import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { collection, doc } from "firebase/firestore";
import {
  useCollectionOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import { useSearchParams } from "next/navigation";
import Gallery from "./Gallery";

const DeckView: React.FC = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("deck") as string;
  const [user] = useAuthState(auth);
  const [value] = useDocumentDataOnce(
    doc(firestore, "users", user?.uid as string, "decks", uid)
  );
  const [cards] = useCollectionOnce(
    collection(firestore, "users", user?.uid as string, "decks", uid, "cards")
  );
  const [wrongCards, setWrongCards] = useState<string[]>([]);

  const currentCards = cards?.docs.filter((card) => {
    const lastDate = card.data().lastDate;
    const currentDate = new Date();
    if (!lastDate) return true;
    const diff = Math.abs(currentDate.getTime() - lastDate.toDate().getTime());
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    return diffDays >= Math.pow(2, card.data().box - 1);
  });

  // console.log(wrongCards);

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
          <Gallery
            uid={uid}
            cards={currentCards}
            setWrongCards={setWrongCards}
          />
        </Flex>
      ) : (
        <>Deck not found.</>
      )}
    </>
  );
};

export default DeckView;
