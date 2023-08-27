import { auth, firestore } from "@/firebase/clientApp";
import { Badge, Card, CardBody, Divider } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { Text } from "@chakra-ui/react";

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
          >
            <CardBody key={uid}>
              <Text fontWeight="800"> {term} </Text>
              <br />
              {def}
              <br />
              <Badge colorScheme={colors[box - 1]} mt="1rem">
                Box {box}
              </Badge>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};

export default DeckPreview;
