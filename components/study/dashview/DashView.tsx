"use client";

import { Flex, Button, Text, Select, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import {
  useCollection,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import DeckPreview from "./DeckPreview";

const DashView: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [value] = useCollection(
    collection(firestore, "users", user?.uid as string, "decks")
  );
  const [userDoc] = useDocumentDataOnce(
    doc(firestore, "users", user?.uid as string)
  );
  const [currentDeck, setCurrentDeck] = useState<string>("" as string);
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDeck(event.target.value);
  };
  // console.log(userDoc?.name.name)
  return (
    <>
      <Flex
        mr="auto"
        ml="auto"
        justifyContent="center"
        textAlign="center"
        flexDir="column"
      >
        <Text fontSize="2.5rem" fontFamily="Assistant">
          Welcome back,{" "}
          <span style={{ fontWeight: 800, color: "#5c38b3" }}>
            {userDoc?.name.name}!
          </span>
        </Text>

        <Select
          placeholder="Choose a deck"
          onChange={handleOptionChange}
          w="20rem"
          ml="auto"
          mr="auto"
          mt="2rem"
          mb="2rem"
        >
          {value?.docs.map((doc) => {
            // there has to be a better way to do this
            const uid = (doc as any)._key.path.segments[8];
            const title = (doc as any)._document.data.value.mapValue.fields
              .title.stringValue;

            return (
              <option value={uid} key={uid}>
                {title}
              </option>
            );
          })}
        </Select>

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
      </Flex>
    </>
  );
};

export default DashView;
