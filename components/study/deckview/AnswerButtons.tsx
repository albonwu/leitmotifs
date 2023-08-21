import { Button, Flex } from "@chakra-ui/react";
import React from "react";

type AnswerButtonsProps = {
  box: number;
  ind: number;
  handleNext: Function;
};
const AnswerButtons: React.FC<AnswerButtonsProps> = ({
  box,
  ind,
  handleNext,
}: AnswerButtonsProps) => {
  return (
    <>
      <Flex w="100%" gap="8rem" justifyContent="center" mt="2rem">
        <Button
          bgColor="green.500"
          w="8rem"
          _hover={{ bgColor: "green.400" }}
          color="#fbfaf5"
          onClick={() => handleNext(Math.min(box + 1, 5), ind + 1)}
        >
          Right
        </Button>
        <Button
          bgColor="red.500"
          w="8rem"
          _hover={{ bgColor: "red.400" }}
          color="#fbfaf5"
          onClick={() => handleNext(Math.max(box - 1, 1), ind + 1)}
        >
          Wrong
        </Button>
      </Flex>
    </>
  );
};

export default AnswerButtons;
