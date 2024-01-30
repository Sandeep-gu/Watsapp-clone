// MessageChat.jsx

import React, { useState, useEffect, useRef } from "react";
import { Box, styled } from "@mui/material";
import axios from "axios";
import Messages from "./Messages";
import FooterChat from "./FooterChat";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";

const Wrapper = styled(Box)`
  background-image: url(${`https://www.online-tech-tips.com/wp-content/uploads/2023/03/whatsapp.jpeg`});
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
  width: 100%;
`;

const Component = styled(Box)`
  height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const MessageChat = ({ person }) => {
  const [value, setValue] = useState("");
  const [sendKey, setSendKey] = useState();
  const [conversation, setConversation] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [comingMessage, setComingMessage] = useState(null);

  const { account, socket, setNewMessageFlag } = useContext(AccountContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setComingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const handleConversation = async () => {
      try {
        const conversationId1 = {
          SenderId: account.sub,
          ReceiverId: person.sub,
        };

        const { data } = await axios.post(
          "http://localhost:5000/get-conversation",
          conversationId1
        );
        setConversation(data.conversation);
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
      socket.current.emit("sendMessage", message);
      const { data } = await axios.post(
        "http://localhost:5000/add-message",
        message
      );
      if (data) {
        setNewMessageFlag((prev) => !prev);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    conversation._id && handleAllMessages();
  }, [person, conversation._id, file]);

  useEffect(() => {
    if (sendKey?.which === 13) {
      handleSendMessage();
      conversation._id && handleAllMessages();
    }
  }, [sendKey, person._id, conversation._id]);

  const handleAllMessages = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/get-message/${conversation._id}`
      );
      setMessages(data.message);
      setValue("");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    comingMessage &&
      conversation?.member?.includes(comingMessage.senderId) &&
      setMessages((prev) => [...prev, comingMessage]);
  }, [comingMessage, conversation]);

  return (
    <Wrapper>
      <Component>
        <Container ref={scrollRef}>
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
        account={account}
        person={person}
        conversation={conversation}
      />
    </Wrapper>
  );
};

export default MessageChat;
