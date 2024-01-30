const { Server } = require("socket.io");
const io = new Server(9000, {
  cors: {
    origin: " http://localhost:5173",
  },
});
let users = [];
const addUser = (userData, socketId) => {
  //   console.log("socketId", socketId);
  //   console.log("userData", userData);
  !users.some((user) => user.sub == userData.sub) &&
    users.push({ ...userData, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.sub === userId);
};
io.on("connection", (socket) => {
  console.log("user Connected");
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (data) => {
    // console.log(data);
    const user = getUser(data.receiverId);
    console.log(user);
    io.to(user.socketId).emit("getMessage", data);
  });
});
