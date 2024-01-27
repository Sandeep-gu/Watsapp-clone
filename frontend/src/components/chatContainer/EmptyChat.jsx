import React from "react";
import { emptyChatImage } from "../../constant";
import { Divider, Typography, Box, styled } from "@mui/material";
import { margin } from "@mui/system";
const Component = styled(Box)`
  background: #f8f9fa;
  padding: 30px 0;
  text-align: center;
  height: 100vh;
`;
const Container = styled(Box)`
  padding: 0 200px;
`;

const Image = styled("img")({
  width: 400,
  marginTop: 100,
});

const Title = styled(Typography)`
  font-size: 32px;
  margin: 25px 0 10px 0;
  font-family: inherit;
  font-weight: 300;
  color: #41535d;
`;
const SubTitle = styled(Typography)`
  font-size: 14px;
  color: #667781;
  font-weight: 400;
  font-family: inherit;
`;
const StyleDivider = styled(Divider)`
  margin: 40px 0;
  opacity: 0.4;
`;
function EmptyChat() {
  return (
    <Component>
      <Container>
        <Image src={emptyChatImage} alt="image" />
        <Title>WhatsApp</Title>
        <SubTitle>
          Now send and receive messages without keeping your phone online
        </SubTitle>
        <SubTitle>
          Use whatsApp on up to 4 linked device and 1 phone at the same time
        </SubTitle>
        <StyleDivider />
      </Container>
    </Component>
  );
}

export default EmptyChat;
