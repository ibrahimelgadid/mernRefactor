exports.connectToSocket = function (server) {
  //---------------------------------------------|
  //              Display socket                 |
  //---------------------------------------------|
  global.io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  ////////// Open Socket Connection
  io.on("connection", (socket) => {
    console.log("socket connected");

    socket.on("getNotifications", () => {
      socket.broadcast.emit("new notifications");
    });
  });
  /////////////////////////////////////////
};
