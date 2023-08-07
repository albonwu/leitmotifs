"use client";

import React from "react";

import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

type NavbarProps = {
  user: boolean;
};

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  return (
    <>
      <Flex backgroundColor={"transparent"}>
        <Link href="/" passHref>
          <Flex ml="2rem" mt="1rem" height="4.5rem">
            <Image src="/logo.svg" alt="Leitmotifs logo" />
          </Flex>
        </Link>
      </Flex>
    </>
  );
};

export default Navbar;
