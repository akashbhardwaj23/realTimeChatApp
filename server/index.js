import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import leaveRoom from "./utils/leaveRoom.js";

// import leaveRoom from './utils/leaveRoom';

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const PORT = 3000;

let roomName = "";

let users = [];

const userToSocketMapping = new Map();

io.on("connection", (socket) => {
  console.log(`A user is connected ${socket.id} `);

  socket.on("join_room", (data) => {
    const { username, roomId } = data;
    socket.join(roomId);

    const isUserPresent = userToSocketMapping.get(username)

    console.log(userToSocketMapping)
    
    if(isUserPresent){
      return socket.emit("event:user_present", {
        userisPresent : true
      })
    }

    userToSocketMapping.set(username, socket.id)
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
      let { message, username, roomId, createTime, senderOrReceiver } = data;
     
      console.log("Message is sent by ",socket.id, " Username", username)
      
      io.to(socket.id).emit("receive_message", {message, username, roomId, createTime, senderOrReceiver})
      senderOrReceiver = false

      socket.in(roomId).emit("receive_message", {message, username, roomId, createTime, senderOrReceiver})
      // Do this afterwards

      // this is sending message to all the room users
      // io.in(roomId).emit("receive_message", data);
    });

    // Leave Room
    socket.on("leave_room", (data) => {
      const { username, roomId } = data;

      socket.leave(roomId);
      const createTime = Date.now();

      // Doing the removal with username not with userid

      // Remove User From our array also;

      console.log("Removed user ",socket.id);
      users = leaveRoom({ id: socket.id, users });

      userToSocketMapping.delete(username)
      socket.to(roomId).emit("chatUsers", users);

      socket.to(roomId).emit("receive_message", {
        message: `${username} has Left`,
        username: username,
        roomId: roomId,
        createTime: createTime,
      });

      console.log(users)
      console.log(`User Has Left ${username} with socket id ${socket.id}`);

    });
  });

  socket.on("disconnect", () => {
    const user = users.find((user) => user.id === socket.id);

    console.log("user got Disconnected with socket id ", socket.id, " and username ", user?.username);

    if (user?.username) {
      users = leaveRoom({ id: user.id, users });
      socket.to(roomName).emit("chatUsers", users);
      socket.in(roomName).emit("receive_message", {
        message: `User has left ${user.username} with socket id ${socket.id}`,
        createTime: Date.now(),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening at Port :- `, PORT);
});
