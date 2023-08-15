import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

type ProtectedProps = {
  children: React.ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ children }: ProtectedProps) => {
  const [user, loading] = useAuthState(auth);
  const [mounted, setMounted] = useState(false); // prevents HTML mismatch

  useEffect(() => {
    !user && !loading && redirect("/");
    user && setMounted(true);
  }, [loading]);

  return <>{mounted && children}</>;
};

export default Protected;
