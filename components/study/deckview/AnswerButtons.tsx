import { Button, Flex } from "@chakra-ui/react";
import React from "react";

type AnswerButtonsProps = {
  cardUID: string;
};
const AnswerButtons: React.FC<AnswerButtonsProps> = ({
  cardUID,
}: AnswerButtonsProps) => {
  return (
    <>
      <Flex w="100%" gap="8rem" justifyContent="center" mt="2rem">
        <Button
          bgColor="green.500"
          w="8rem"
          _hover={{ bgColor: "green.400" }}
          color="#fbfaf5"
        >
          Right
        </Button>
        <Button
          bgColor="red.500"
          w="8rem"
          _hover={{ bgColor: "red.400" }}
          color="#fbfaf5"
        >
          Wrong
        </Button>
      </Flex>
    </>
  );
};

export default AnswerButtons;
