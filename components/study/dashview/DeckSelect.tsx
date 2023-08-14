"use client";

import {
  Flex,
  Button,
  Text,
  Select,
  Grid,
  GridItem,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Input,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import DeckPreview from "./DeckPreview";

const DeckSelect: React.FC = () => {
  const [user] = useAuthState(auth);
  const [value] = useCollection(
    collection(firestore, "users", user?.uid as string, "decks")
  );

  const [currentDeck, setCurrentDeck] = useState<string>("" as string);
  const [buttonText, setButtonText] = useState<string>(
    "Choose a deck" as string
  );
  const handleOptionChange = (uid: string, title: string) => {
    setCurrentDeck(uid);
    setButtonText(title);
  };

  return (
    <Flex
      mr="auto"
      ml="auto"
      justifyContent="center"
      textAlign="center"
      flexDir="column"
    >
      <Menu
      // onChange={handleOptionChange}
      >
        <MenuButton as={Button} w="10rem" ml="auto" mr="auto" mb="1rem">
          {buttonText}
        </MenuButton>
        <MenuList w="20rem" ml="auto" mr="auto" mt="2rem" mb="2rem">
          <MenuItem onClick={() => handleOptionChange("", "New deck")}>
            New deck
          </MenuItem>
          {value?.docs.map((doc) => {
            // there has to be a better way to do this
            const uid = (doc as any)._key.path.segments[8];
            const title = (doc as any)._document.data.value.mapValue.fields
              .title.stringValue;

            return (
              <MenuItem
                value={uid}
                key={uid}
                onClick={() => handleOptionChange(uid, title)}
              >
                {title}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      {currentDeck && (
        <>
          <Grid templateColumns="repeat(2, 12rem)" ml="auto" mr="auto">
            <GridItem>
              <Button mb="1rem" w="10rem">
                Study!
              </Button>
            </GridItem>
            <GridItem>
              <Button mb="2rem" w="10rem">
                Add a card
              </Button>
            </GridItem>
          </Grid>
          <DeckPreview currentUID={currentDeck} />{" "}
        </>
      )}

      {currentDeck === "" && (
        <Card w="30rem" mb="1rem" ml="auto" mr="auto" borderRadius="1rem">
          <CardHeader fontWeight="600">Create a new deck</CardHeader>
          <CardBody>
            <form>
              <Input
                variant="flushed"
                placeholder="Name"
                w="15rem"
                ml="auto"
                mr="auto"
              />
              <Button>Hello</Button>
            </form>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};

export default DeckSelect;
