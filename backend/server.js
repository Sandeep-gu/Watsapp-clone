const express = require("express");
const cors = require("cors");
const mongodbConnection = require("./Database/Db");
const path = require("path");
const userRouter = require("./Router/UserRoute.js");
global.__basedir = __dirname;
mongodbConnection();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploadFile", express.static(path.join(__dirname, "uploadFile")));
app.use("/api/uploads", file);
app.use("/", userRouter);
app.listen(5000, () => {
  console.log(`Successfully started at Port ${5000}`);
});
