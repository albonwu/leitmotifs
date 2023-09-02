"use client";

import React, { useState, useEffect } from "react";
import { Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { auth } from "@/firebase/clientApp";
import RightContent from "./RightContent";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const w = useBreakpointValue({base: "75vw", sm: "50vw"})
  const h = useBreakpointValue({base: "3.5rem", sm: "4.5rem"})

  useEffect(() => {
    user && setMounted(true);
  }, [user]);

  return (
    <>
      <Flex
        backgroundColor={"transparent"}
        mt="1rem"
        h="4.5rem"
        alignItems="center"
        // outline="1px solid black"
      >
        {user ? (
          <Link href="/study" passHref>
            <Flex ml="2rem" h={h} w={w}>
              <Image src="/logo.png" alt="Leitmotifs logo" />
            </Flex>
          </Link>
        ) : (
          <Link href="/" passHref>
            <Flex ml="2rem" h="min(4.5rem, 10vw)" w="50vw">
              <Image src="/logo.png" alt="Leitmotifs logo" />
            </Flex>
          </Link>
        )}
        {mounted && <RightContent />}
      </Flex>
    </>
  );
};

export default Navbar;
