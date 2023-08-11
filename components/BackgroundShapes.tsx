import React from "react";
import Image from "next/image";

const BackgroundShapes: React.FC = () => {
  return (
    <>
      <div style={{ position: "relative", left: "10vw", top: "-300px" }}>
        <Image
          src={"arrowleft.svg"}
          alt="arrowleft"
          width={150}
          height={150}
        />
      </div>
      <div style={{ position: "relative", left: "65vw", top: "-330px" }}>
        <Image
          src={"arrowRight.svg"}
          alt="arrowright"
          width={300}
          height={300}
        />
      </div>
      <div style={{ position: "relative", left: "75vw", top: "-700px" }}>
        <Image src={"circle.svg"} alt="arrowleft" width={100} height={100} />
      </div>
    </>
  );
};

export default BackgroundShapes;
