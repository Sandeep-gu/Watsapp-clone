import React from "react";
import { Drawer, styled, Box, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Profile from "./Profile";

const drawerStyle = {
  left: 20,
  top: 17,
  height: "94%",
  width: "30%",
  boxshadow: "none",
  minWidth: "30%",
};
const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #ffffff;
  display: flex;

  & > svg,
  & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
  }
`;

const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;
function LeftDrawer({ open, setOpen }) {
  console.log(open);
  const handleclose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      open={open}
      onClose={handleclose}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1500, minWidth: "130px" }}
    >
      <Header>
        <ArrowBack onClick={() => setOpen(false)} />
        <Typography>Profile</Typography>
      </Header>
      <Component>
        <Profile />
      </Component>
    </Drawer>
  );
}

export default LeftDrawer;
