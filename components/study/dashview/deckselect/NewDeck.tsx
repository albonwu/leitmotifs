"use client";

import { Card, CardHeader, CardBody, Input, Button } from "@chakra-ui/react";
import React from "react";

type NewDeckProps = {
  changeDeck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newDeck: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

const NewDeck: React.FC<NewDeckProps> = (props: NewDeckProps) => {
  return (
    <Card w="30rem" mb="1rem" ml="auto" mr="auto" borderRadius="1rem">
      <CardHeader fontWeight="600">Create a new deck</CardHeader>
      <CardBody>
        <form onSubmit={props.newDeck}>
          <Input
            variant="flushed"
            placeholder="Name"
            w="15rem"
            ml="auto"
            mr="auto"
            onChange={props.changeDeck}
          />
          <Button type="submit">Create</Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default NewDeck;
