import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useDispatch } from "react-redux";
import { setUserName, setRoomID, setSocket } from "../store/chatSlice.js";
import { useNavigate } from "react-router-dom";

function RoomJoinPage({socket}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [errored, setErrored] = useState(false);
  const dispatch = useDispatch();
  
  // const showMessage = () => {
  //   socket.on("recieve_message", ({ message }) => {
  //     console.log(message);
  //   });
  // };

  const joinRoom = async() => {
    if(username && roomId){
      dispatch(setUserName({userName: username}));
      dispatch(setRoomID({roomId:roomId}))
    };

    if (username === null || roomId === null){
      setErrored(true)
      alert("Please enter username and roomId");

      setTimeout(() => {
        setErrored(false)
      }, 4000);

      return alert("hi there");
    }

    navigate("/chat");
  };

  return (
    <div className="bg-[#005FFF] flex flex-col justify-center items-center relative top-[20%] w-1/2 left-[25%] p-8 rounded-md shadow-2xl dark:bg-gradient-to-br dark:from-green-400 dark:to-green-200">
      <h1 className="p-4 text-white md:text-5xl font-bold uppercase mb-2 text-4xl dark:text-white">
        Rooms
      </h1>

      <Input
        type={"text"}
        name={"username"}
        className={
          "p-4 pb-2 lg:w-1/2 w-full bg-[#005FFF] text-lg font-semibold border-b outline-none border-gray-100 active::border-[#D9D9D9]  placeholder:text-white placeholder:text-lg placeholder:font-semibold dark:focus:outline-white dark:placeholder-white"
        }
        placeholder={"UserName"}
        setUsername={setUsername}
      />

      <Input
        type={"text"}
        name={"roomId"}
        className={
          "p-4 pb-2 lg:w-1/2 w-full bg-[#005FFF] text-lg font-semibold border-b border-gray-100 active:border-[#D9D9D9] outline-none placeholder:text-white placeholder:text-lg placeholder:font-semibold dark:focus:outline-white dark:placeholder-white"
        }
        placeholder={"RoomId"}
        setRoomId={setRoomId}
      />

      <Button text="Join Room" onClick={joinRoom} error={errored} />

      {/* <Button text="see Message" onClick={showMessage} /> */}
    </div>
  );
}

export default RoomJoinPage;
