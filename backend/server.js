const express = require("express");
const cors = require("cors");
const mongodbConnection = require("./Database/Db");
const userRouter = require("./Router/UserRoute.js");
mongodbConnection();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.listen(5000, () => {
  console.log(`Successfully started at Port ${5000}`);
});
