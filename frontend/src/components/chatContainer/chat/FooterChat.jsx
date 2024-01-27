import React from "react";
import { Box, InputBase, styled } from "@mui/material";
import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
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

const handleOnUpload = async (e) => {
  console.log(e);
};
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
export default function FooterChat({
  value,
  setValue,
  setSendKey,
  file,
  setFile,
}) {
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
}
