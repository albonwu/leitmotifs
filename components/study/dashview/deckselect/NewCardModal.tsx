"use client";

import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { firestore, auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { AiOutlinePlus } from "react-icons/ai";

type NCMProps = {
  uid: string;
};

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

    console.log("submitted");
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="Add a card"
        icon={<AiOutlinePlus />}
        color="lmPurple.100"
        colorScheme="lmPurple"
        _hover={{ color: "white", backgroundColor: "lmPurple.100" }}
      />
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
              <Button
                type="submit"
                bgColor="lmPurple.100"
                color="white"
                mr="1rem"
                mt="1rem"
                mb="0.5rem"
                _hover={{ backgroundColor: "lmPurple.50" }}
              >
                Add
              </Button>
              <Button mt="1rem" mb="0.5rem" onClick={onClose}>
                Cancel
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewCardModal;
