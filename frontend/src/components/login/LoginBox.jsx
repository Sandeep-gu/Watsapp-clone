import React from "react";
import { Box, Dialog, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../../constant";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider.jsx";
import axios from "axios";
const dialogstyle = {
  height: "90%",
  width: "60%",
  marginTop: "12%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxSadow: "none",
  overflow: "hidden",
  hidebackdrop: "hidden",
};
const Component = styled(Box)`
  display: flex;
`;
const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;
const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;
const QRCode = styled("img")({
  height: 264,
  width: 264,
  margin: "50px 0 0 50px",
});
const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;
function LoginBox() {
  const { setAccount } = useContext(AccountContext);

  const onSuccessLogin = async (res) => {
    try {
      console.log(res);
      const decode = jwtDecode(res.credential);
      console.log(decode);
      const { data } = await axios.post(
        "http://localhost:5000/add_data",
        decode
      );
      console.log(data);
      setAccount(decode);
    } catch (error) {
      console.log(error.message);
    }
  };
  const onErrorLogin = (res) => {
    consoel.log(res);
  };
  return (
    <Dialog open={true} PaperProps={{ sx: dialogstyle }}>
      <Component>
        <Container>
          <Title>To use Watsapp on your computer:</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap Menu settings and select WhatsApp Web</ListItem>
            <ListItem>
              3. Point your phone to this screen to capture the code
            </ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCode src={qrCodeImage} alt="qr-code" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateX(50%)",
            }}
          >
            <GoogleLogin onSuccess={onSuccessLogin} onError={onErrorLogin} />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
}

export default LoginBox;
