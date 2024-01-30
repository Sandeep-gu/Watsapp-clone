const mongoose = require("mongoose");
// const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

// const storage = new GridFsStorage({
//   url: process.env.MONGODB_API_URL,
//   options: { useUnifiedTopology: true, useNewUrlParser: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpeg", "image/jpg"];
//     if (match.indexOf(file.mimeType) === -1) {
//       return `${Date.now()}-file-${file.originalname}`;
//     }

//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-file-${file.originalname}`,
//     };
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploadFile/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

module.exports = multer({ storage: storage });
