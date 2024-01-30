const express = require("express");
const router = express.Router();
const {
  addDataController,
  fetchUserController,
} = require("../Controller/UserController.js");
const {
  addMessageController,
  getMessageController,
} = require("../Controller/MessageController.js");
const {
  conversationParticipateController,
  getConversationController,
} = require("../Controller/ConversationParticipateController.js");

const {
  uploadFileController,
} = require("../Controller/uploadFileController.js");

const Upload = require("../Utils/Upload.js");
//add data in the database
router.post("/add_data", addDataController);

//fetch all data from the database
router.get("/fetch_user", fetchUserController);

//add parcipate coversation id
router.post("/add-conversation-participate", conversationParticipateController);

//get conversation
router.post("/get-conversation", getConversationController);

//post message to conversation
router.post("/add-message", addMessageController);

//get all message of given id
router.get("/get-message/:id", getMessageController);

//file upload
router.post("/uploadFile", Upload.single("file"), uploadFileController);
module.exports = router;
