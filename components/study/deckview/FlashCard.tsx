"use client";

import React, { useState } from "react";
import { Text, Card, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import AnswerButtons from "./AnswerButtons";

type FlashCardProps = {
  term: string;
  def: string;
  setShow: Function;
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

const FlashCard: React.FC<FlashCardProps> = ({ term, def, setShow }: FlashCardProps) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [showTerm, setShowTerm] = useState<boolean>(true);
  const flipCard = () => {
    setFlipped(!flipped);
    setShow(true);
    // halfway through regular transition is duration * 0.35
    // spring transition: duration * 0.15
    setTimeout(() => setShowTerm(!showTerm), 150);
  };
  return (
    <>
      <motion.div
        initial={{ transform: "rotateX(0deg)" }}
        animate={{ transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)" }}
        transition={{ type: "spring", duration: 1 }}
        // onAnimationComplete={() => setTimeout(() => setShowTerm(!showTerm), 150)}
      >
        <Card
          w="40rem"
          h="20rem"
          ml="auto"
          mr="auto"
          display={showTerm ? "block" : "none"}
          onClick={throttle(flipCard)}
          // sx={{ backfaceVisibility: "hidden" }}
          // _hover={{ boxShadow: "sm" }}
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
          // sx={{ backfaceVisibility: "hidden" }}
          // _hover={{ boxShadow: "sm" }}
        >
          <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
            <Text fontSize="1.5rem">{def}</Text>
          </Flex>
        </Card>
      </motion.div>
    </>
    // </Card>
  );
};

export default FlashCard;
