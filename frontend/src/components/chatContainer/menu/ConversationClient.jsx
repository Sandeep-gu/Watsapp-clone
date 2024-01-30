import React from "react";
import { Box, styled, Divider, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { formatDate } from "../../../CommonUtils.jsx";
import axios from "axios";
const StyledComponent = styled(Box)`
  display: flex;
  padding: 10px 0 10px 10px;
`;

const Image = styled(Box)`
  height: 40px;
  width: 40px;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Name = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;
  color: #333; /* You can use your desired color */
`;
const Container = styled(Box)`
  display: flex;
`;

const TimeStamp = styled(Typography)`
  margin-left: auto;
  margin-right: 20px;
  font-size: 12px;
  color: #00000099;
`;

const Text = styled(Typography)`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;
export default function ConversationClient({ item }) {
  const { setPerson, account, newMessageFlag } = useContext(AccountContext);
  const [message, setMessage] = useState({});
  useEffect(() => {
    const handleConversation = async () => {
      try {
        const conversationId1 = {
          SenderId: account.sub,
          ReceiverId: item.sub,
        };

        const { data } = await axios.post(
          "http://localhost:5000/get-conversation",
          conversationId1
        );
        console.log("updated data", data.conversation.updatedAt);
        setMessage({
          text: data?.message,
          timestamp: data.conversation.updatedAt,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    handleConversation();
  }, [newMessageFlag]);

  const handleUser = async () => {
    setPerson(item);
    try {
      const response = await axios.post(
        "http://localhost:5000/add-conversation-participate",
        { SenderId: account.sub, ReceiverId: item.sub }
      );
      if (response) {
        console.log(response);
      } else {
        console.log(
          "Something went wrong for storing conversation participate id"
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <StyledComponent key={item._id} onClick={() => handleUser()}>
      <Image>
        <img src={item.picture} alt="..." />
      </Image>
      <Box style={{ width: "100%", marginLeft: "10px" }}>
        <Container>
          <Typography>{item.name}</Typography>
          {message?.text && (
            <TimeStamp>{formatDate(message?.timestamp)}</TimeStamp>
          )}
        </Container>
        <Box>
          <Text>
            {message?.text?.includes("localhost") ? " media" : message?.text}
          </Text>
        </Box>
      </Box>
    </StyledComponent>
  );
}
