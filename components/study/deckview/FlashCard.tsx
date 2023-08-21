"use client";

import React, { useEffect, useState } from "react";
import { Text, Card, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import AnswerButtons from "./AnswerButtons";
import {
  useDocumentDataOnce,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type FlashCardProps = {
  term: string;
  def: string;
  deckUID: string;
  cardUID: string;
  ind: number;
  changeInd: Function;
};

const throttle = (func: Function) => {
  let prev = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - prev > 150) {
      prev = now;
      return func(...args);
    }
  };
};

const FlashCard: React.FC<FlashCardProps> = ({
  term,
  def,
  deckUID,
  cardUID,
  ind,
  changeInd,
}: FlashCardProps) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [showTerm, setShowTerm] = useState<boolean>(true);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const docRef = doc(
    firestore,
    "users",
    user?.uid as string,
    "decks",
    deckUID,
    "cards",
    cardUID
  );
  const [value] = useDocumentOnce(docRef);
  const [newBox, setNewBox] = useState<number>(1);

  const flipCard = () => {
    setFlipped(!flipped);
    setShowButtons(true);
    // halfway through regular transition is duration * 0.35
    // spring transition: duration * 0.15
    setTimeout(() => setShowTerm(!showTerm), 150);
  };

  useEffect(() => {
    setNewBox(value?.data()?.box as number);
  }, [value]);

  const handleNext = async (newBox: number, newInd: number) => {
    setShowButtons(false);
    changeInd(ind + 1);
    await updateDoc(docRef, { lastDate: new Date(), box: newBox });
    setFlipped(false);
    setShowTerm(true);
  };

  return (
    <>
      <motion.div
        initial={{ transform: "rotateX(0deg)" }}
        animate={{ transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)" }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Card
          w="40rem"
          h="20rem"
          ml="auto"
          mr="auto"
          display={showTerm ? "block" : "none"}
          onClick={throttle(flipCard)}
        >
          <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
            <Text fontSize="1.5rem">{term}</Text>
          </Flex>
        </Card>
        <Card
          w="40rem"
          h="20rem"
          ml="auto"
          mr="auto"
          display={showTerm ? "none" : "block"}
          transform="rotateX(180deg)"
          onClick={throttle(flipCard)}
        >
          <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
            <Text fontSize="1.5rem">{def}</Text>
          </Flex>
        </Card>
      </motion.div>
      {showButtons && (
        <AnswerButtons box={newBox} ind={ind} handleNext={handleNext} />
      )}
    </>
  );
};

export default FlashCard;
