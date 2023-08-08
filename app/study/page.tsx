"use client"

import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { use } from "react";

const Study: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  return <>Hello, {user?.email}</>;
};

export default Study;
