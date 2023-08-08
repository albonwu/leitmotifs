"use client";

import React from "react";

import { Flex, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { auth } from "@/firebase/clientApp";
import RightContent from "./RightContent";

const Navbar: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <>
      <Flex backgroundColor={"transparent"} mt="1rem" alignItems="center">
        <Link href="/" passHref>
          <Flex ml="2rem" height="4.5rem" maxW="50vw">
            <Image src="/logo.svg" alt="Leitmotifs logo" />
          </Flex>
        </Link>
        {user && <RightContent />}
      </Flex>
    </>
  );
};

export default Navbar;
