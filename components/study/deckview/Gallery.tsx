import React, { useState } from "react";
import FlashCard from "./FlashCard";
import { Text } from "@chakra-ui/react";
import FinishMessage from "./FinishMessage";

type GalleryProps = {
  uid: string;
  cards: any;
  setWrongCards: Function;
};
const Gallery: React.FC<GalleryProps> = ({ uid, cards, setWrongCards }: GalleryProps) => {
  const [curInd, setCurInd] = useState<number>(0);
  if (!cards) return <FinishMessage />;
  var card = cards[curInd];
  return (
    <>
      {card ? (
        <>
          <Text fontSize="1.5rem" fontWeight="600" mt="0.5rem" mb="2rem">
            Box {card.data().box}
          </Text>
          <FlashCard
            key={card.data().term}
            term={card.data().term}
            def={card.data().definition}
            deckUID={uid}
            cardUID={card.id}
            ind={curInd}
            changeInd={setCurInd}
            setWrongCards={setWrongCards}
          />
        </>
      ) : (
        <FinishMessage />
      )}
    </>
  );
};

export default Gallery;
