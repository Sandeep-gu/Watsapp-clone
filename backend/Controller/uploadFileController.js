const Message = require("../Models/MessageModel");
const url = "http://localhost:5000/uploadFile";
const uploadFileController = async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(404).json("File not found");
  }
  const imageUrl = `${url}/${req.file.filename}`;
  const messageData = JSON.parse(req.body.message);
  const object = {
    senderId: messageData.senderId,
    receiverId: messageData.receiverId,
    conversationId: messageData.conversationId,
    type:
      req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/jpg" ||
      req.file.mimetype === "image/png"
        ? "image"
        : "pdf",
    text: imageUrl,
  };
  const message = new Message(object);
  const result = await message.save();
  console.log("result", result);
  return res.status(200).json({ imageUrl, result });
};

module.exports = { uploadFileController };
