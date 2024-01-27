import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { formatDate } from "../../../CommonUtils";
import { useContext } from "react";
import { AcountContext } from "../../../context/AccountProvider";
const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;
const Wrapper = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;
const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`;
function Messages({ item }) {
  const { account } = useContext(AcountContext);

  return account.sub === item.senderId ? (
    <Own>
      <Text>{item.text}</Text>
      <Time>{formatDate(item.createdAt)}</Time>
    </Own>
  ) : (
    <Wrapper>
      <Text>{item.text}</Text>
      <Time>{formatDate(item.createdAt)}</Time>
    </Wrapper>
  );
}

export default Messages;
