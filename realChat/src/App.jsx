import React, { useState, useEffect } from "react";
import RoomJoinPage from "./scenes/RoomJoinPage";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./scenes/Chat";

import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  if (socket === null) {
    setSocket(io.connect("http://localhost:3000"));
  }

  // const [username, setUsername] = useState(null);
  // const [roomId, setRoomId] = useState(null);
  const username = useSelector(state => state.userName);
  const roomId = useSelector(state => state.roomId)
  const [users, setUsers] = useState([]);
  const themeMode = useSelector(state => state.mode)

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
      });
    }

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  }, []);

  // useEffect(() => {
  //   console.log('useEffect is called in username1 and roomId1')
  //   const username1 = JSON.parse(localStorage.getItem('username'));
  //   const roomId1 = JSON.parse(localStorage.getItem('roomId'));

  //   console.log(socket)

  //   if (!username && !roomId) {
  //     if (username1 && roomId1) {
  //       setRoomId(roomId1);
  //       setUsername(username1)

  //       socket.on('join_room', {
  //         username1,
  //         roomId1
  //       })
  //     }
  //   }
  // }, [])

  // actual change in theme

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <div className="w-full min-h-full h-screen bg-white dark:from-[#60A5FA] dark:to-[#BFDBFE]">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RoomJoinPage
                socket={socket}
              />
            }
          />

          <Route
            path="/chat"
            element={
              !username && !roomId ? (
                <Navigate to={"/"} />
              ) : (
                <Chat
                  socket={socket}
                  setUsers={setUsers}
                  users={users}
                />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
