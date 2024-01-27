import React from "react";
import { Box, styled, Divider } from "@mui/material";
import { useContext } from "react";
import { AcountContext } from "../../../context/AccountProvider";
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

export default function ConversationClient({ item }) {
  const { setPerson, account } = useContext(AcountContext);
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
      <Name>{item.name}</Name>
    </StyledComponent>
  );
}
