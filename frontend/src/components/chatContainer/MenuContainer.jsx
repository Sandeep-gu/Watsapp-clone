import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import Header from "./menu/Header";
import Search from "./menu/Search";
import ConversationBox from "./menu/ConversationBox";

export default function MenuContainer() {
  const [text, setText] = useState();
  return (
    <Box>
      <Header />
      <Search setText={setText} />
      <ConversationBox text={text} />
    </Box>
  );
}
