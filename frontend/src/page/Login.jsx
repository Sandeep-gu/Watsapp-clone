import React, { useContext } from "react";
import { Box, AppBar, Toolbar, styled } from "@mui/material";
import LoginBox from "../components/login/LoginBox";
import { AccountContext } from "../context/AccountProvider";
import ChatContainer from "./ChatContainer";
export default function Login() {
  const { account } = useContext(AccountContext);
  const Header = styled(AppBar)`
    height: 200px;
    background-color: #00bfa5;
    box-shadow: none;
  `;
  const LoginHeader = styled(AppBar)`
    height: 100px;
    background-color: #00bfa5;
    box-shadow: none;
  `;
  const Component = styled(Box)`
    height: 100vh;
    background: #dcdcdc;
  `;
  return account ? (
    <Component>
      <LoginHeader>
        <Toolbar></Toolbar>
      </LoginHeader>
      <ChatContainer />
    </Component>
  ) : (
    <Component>
      <Header>
        <Toolbar></Toolbar>
      </Header>
      <LoginBox />
    </Component>
  );
}
