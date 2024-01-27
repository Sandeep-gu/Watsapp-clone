const Conversation = require("../Models/ConversationModel");

const conversationParticipateController = async (req, res) => {
  try {
    const exists = await Conversation.findOne({
      member: { $all: [req.body.SenderId, req.body.ReceiverId] },
    });

    if (exists) {
      return res.status(200).send({ message: "Conversation already exists" });
    }

    const conversation = new Conversation({
      member: [req.body.SenderId, req.body.ReceiverId],
    });

    const result = await conversation.save();
    // console.log(conversation);
    if (result) {
      res.status(200).send({ message: "Conversation stored successfully" });
    } else {
      res.status(500).send({ message: "Failed to save conversation" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get conversation information from the id
const getConversationController = async (req, res) => {
  try {
    // console.log("req.body.SenderId", req.body.SenderId);
    // console.log("req.body.ReceiverId", req.body.ReceiverId);
    // console.log(req.body);
    const conversation = await Conversation.findOne({
      member: { $all: [req.body.SenderId, req.body.ReceiverId] },
    });
    // console.log(conversation);
    if (conversation) {
      res
        .status(200)
        .send({ message: "conversation find properly", conversation });
    } else {
      res
        .status(404)
        .send({ message: "Something went wrong for finding data" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = {
  conversationParticipateController,
  getConversationController,
};
