import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import SignUp from "@/components/authfield/SignUp";

const Home: React.FC = () => {
  return (
    <>
      
      <SignUp />
    </>
  );
};

export default Home;
