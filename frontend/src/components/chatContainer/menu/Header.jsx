import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { RiCommunityFill } from "react-icons/ri";
import { GrStatusGood } from "react-icons/gr";
import { SiStatuspal } from "react-icons/si";
import { RiChatNewFill } from "react-icons/ri";

import HeaderMenu from "./HeaderMenu";
import LeftDrawer from "../drawer/LeftDrawer";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const HeaderComponent = styled(Box)`
    height: 60px;
    background-color: #1f1f1f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #ffffff;
  `;

  const ImgComponent = styled(Box)`
    height: 80%;
    width: 15%;
    cursor: pointer;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  `;

  const RightComponent = styled(Box)`
    display: flex;
    margin-left: 20px;
    align-items: center;

    svg {
      font-size: 24px;
      margin: 0 10px;
      cursor: pointer;
      transition: color 0.3s;
    }

    svg:hover {
      color: #00bfa5;
    }
  `;
  const handleDrawer = (e) => {
    setDrawer(!drawer);
    setOpen(true);
  };
  return (
    <HeaderComponent>
      <ImgComponent onClick={(e) => handleDrawer(e)}>
        <img
          src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
          alt="..."
        />
      </ImgComponent>
      {drawer ? <LeftDrawer open={open} setOpen={setOpen} /> : ""}

      <RightComponent>
        <RiCommunityFill />
        <GrStatusGood />
        <SiStatuspal />
        <RiChatNewFill />
        <HeaderMenu />
      </RightComponent>
    </HeaderComponent>
  );
}
