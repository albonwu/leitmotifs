"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const RightContent: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      {user && (
        <Flex ml="auto" mr="2rem">
          <Menu>
            <MenuButton
              as={Button}
              fontSize="min(1.5rem, 7.5vw)"
              leftIcon={<FaUserCircle />}
              bg="transparent"
              fontWeight="600"
            >
              Profile
            </MenuButton>
            <MenuList>
              <MenuItem as="a" href="/study">
                Study
              </MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={() => signOut(auth)}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </>
  );
};

export default RightContent;
