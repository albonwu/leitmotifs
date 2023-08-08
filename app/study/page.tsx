"use client";

import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import Protected from "@/components/Protected";

const Study: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  return <Protected>Welcome back, {user?.email}</Protected>;
};

export default Study;
