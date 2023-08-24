"use client";

import { auth, firestore } from "@/firebase/clientApp";
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
  useDisclosure,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsTrash } from "react-icons/bs";

type DDMProps = {
  uid: string;
  setDeck: Function;
  setButtonText: Function;
};

const DeleteDeckModal: React.FC<DDMProps> = ({
  uid,
  setDeck,
  setButtonText,
}: DDMProps) => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    const docRef = doc(firestore, "users", user?.uid as string, "decks", uid);
    setDeck("" as string);
    setButtonText("Choose a deck" as string);
    await deleteDoc(docRef);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete deck"
        variant="outline"
        icon={<BsTrash />}
        color="lmPurple.100"
        colorScheme="lmPurple"
        onClick={onOpen}
        _hover={{ color: "white", backgroundColor: "lmPurple.100" }}
      />
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="1.5rem">Delete deck?</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              bgColor="lmPurple.100"
              color="white"
              mr="1rem"
              onClick={handleSubmit}
              _hover={{ backgroundColor: "lmPurple.50" }}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteDeckModal;
