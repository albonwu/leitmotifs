import { IconButton } from "@chakra-ui/react";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";

const DeleteCardModal: React.FC = () => {
  return (
    <>
      <IconButton
        aria-label="Delete card"
        variant="outline"
        icon={<BsPencilSquare/>}
        color="lmPurple.100"
        colorScheme="lmPurple"
        _hover={{color: "white", backgroundColor: "lmPurple.100"}}
      />
    </>
  );
};

export default DeleteCardModal;
