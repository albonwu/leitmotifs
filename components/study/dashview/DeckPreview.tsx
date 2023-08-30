import { auth, firestore } from "@/firebase/clientApp";
import { Badge, Card, CardBody, Divider, Flex } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Text } from "@chakra-ui/react";
import "@/styles/styles.css";
import CardEditModal from "./CardEditModal";

type DeckPreviewProps = {
  currentUID: string;
};

const colors = ["red", "orange", "yellow", "green", "blue"];

const DeckPreview: React.FC<DeckPreviewProps> = (props: DeckPreviewProps) => {
  const [user] = useAuthState(auth);
  const [cards] = useCollection(
    collection(
      firestore,
      "users",
      user?.uid as string,
      "decks",
      props.currentUID,
      "cards"
    )
  );

  return (
    <>
      {cards?.docs.map((doc) => {
        const uid = doc.id;
        const term = doc.data().term;
        const def = doc.data().definition;
        const box: number = doc.data().box;

        return (
          <Card
            key={uid}
            w="30rem"
            mb="1rem"
            ml="auto"
            mr="auto"
            borderRadius="1rem"
            // className="card"
          >
            <CardBody key={uid}>
              <Text fontWeight="800"> {term} </Text>
              <br />
              {def}
              <br />
              <Flex
                ml="auto"
                mr="auto"
                w="100%"
                mt="1rem"
                alignItems="center"
                justifyContent="center"
              >
                <Flex w="3rem" />
                <Flex ml="auto" mr="auto">
                  <Badge colorScheme={colors[box - 1]}>Box {box}</Badge>
                </Flex>
                <CardEditModal deckUID={props.currentUID} cardUID={uid} term={term} def={def}/>
              </Flex>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};

export default DeckPreview;
