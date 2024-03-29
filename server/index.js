import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import dotenv from "dotenv"
import leaveRoom from "./utils/leaveRoom.js";

// import leaveRoom from './utils/leaveRoom';

const app = express();

const server = createServer(app);

dotenv.config();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const PORT = 3000;

let roomName = "";

let users = [];


// app.use("/", AnyRoute);



io.on("connection", (socket) => {
  console.log(`A user is connected ${socket.id} `);

  socket.on("join_room", (data) => {
    const { username, roomId } = data;
    socket.join(roomId);

    roomName = roomId;

    console.log(`User is Joined ${username} ${roomId}`);

    let createTime = Date.now();

    socket.to(roomId).emit("receive_message", {
      message: `${username} has Joined`,
      createTime,
    });

    socket.emit("receive_message", {
      message: `User has Joined ${username}`,
      createTime: createTime,
    });

    users.push({ id: socket.id, roomId, username });

    let chatRoomUser = users.filter((user) => user.roomId === roomId);

    socket.to(roomId).emit("chatUsers", chatRoomUser);
    socket.emit("chatUsers", chatRoomUser);

    // Receiving message from Frontend

    socket.on("sendMessage", (data) => {
      console.log(data);
      const { message, username, roomId, createTime } = data;
      // socket.in(roomId).emit("receive_message", data)
      // socket.to(socket.id).emit("receive_message", data)
      // Do this afterwards
      io.in(roomId).emit("receive_message", data);
    });

    // Leave Room
    socket.on("leave_room", (data) => {
      const { username, roomId } = data;

      socket.leave(roomId);
      const createTime = Date.now();

      // Doing the removal with username not with userid

      // Remove User From our array also;

      console.log(socket.id);
      users = leaveRoom({ id: socket.id, users });
      socket.to(roomId).emit("chatUsers", users);

      socket.to(roomId).emit("receive_message", {
        message: `${username} has Left`,
        username: username,
        roomId: roomId,
        createTime: createTime,
      });

      console.log(`User Has Left ${username}`);

    });
  });

  socket.on("disconnect", () => {
    console.log("user got Disconnected", socket.id);

    const user = users.find((user) => user.id === socket.id);

    if (user?.username) {
      users = leaveRoom({ id: user.id, users });
      socket.to(roomName).emit("chatUsers", users);
      socket.in(roomName).emit("receive_message", {
        message: `User has left ${user.username}`,
        createTime: Date.now(),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening at Port :- `, PORT);
});
