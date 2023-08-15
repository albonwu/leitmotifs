"use client";

import {
  Flex,
  Button,
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
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import DeckPreview from "./DeckPreview";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { redirect } from "next/navigation";

const DeckSelect: React.FC = () => {
  const [user] = useAuthState(auth);
  const [value] = useCollection(
    collection(firestore, "users", user?.uid as string, "decks")
  );
  const [currentDeck, setCurrentDeck] = useState<string>("" as string);
  const [buttonText, setButtonText] = useState<string>(
    "Choose a deck" as string
  );
  const [newDeck, setNewDeck] = useState<string>("" as string);
  const [toStudy, setToStudy] = useState<boolean>(false);

  // idk why this is necessary but it is
  useEffect(() => {
    toStudy && redirect("/study?deck=" + currentDeck);
  }, [toStudy]);

  const handleOptionChange = (uid: string, title: string) => {
    setCurrentDeck(uid);
    setButtonText(title);
  };

  const handleNewDeckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewDeck(e.target.value);
  };

  const handleNewDeck = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deckRef = await addDoc(
      collection(firestore, "users", user?.uid as string, "decks"),
      {
        title: newDeck,
      }
    );

    const docSnap = await getDoc(deckRef);
    console.log(docSnap);
    const uid = (docSnap as any)._key.path.segments[3];
    const title = (docSnap as any)._document.data.value.mapValue.fields.title
      .stringValue;
    setCurrentDeck(uid);
    setButtonText(title);
  };

  const handleStudy = () => {
    console.log("redirecting to /study?deck=" + currentDeck);
    setToStudy(true);
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
        <MenuButton
          as={Button}
          rightIcon={<IoIosArrowDropdownCircle fontSize="1.2rem" />}
          w="15rem"
          mt="1rem"
          ml="auto"
          mr="auto"
          mb="1rem"
        >
          {buttonText}
        </MenuButton>
        <MenuList
          w="20rem"
          ml="auto"
          mr="auto"
          mt=""
          mb="2rem"
          justifyContent="center"
        >
          <MenuItem
            // icon={<BsPlusCircleFill fontSize="15px"/>}
            onClick={() => handleOptionChange("", "New deck")}
            fontWeight="600"
          >
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
              <Button mb="1rem" w="10rem" onClick={handleStudy}>
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
            <form onSubmit={handleNewDeck}>
              <Input
                variant="flushed"
                placeholder="Name"
                w="15rem"
                ml="auto"
                mr="auto"
                onChange={handleNewDeckChange}
              />
              <Button type="submit">Create</Button>
            </form>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};

export default DeckSelect;
