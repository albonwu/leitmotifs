"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { firestore, auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, doc } from "firebase/firestore";

type NCMProps = {
  uid: string;
};

// const handleSubmit = async (
//   uid: string,
//   deckUID: string,
//   term: string,
//   def: string
// ) => {
//   await addDoc(collection(firestore, "users", uid, "decks", deckUID, "cards"), {
//     term: term,
//     definition: def,
//     box: 1,
//   });
// };

// const handleSubmit = () => {};

const NewCardModal: React.FC<NCMProps> = (props: NCMProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [term, setTerm] = useState<string>("");
  const [def, setDef] = useState<string>("");
  const [user] = useAuthState(auth);

  // handles input and textarea, hence e: any
  const handleChange = (e: any) => {
    e.target.name === "term" ? setTerm(e.target.value) : setDef(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(
      collection(
        firestore,
        "users",
        user?.uid as string,
        "decks",
        props.uid,
        "cards"
      ),
      { term: term, definition: def, box: 1 }
    );
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} mb="2rem" w="10rem">
        Add a card
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input placeholder="Term" name="term" onChange={handleChange} />
              <Textarea
                placeholder="Definition"
                name="def"
                onChange={handleChange}
                mt="0.5rem"
              />
              <Button type="submit" mt="1rem">
                Add
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewCardModal;
