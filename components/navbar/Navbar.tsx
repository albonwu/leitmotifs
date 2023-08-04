"use client";

import React from "react";

import { Flex, Image } from "@chakra-ui/react";

type NavbarProps = {
  user: boolean;
};

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  return (
    <>
      <Flex backgroundColor={"transparent"}>
        <Flex ml="2rem" mt="1rem" height="4.5rem">
          <Image src="/logo.svg" alt="Leitmotifs logo" />
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
