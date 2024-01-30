import React from "react";
import { Box, Dialog, styled } from "@mui/material";
import MenuContainer from "../components/chatContainer/MenuContainer";
import EmptyChat from "../components/chatContainer/EmptyChat";
import ChatBox from "../components/chatContainer/chat/ChatBox";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
export default function ChatContainer() {
  const { person } = useContext(AccountContext);
  const dialogstyle = {
    height: "95%",
    width: "100%",
    marginLeft: "20px",
    maxWidth: "100%",
    maxHeight: "100%",
    boxSadow: "none",
    overflow: "hidden",
    borderRadius: "none",
  };

  const Component = styled(Box)`
    display: flex;
  `;
  const LeftComponent = styled(Box)`
    min-width: 380px;

    height: 90%;
  `;
  const RightComponent = styled(Box)`
    width: 73%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.14);
  `;
  return (
    <Dialog open={true} PaperProps={{ sx: dialogstyle }} maxWidth={"md"}>
      <Component>
        <LeftComponent>
          <MenuContainer />
        </LeftComponent>
        <RightComponent>
          {/* <EmptyChat /> */}
          {/* {<ChatBox />} */}
          {person && Object.keys(person).length > 0 ? (
            <ChatBox />
          ) : (
            <EmptyChat />
          )}
        </RightComponent>
      </Component>
    </Dialog>
  );
}
