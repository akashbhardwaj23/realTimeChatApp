import React, { useState, useEffect } from "react";
import RoomJoinPage from "./scenes/RoomJoinPage";
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
    setSocket(io.connect("http://URL:3000"));
  }

  const [username, setUsername] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [users, setUsers] = useState([]);
  const [themeMode, setThemeMode] = useState("light");

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

  useEffect(() => {

    console.log('useEffect is called in username1 and roomId1')
    const username1 = JSON.parse(localStorage.getItem('username'));
    const roomId1 = JSON.parse(localStorage.getItem('roomId'));

    console.log(socket)

    if (!username && !roomId) {
      if (username1 && roomId1) {
        setRoomId(roomId1);
        setUsername(username1)

        socket.on('join_room', {
          username1,
          roomId1
        })
      }
    }
  }, [])

  // actual change in theme

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <div className="w-full min-h-full h-screen bg-gradient-to-r from-[#06B6D4] to-[#A5F3FC]">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RoomJoinPage
                socket={socket}
                username={username}
                setUsername={setUsername}
                roomId={roomId}
                setRoomId={setRoomId}
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
                  username={username}
                  roomId={roomId}
                  setUsers={setUsers}
                  users={users}
                  setThemeMode={setThemeMode}
                  themeMode={themeMode}
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
