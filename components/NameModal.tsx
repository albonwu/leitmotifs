import { auth, firestore } from "@/firebase/clientApp";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

const handleNameSubmit = async (uid: string, name: string) => {
  const userRef = doc(firestore, "users", uid);
  await updateDoc(userRef, {
    name: { name },
  });
};

const NameModal: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { onClose } = useDisclosure();
  const [name, setName] = useState<string>("" as string);
  const [value] = useDocumentData(doc(firestore, "users", user?.uid as string));

  useEffect(() => setIsOpen(!value?.name), [value?.name]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent textAlign="center">
            <ModalHeader fontSize="1.5rem">Welcome to Leitmotifs!</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              <Text mb="1rem">What's your name?</Text>
              <Input
                placeholder="First name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                mb="1rem"
              />
              <Button
                bg="#5c38b3"
                color="white"
                onClick={() => handleNameSubmit(user?.uid as string, name)}
                _hover={{ bg: "#8450ff" }}
              >
                Submit
              </Button>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default NameModal;
