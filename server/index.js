import { Server } from "socket.io";
import express from "express"
import {createServer} from "http"

// import leaveRoom from './utils/leaveRoom';


const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});


const PORT = 3000;

let roomName = ''

let users = [];


// const setUser = (userId, userName) => {
//     user.push({userId, userName})
// }



function leaveRoom({id, users}) {
   console.log(users)
    users = users.filter((user) => user.id !== id);
    return users;
}

io.on("connection", (socket) => {
    console.log(`A user is connected ${socket.id} `)
    console.log("Called socket")
    console.log(users)

    socket.on('join_room', (data) => {
        const {username, roomId} = data;
        socket.join(roomId);
        console.log("Called times")
        
        roomName = roomId;

        console.log(`User is Joined ${username} ${roomId
        }`)
       

        let createTime = Date.now()

        console.log('this is time', createTime)

        console.log('This is roomId', roomId)

        socket.to(roomId).emit('receive_message', {
            message : `${username} has Joined`,
            createTime
        })

        socket.emit('receive_message', {
            message: `User has Joined ${username}`,
            createTime: createTime
        })

        console.log(socket.id)
        users.push({id:socket.id, username})

       let chatRoomUser = users.filter((user) => user.roomId === roomId)

        socket.to(roomId).emit("chatUsers", chatRoomUser)
        socket.emit("chatUsers", chatRoomUser)

        console.log(roomName)

    })

    socket.on('sendMessage', (data) => {

        console.log(data)
        const {message, username, roomId, createTime} = data;
        // socket.in(roomId).emit("receive_message", data)
        // Do this afterwards
        io.in(roomId).emit('receive_message', data)
    })

    socket.on('leave_room', (data) => {
        const {username, roomId} = data;

        socket.leave(roomId);
        console.log("adois", username)
        const createTime = Date.now();


        // Doing the removal with username not with userid

        // Remove User From our array also;

        console.log(socket.id)
        users =  leaveRoom({id:socket.id, users});
        socket.to(roomId).emit("chatUsers", users)

        socket.to(roomId).emit('receive_message', {
            message: `${username} has Left`,
            username:username,
            roomId:roomId,
            createTime:createTime
        })

        console.log(`User Has Left ${username}`)

        console.log(users)

    })


   
})


server.listen(PORT, () => {
    console.log(`Listening at Port :- `, PORT)
})