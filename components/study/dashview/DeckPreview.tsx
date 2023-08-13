import { auth, firestore } from "@/firebase/clientApp";
import { Card, CardBody, Divider } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useDocument,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { Text } from "@chakra-ui/react";

type DeckPreviewProps = {
  currentUID: string;
};

const DeckPreview: React.FC<DeckPreviewProps> = (props: DeckPreviewProps) => {
  const [user] = useAuthState(auth);
  const [value, loading] = useDocumentDataOnce(
    doc(firestore, "users", user?.uid as string, "decks", props.currentUID)
  );
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
  //   useEffect(() => console.log(cards), [cards]);

  return (
    <>
      {cards?.docs.map((doc) => {
        // there has to be a better way to do this
        const uid = (doc as any)._key.path.segments[10];
        const term = (doc as any)._document.data.value.mapValue.fields.term
          .mapValue.fields.term.stringValue;
        const def = (doc as any)._document.data.value.mapValue.fields.definition
          .mapValue.fields.definition.stringValue;

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
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};

export default DeckPreview;
