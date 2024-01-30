// FooterChat.jsx

import React, { useContext, useEffect } from "react";
import { Box, InputBase, styled } from "@mui/material";
import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import axios from "axios";
import { AccountContext } from "../../../context/AccountProvider";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 18px;
  width: 80%;
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  height: 20px;
  padding-left: 25px;
  font-size: 14px;
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
`;

const FooterChat = ({
  value,
  setValue,
  setSendKey,
  file,
  setFile,
  account,
  person,
  conversation,
}) => {
  const { socket } = useContext(AccountContext);

  useEffect(() => {
    const getImage = async () => {
      try {
        if (file) {
          const message = {
            senderId: account?.sub,
            receiverId: person?.sub,
            conversationId: conversation?._id,
          };

          const dataFile = new FormData();
          dataFile.append("name", file.name);
          dataFile.append("file", file);
          dataFile.append("message", JSON.stringify(message));

          const { data } = await axios.post(
            "http://localhost:5000/uploadFile",
            dataFile
          );

          if (data) {
            const message = {
              senderId: data?.result?.senderId,
              receiverId: data?.result?.receiverId,
              conversationId: data?.result?.AttachFileconversationId,
              type: data?.result?.type,
              text: data?.result?.text,
            };
            socket.current.emit("sendMessage", message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getImage();
  }, [file]);

  const handleOnUpload = (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setValue(e.target.files[0].name);
    }
  };

  return (
    <Container>
      <EmojiEmotionsOutlined />
      <label htmlFor="uploadFile">
        <ClipIcon />
      </label>
      <input
        id="uploadFile"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => handleOnUpload(e)}
      />
      <Search>
        <InputBase
          required
          placeholder="Type a message"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => setSendKey(e)}
          value={value}
        />
      </Search>
      <Mic />
    </Container>
  );
};

export default FooterChat;
