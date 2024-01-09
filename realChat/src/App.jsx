import React, { useState, useEffect } from "react";
import RoomJoinPage from "./scenes/RoomJoinPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./scenes/Chat";

import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  if (socket === null) {
    setSocket(io.connect("http://localhost:3000"));
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
  }, []);

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
              <Chat
                socket={socket}
                username={username}
                roomId={roomId}
                setUsers={setUsers}
                users={users}
                setThemeMode={setThemeMode}
                themeMode={themeMode}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
