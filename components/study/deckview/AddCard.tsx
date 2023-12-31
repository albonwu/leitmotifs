"use client";

import { Button, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import { useSearchParams } from "next/navigation";

const handleClick = async (
  uid: string,
  deck: string,
  term: string,
  definition: string
) => {
  await addDoc(collection(firestore, "users", uid, "decks", deck, "cards"), {
    term: { term },
    definition: { definition },
  });
};

const AddCard: React.FC = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("deck") as string;
  const [term, setTerm] = useState("");
  const [def, setDef] = useState("");
  const [user] = useAuthState(auth);

  const handleChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleChangeDef = (e: ChangeEvent<HTMLInputElement>) => {
    setDef(e.target.value);
  };

  const handleSubmit = () => {
    handleClick(user?.uid as string, uid, term, def);
    setTerm("");
    setDef("");
  };

  return (
    <>
      <Input onChange={handleChangeTerm}></Input>
      <Input onChange={handleChangeDef}></Input>
      <Button onClick={handleSubmit}>Add card</Button>
    </>
  );
};

export default AddCard;
