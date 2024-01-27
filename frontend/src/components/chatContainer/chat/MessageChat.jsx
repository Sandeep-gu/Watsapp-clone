import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { emptyChatImage } from "../../../constant";
import FooterChat from "./FooterChat";
import { useContext } from "react";
import { AcountContext } from "../../../context/AccountProvider";

import axios from "axios";
import { Message } from "@mui/icons-material";
import Messages from "./Messages";
const Wrapper = styled(Box)`
  background-image: url(${`https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`});
  background-repeat: no-repeat;
  background-size: 100%; /* Use 'cover' to make sure the image covers the entire container */
  height: 100%;
  width: 100%;
`;
const Component = styled(Box)`
  height: 75vh;
  overflow-y: scroll; /* Vertical scrollbar */
  overflow-x: hidden;
`;
const Container = styled(Box)`
  padding: 1px 80px;
`;
export default function MessageChat({ person }) {
  const [value, setValue] = useState("");
  const [sendKey, setSendKey] = useState();
  const { account } = useContext(AcountContext);
  const [conversation, setConversation] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();

  //get conversation information
  useEffect(() => {
    const handleConversation = async () => {
      try {
        const conversationId1 = {
          SenderId: account.sub,
          ReceiverId: person.sub,
        };
        console.log("id", conversationId1);
        const { data } = await axios.post(
          "http://localhost:5000/get-conversation",
          conversationId1
        );
        setConversation(data.conversation);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    handleConversation();
  }, []);
  const handleSendMessage = async () => {
    try {
      const message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation?._id,
        type: "text",
        text: value,
      };

      const { data } = await axios.post(
        "http://localhost:5000/add-message",
        message
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  //store message
  useEffect(() => {
    if (sendKey?.which === 13) {
      handleSendMessage();
      conversation._id && handleAllMessages();
    }
  }, [sendKey, person._id, conversation._id]);

  const handleAllMessages = async () => {
    try {
      console.log("Conversation id", conversation._id);
      const { data } = await axios.get(
        `http://localhost:5000/get-message/${conversation._id}`
      );
      console.log("all message data", data);
      setMessages(data.message);
      setValue("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Wrapper>
      <Component>
        <Container>
          {messages?.map((item) => (
            <Messages key={item._id} item={item} />
          ))}
        </Container>
      </Component>
      <FooterChat
        value={value}
        setValue={setValue}
        setSendKey={setSendKey}
        file={file}
        setFile={setFile}
      />
    </Wrapper>
  );
}
