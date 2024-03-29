import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setRoomID } from "../store/chatSlice.js";
import { useNavigate } from "react-router-dom";

function RoomJoinPage({ socket }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const dispatch = useDispatch();

  const showMessage = () => {
    socket.on("recieve_message", ({ message }) => {
      console.log(message);
    });
  };

  const joinRoom = () => {
    console.log("Here i am reaching")
    if (username && roomId) {
      console.log("Inside username and password")
      dispatch(setUserName({ userName: username }));
      dispatch(setRoomID({ roomId: roomId }));
    }

    if (username === null || roomId === null)
      return alert("Please enter username and roomId");
    // localStorage.setItem("username", JSON.stringify(username));
    // localStorage.setItem("roomId", JSON.stringify(roomId));
    socket.emit("join_room", { username, roomId });
    navigate("/chat");
  };

  return (
    <div className="w-full min-h-full h-screen  bg-gradient-to-r from-[#06B6D4] to-[#A5F3FC] dark:bg-gradient-to-r dark:from-[#60A5FA] dark:to-[#BFDBFE]">
      <div className="bg-gradient-to-br from-[#F9ED32] to-[#FBB040] flex flex-col justify-center items-center relative top-[20%] w-1/2 left-[25%] p-8 rounded-md shadow-xl dark:bg-gradient-to-br dark:from-green-400 dark:to-green-200">
        <h1 className="p-4 text-[#1D4ED8] md:text-5xl font-bold uppercase mb-2 text-4xl dark:text-white">
          Rooms
        </h1>

        <Input
          type={"text"}
          name={"username"}
          className={
            "p-4 lg:w-1/2 w-full rounded-md border-2 border-blue-300 focus:outline focus:outline-2 focus:outline-blue-500 placeholder:text-slate-300 placeholder:text-xl placeholder:font-medium dark:focus:outline-white dark:placeholder-white"
          }
          placeholder={"UserName"}
          setUsername={setUsername}
        />

        <Input
          type={"text"}
          name={"roomId"}
          className={
            "p-4 lg:w-1/2 w-full rounded-md border-2 border-blue-300 focus:outline focus:outline-2 focus:outline-blue-500 placeholder:text-slate-300 placeholder:text-xl placeholder:font-medium dark:focus:outline-white dark:placeholder-white"
          }
          placeholder={"RoomId"}
          setRoomId={setRoomId}
        />

        <Button text="Join Room" onClick={joinRoom} />

        <Button text="see Message" onClick={showMessage} />
      </div>
    </div>
  );
}

export default RoomJoinPage;
