const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    member: {
      type: Array,
    },
    conversation: {
      type: String,
    },
  },
  { timestamps: true }
);

const conversation = mongoose.model("coversationId", conversationSchema);
module.exports = conversation;
