import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const FinishMessage: React.FC = () => {
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        gap="1rem"
        h="50vh"
      >
        <Text mt="2rem" fontSize="1.5rem" fontWeight="600">
          No cards left. Good work!
        </Text>
        {/* <Text mt="2rem" fontSize="1.5rem" fontWeight="600">
          When you're ready, review the cards you missed.
        </Text> */}
        <Link href="/study">Return to dashboard</Link>
      </Flex>
    </>
  );
};

export default FinishMessage;
