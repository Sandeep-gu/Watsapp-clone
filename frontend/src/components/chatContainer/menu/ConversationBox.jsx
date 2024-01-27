import React, { useEffect, useState } from "react";
import { Box, styled, Divider } from "@mui/material";
import ConversationClient from "./ConversationClient";
import axios from "axios";
import { useContext } from "react";
import { AcountContext } from "../../../context/AccountProvider";

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyleDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;
function ConversationBox({ text }) {
  const { account, setAccount } = useContext(AcountContext);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/fetch_user");
        if (data) {
          if (text) {
            const filterData = data.user.filter((item) =>
              item.name.toLowerCase().includes(text.toLowerCase())
            );
            console.log(filterData);
            setUser(filterData);
          } else {
            setUser(data.user);
          }

          console.log(data.user);
        } else {
          console.log("Data not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [text]);
  return (
    <>
      <Component>
        {user &&
          user
            .filter((item) => item.sub !== account.sub)
            .map((item) => (
              <Box key={item._id}>
                <ConversationClient item={item} />
                <StyleDivider />
              </Box>
            ))}
      </Component>
    </>
  );
}

export default ConversationBox;
