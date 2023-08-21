import React, { useState } from "react";
import FlashCard from "./FlashCard";
import { Text } from "@chakra-ui/react";

type GalleryProps = {
  uid: string;
  cards: any;
};
const Gallery: React.FC<GalleryProps> = ({ uid, cards }: GalleryProps) => {
  const [curInd, setCurInd] = useState<number>(0);
  if (!cards) return <>No cards left. Good work!</>;
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
          />
        </>
      ) : (
        <>No cards left. Good work!</>
      )}

      {/* {cards.map((card: any) => {
        return (
          // TODO: add a unique key
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
            />
          </>
        );
      })} */}
    </>
  );
};

export default Gallery;
