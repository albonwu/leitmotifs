import { Button, Flex } from "@chakra-ui/react";
import React from "react";

type AnswerButtonsProps = {
  box: number;
  ind: number;
  uid: string;
  handleNext: Function;
  setWrongCards: Function;
};
const AnswerButtons: React.FC<AnswerButtonsProps> = ({
  box,
  uid,
  ind,
  handleNext,
  setWrongCards,
}: AnswerButtonsProps) => {
  return (
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
        onClick={() => {
          handleNext(Math.max(box - 1, 1), ind + 1);
          setWrongCards((prev: any) => [...prev, uid]);
        }}
      >
        Wrong
      </Button>
    </Flex>
  );
};

export default AnswerButtons;
