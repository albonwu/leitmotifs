"use client";

import { Flex, Button, Text, Input } from "@chakra-ui/react";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import { useSearchParams } from "next/navigation";
import AddCard from "./AddCard";
import Cards from "./Cards";

const DeckView: React.FC = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("deck") as string;
  const [user, loading] = useAuthState(auth);
  const [value] = useDocumentDataOnce(
    doc(firestore, "users", user?.uid as string, "decks", uid)
  );

  return (
    <>
      {value ? <>hello from {value?.title}</> : <>deck not found</>}

      <AddCard />
      <Cards />
    </>
  );
};

export default DeckView;
