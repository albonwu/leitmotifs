"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";

const RightContent: React.FC = () => {
  return (
    <Flex ml="auto" mr="2rem">
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FaUserCircle />}
          isRound
          fontSize="min(3rem, 7.5vw)"
          bg="transparent"
        />
        <MenuList>
          <MenuItem as="a" href="/study">
            Study
          </MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={() => signOut(auth)}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default RightContent;
