import { Box } from "@mui/material";
import React from "react";
import ChatHeader from "./ChatHeader";
import MessageChat from "./MessageChat";
import { useContext } from "react";
import { AcountContext } from "../../../context/AccountProvider";
export default function ChatBox() {
  const { person } = useContext(AcountContext);
  return (
    <Box>
      <ChatHeader person={person} />
      <MessageChat person={person} />
    </Box>
  );
}
