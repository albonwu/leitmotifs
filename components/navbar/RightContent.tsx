"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

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
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Log out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default RightContent;
