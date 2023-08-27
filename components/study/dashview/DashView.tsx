"use client";

import {
  Flex,
  Button,
  Text,
  Select,
  Grid,
  GridItem,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  TabIndicator,
} from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "@/firebase/clientApp";
import DeckPreview from "./DeckPreview";
import DeckSelect from "./deckselect/DeckSelect";
import StatsView from "./StatsView";

const DashView: React.FC = () => {
  const [user] = useAuthState(auth);
  const [userDoc] = useDocumentData(
    doc(firestore, "users", user?.uid as string)
  );
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(userDoc?.name);
  }, [userDoc]);

  return (
    <>
      {mounted && (
        <Flex
          mr="auto"
          ml="auto"
          mt="2rem"
          justifyContent="center"
          textAlign="center"
          flexDir="column"
        >
          <Text fontSize="2.5rem" fontFamily="Assistant">
            Welcome back,{" "}
            <span style={{ fontWeight: 800, color: "#5c38b3" }}>
              {userDoc?.name.name}!
            </span>
          </Text>
          <Tabs align="center" variant="unstyled" mt="1rem">
            <TabList>
              <Tab ml="1rem" mr="1rem">
                Your decks
              </Tab>
              <Tab ml="1rem" mr="1rem">
                Statistics
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#5c38b3"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <DeckSelect />
              </TabPanel>
              <TabPanel>
                <StatsView />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      )}
    </>
  );
};

export default DashView;
