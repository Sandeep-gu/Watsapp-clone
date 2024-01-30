import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { iconPDF } from "../../../constant.jsx";
import GetAppIcon from "@mui/icons-material/GetApp";
import { formatDate, downloadMedia } from "../../../CommonUtils";
import { useContext, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;
const Wrapper = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;
const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`;
function Messages({ item }) {
  const { account } = useContext(AccountContext);

  return account.sub === item.senderId ? (
    <Own>
      {item.type === "text" ? (
        <>
          <Text>{item.text}</Text>
          <Time>{formatDate(item.createdAt)}</Time>
        </>
      ) : (
        <Box style={{ position: "relative" }}>
          {item.type === "pdf" ? (
            <>
              <img
                src={iconPDF}
                alt="pdf"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: 300,
                }}
              />
              <Typography
                style={{
                  fontSize: 14,
                  position: "absolute",
                  bottom: 8,
                  right: 80,
                  fontWeight: 400,
                  fontFamily: "Helvetica",
                }}
              >
                {item.text.split("/").pop()}
              </Typography>
            </>
          ) : (
            <>
              <img
                src={item.text}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: 300,
                }}
                alt="image"
              />
            </>
          )}
          <Time style={{ position: "absolute", bottom: 5, right: 20 }}>
            <GetAppIcon
              onClick={(e) => downloadMedia(e, item.text)}
              style={{
                marginRight: 10,
                border: "1px solid black",
                borderRadius: "50%",
                color: "black",
              }}
              fontSize="small"
            />
            {formatDate(item.createdAt)}
          </Time>
        </Box>
      )}
    </Own>
  ) : (
    <Wrapper>
      {item.type === "text" ? (
        <>
          <Text>{item.text}</Text>
          <Time>{formatDate(item.createdAt)}</Time>
        </>
      ) : (
        <Box style={{ position: "relative" }}>
          {item.type === "pdf" ? (
            <>
              <img
                src={iconPDF}
                alt="pdf"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: 300,
                }}
              />
              <Typography
                style={{
                  fontSize: 14,
                  position: "absolute",
                  bottom: 8,
                  right: 80,
                  fontWeight: 400,
                  fontFamily: "Helvetica",
                }}
              >
                {item.text.split("/").pop()}
              </Typography>
            </>
          ) : (
            <>
              <img
                src={item.text}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: 300,
                }}
                alt="image"
              />
            </>
          )}
          <Time style={{ position: "absolute", bottom: 5, right: 20 }}>
            <GetAppIcon
              onClick={(e) => downloadMedia(e, item.text)}
              style={{
                marginRight: 10,
                border: "1px solid black",
                borderRadius: "50%",
                color: "black",
              }}
              fontSize="small"
            />
            {formatDate(item.createdAt)}
          </Time>
        </Box>
      )}
    </Wrapper>
  );
}

export default Messages;
