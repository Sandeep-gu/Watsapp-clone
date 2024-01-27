const User = require("../Models/UserModel.js");

const addDataController = async (req, res) => {
  try {
    console.log(req.body);
    const exist = await User.findOne({ sub: req.body.sub });

    if (exist) {
      return res
        .status(200)
        .send({ success: true, message: "Data already exists" });
    }

    const result = await User.create(req.body);
    console.log(result);
    if (result) {
      return res
        .status(200)
        .send({ success: true, message: "Successfully added" });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Failed to add user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Internal Error" });
  }
};

const fetchUserController = async (req, res) => {
  try {
    const user = await User.find({});
    if (user) {
      res
        .status(200)
        .send({ success: true, message: "Successfully Found", user });
    } else {
      res.status(404).send({ success: false, message: "data not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
module.exports = { addDataController, fetchUserController };
