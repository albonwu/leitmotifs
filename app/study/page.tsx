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
  const [user, loading] = useAuthState(auth);
  const [rerender, setRerender] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    !user && !loading && redirect("/");
  }, [user]);

  useEffect(() => console.log(rerender), [rerender]);

  if (!user) {
    return null;
  }

  return (
    <Protected>
      {searchParams.get("deck") ? <DeckView /> : <DashView />}
      <NameModal reload={setRerender} />
    </Protected>
  );
};

export default Study;
