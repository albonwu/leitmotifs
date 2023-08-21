"use client";

import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import DashView from "@/components/study/dashview/DashView";
import DeckView from "@/components/study/deckview/DeckView";
import { redirect, useSearchParams } from "next/navigation";
import NameModal from "@/components/NameModal";

const Study: React.FC = () => {
  const [user] = useAuthState(auth);
  const searchParams = useSearchParams();

  useEffect(() => {
    !user && redirect("/");
  }, [user]);
  
  if (!user) {
    return null;
  }
  return (
    <Protected>
      {searchParams.get("deck") ? <DeckView /> : <DashView />}
      <NameModal />
    </Protected>
  );
};

export default Study;
