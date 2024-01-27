const Message = require("../Models/MessageModel");
const Conversation = require("../Models/ConversationModel");
const addMessageController = async (req, res) => {
  try {
    // console.log("mesaage", req.body);
    const message = new Message(req.body);
    const result = await message.save();

    const resultcon = await Conversation.findByIdAndUpdate(
      req.body.conversation, // Assuming req.body.conversation contains the _id of the document
      {
        $set: {
          message: req.body.text,
        },
      },
      { new: true } // This option ensures you get the updated document as a result
    );

    // console.log(result);
    res.status(200).send({ message: "successfully added message" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getMessageController = async (req, res) => {
  try {
    console.log(req.params.id);
    const message = await Message.find({ conversationId: req.params.id });
    if (message) {
      res.status(200).send({ message: "successfully found", message });
    } else {
      res.status(500).send({ message: "not found data" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addMessageController, getMessageController };
