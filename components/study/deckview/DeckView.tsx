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
  
  const [showButtons, setShowButtons] = useState<boolean>(false);

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
          {/* <Cards /> */}
          {cards?.docs.map((card) => {
            return (
              // TODO: add a unique key
              <>
                <Text fontSize="1.5rem" fontWeight="600" mt="0.5rem" mb="2rem">
                  Box {card.data().box}
                </Text>
                <FlashCard
                  key={card.data().term}
                  term={card.data().term}
                  def={card.data().definition}
                  setShow={setShowButtons}
                />

                {showButtons && <AnswerButtons cardUID={card.id} />}
              </>
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
