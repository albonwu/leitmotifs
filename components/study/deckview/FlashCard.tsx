"use client";

import React, { useState } from "react";
import { Text, Card, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

type FlashCardProps = {
  term: string;
  def: string;
};

const FlashCard: React.FC<FlashCardProps> = ({ term, def }: FlashCardProps) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [showTerm, setShowTerm] = useState<boolean>(true);
  const flipCard = () => {
    setFlipped(!flipped);

    // halfway through regular transition is duration * 0.35
    // spring transition: duration * 0.15
    setTimeout(() => setShowTerm(!showTerm), 150);
  };
  return (
    <motion.div
      initial={{ transform: "rotateX(0deg)" }}
      animate={{ transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)" }}
      transition={{ type: "spring", duration: 1 }}
    >
      <Card
        w="30rem"
        h="10rem"
        display={showTerm ? "block" : "none"}
        onClick={flipCard}
        // _hover={{ boxShadow: "sm" }}
      >
        <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
          <Text>{term}</Text>
        </Flex>
      </Card>
      <Card
        w="30rem"
        h="10rem"
        display={showTerm ? "none" : "block"}
        transform="rotateX(180deg)"
        onClick={flipCard}
        // _hover={{ boxShadow: "sm" }}
      >
        <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
          <Text>{def}</Text>
        </Flex>
      </Card>
    </motion.div>
    // </Card>
  );
};

export default FlashCard;
