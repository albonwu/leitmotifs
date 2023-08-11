import React from "react";
import HomeAuth from "@/components/authfield/HomeAuth";
import BackgroundShapes from "@/components/BackgroundShapes";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <>
      <HomeAuth />
      <BackgroundShapes />
    </>
  );
};

export default Home;
