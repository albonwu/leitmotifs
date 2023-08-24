"use client";

import {
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import DeckPreview from "../DeckPreview";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { redirect } from "next/navigation";
import NewDeck from "./NewDeck";
import NewCardModal from "./NewCardModal";
import DeleteDeckModal from "./DeleteDeckModal";
import EditDeckModal from "./EditDeckModal";

const newID: string = "3d7QiNIy1V4GbIS";

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
    setToStudy(true);
  };

  const showCurrent = currentDeck !== newID && currentDeck !== "";
  const showNew = currentDeck === newID || currentDeck === "";
  const empty = currentDeck === "";

  return (
    <Flex
      mr="auto"
      ml="auto"
      justifyContent="center"
      textAlign="center"
      flexDir="column"
    >
      <Menu>
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
            onClick={() => handleOptionChange(newID, "New deck")}
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

      {showCurrent && (
        <>
          <Button
            mt="1rem"
            mb="1.5rem"
            ml="auto"
            mr="auto"
            w="15rem"
            h="4rem"
            fontSize="1.2rem"
            bgColor="lmPurple.100"
            color="#ffffff"
            onClick={handleStudy}
            _hover={{ bgColor: "lmPurple.50" }}
          >
            Study!
          </Button>
          <Grid templateColumns="repeat(3, 5rem)" mb="2rem" ml="auto" mr="auto">
            <GridItem>
              <NewCardModal uid={currentDeck} />
            </GridItem>
            <GridItem>
              <EditDeckModal uid={currentDeck} setButtonText={setButtonText} />
            </GridItem>
            <GridItem>
              <DeleteDeckModal
                uid={currentDeck}
                setDeck={setCurrentDeck}
                setButtonText={setButtonText}
              />
            </GridItem>
          </Grid>
          <DeckPreview currentUID={currentDeck} />
        </>
      )}
      {empty && (
        <Text mb="1rem" fontWeight="600" fontFamily="Assistant">
          OR
        </Text>
      )}
      {showNew && (
        <NewDeck newDeck={handleNewDeck} changeDeck={handleNewDeckChange} />
      )}
    </Flex>
  );
};

export default DeckSelect;
