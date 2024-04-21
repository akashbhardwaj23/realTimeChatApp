import React, { useState, useEffect } from "react";
import RoomJoinPage from "./scenes/RoomJoinPage";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./scenes/Chat";
import { useSocket } from "./hooks";


function App() {
  const username = useSelector(state => state.userName);
  const roomId = useSelector(state => state.roomId)
  const [users, setUsers] = useState([]);
  const themeMode = useSelector(state => state.mode);

  const {socket} = useSocket();


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
                socket = {socket}
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
