const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

const mongodbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_API_URL);
    console.log(
      `Connected to MONGODB database :${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error connecting to Mnogodb${error}`.bgRed.white);
  }
};

module.exports = mongodbConnection;
