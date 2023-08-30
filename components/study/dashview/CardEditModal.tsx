import { auth, firestore } from "@/firebase/clientApp";
import {
  Button,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiDotsHorizontalRounded } from "react-icons/bi";

type CEMProps = {
  deckUID: string;
  cardUID: string;
  term: string;
  def: string;
};

const CardEditModal: React.FC<CEMProps> = ({
  deckUID,
  cardUID,
  term,
  def,
}: CEMProps) => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const docRef = doc(
    firestore,
    "users",
    user?.uid as string,
    "decks",
    deckUID,
    "cards",
    cardUID
  );
  const [newTerm, setNewTerm] = useState<string>(term);
  const [newDef, setNewDef] = useState<string>(def);

  const handleEdit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateDoc(docRef, { term: newTerm, definition: newDef });
    onClose();
  };
  const handleDelete = async () => {
    await deleteDoc(docRef);
    onClose();
  };
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          bgColor="transparent"
          isRound={true}
          h="1.5rem"
          _hover={{ bgColor: "gray.100" }}
          icon={<BiDotsHorizontalRounded size="1.5rem" />}
        />
        <MenuList minW="0" w="7rem">
          <MenuItem w="7rem" onClick={onOpen}>
            Edit
          </MenuItem>
          <MenuItem w="7rem" onClick={handleDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleEdit}>
              <Input
                defaultValue={term}
                onChange={(e) => setNewTerm(e.target.value)}
              />
              <Textarea
                defaultValue={def}
                resize="vertical"
                mt="1rem"
                mb="1rem"
                onChange={(e) => setNewDef(e.target.value)}
              />
              <Button
                type="submit"
                bgColor="lmPurple.100"
                color="white"
                mr="1rem"
                mb="0.5rem"
                _hover={{ backgroundColor: "lmPurple.50" }}
              >
                Save
              </Button>
              <Button onClick={onClose} bgColor="gray.100" mb="0.5rem">
                Cancel
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardEditModal;
