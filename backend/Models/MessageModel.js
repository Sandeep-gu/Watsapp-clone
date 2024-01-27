const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const message = mongoose.model("message", messageSchema);
module.exports = message;
