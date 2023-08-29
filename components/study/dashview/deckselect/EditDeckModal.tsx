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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsPencilSquare } from "react-icons/bs";

type ECMProps = {
  uid: string;
  setButtonText: Function;
};

const EditDeckModal: React.FC<ECMProps> = ({
  uid,
  setButtonText,
}: ECMProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [user] = useAuthState(auth);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonText(title);
    const docRef = doc(firestore, "users", user?.uid as string, "decks", uid);
    await updateDoc(docRef, { title: title });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <IconButton
        aria-label="Edit card"
        variant="outline"
        icon={<BsPencilSquare />}
        color="lmPurple.100"
        colorScheme="lmPurple"
        onClick={onOpen}
        _hover={{ color: "white", backgroundColor: "lmPurple.100" }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rename deck</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input placeholder="Name" name="name" onChange={handleChange} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              bgColor="lmPurple.100"
              color="white"
              mr="1rem"
              _hover={{ bgColor: "lmPurple.50" }}
            >
              Rename
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditDeckModal;
