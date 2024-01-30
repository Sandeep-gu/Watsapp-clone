import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";

const ImageContainer = styled(Box)`
  height: 130px;
  width: 130px;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 90px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const BoxWrapper = styled(Box)`
  background: #ffffff;
  padding: 12px 30px 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  & :first-of-type {
    font-size: 13px;
    color: #009668;
    font-weight: 200;
  }
  & :last-child {
  }
  font-size: 13px;
  margin: 14px 0;
  color: #4a4a4a;
`;
const DescriptionContainer = styled(Box)`
  padding: 12px 30px 2px;
  font-size: 10px;
  color: #4a4a4a;
`;
function Profile() {
  const { account, setAccount } = useContext(AccountContext);
  return (
    <>
      <ImageContainer>
        <img
          //   src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
          src={account.picture}
          alt="..."
        />
      </ImageContainer>
      <BoxWrapper>
        <Typography>Name</Typography>
        <Typography>{account?.name}</Typography>
      </BoxWrapper>
      <DescriptionContainer>
        <Typography>
          This is not your username or pin.this name will be vsisible to your
          WhatsApp contacts.
        </Typography>
      </DescriptionContainer>
      <BoxWrapper>
        <Typography>About</Typography>
        <Typography>I am Software Engineer</Typography>
      </BoxWrapper>
    </>
  );
}

export default Profile;
