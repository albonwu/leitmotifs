"use client";

import React, {useState, useEffect } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { auth } from "@/firebase/clientApp";
import RightContent from "./RightContent";

const Navbar: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    user && setMounted(true);
  }, [user]);

  return (
    <>
      <Flex backgroundColor={"transparent"} mt="1rem" alignItems="center">
        <Link href="/" passHref>
          <Flex ml="2rem" height="4.5rem" maxW="50vw">
            <Image src="/logo.svg" alt="Leitmotifs logo" />
          </Flex>
        </Link>
        {mounted && <RightContent />}
      </Flex>
    </>
  );
};

export default Navbar;
