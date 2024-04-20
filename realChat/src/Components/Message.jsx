import React, { useEffect, useState } from "react";
import "../App.css";
import { setMessage } from "../store/chatSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../store/chatSlice.js";

function Message({ socket }) {
  const [senderOrReceiver, setSenderOrReceiver] = useState("sender");
  const dispatch = useDispatch();
  const message = useSelector((state) => state.messages);
  console.log(message);

  const themeMode = useSelector((state) => state.mode);

  // const messageColumnRef = useRef(null)

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      dispatch(setMessage(data));
    });

    return () => socket.off("recieve_message");
  }, [socket]);

  const formatTime = (createTime) => {
    let date = new Date(createTime);
    return date.toLocaleTimeString();
  };

  useEffect(() => {
    console.log(!localStorage.getItem("message"));
    if (localStorage.getItem("message")) {
      return;
    }
    const message1 = JSON.parse(localStorage.getItem("message"));
    if (message1 && message1.length > 0) {
      setMessage(message1);
    }
    console.log(message1);
  }, []);

  useEffect(() => {
    console.log("saving to local storage");

    localStorage.setItem("message", JSON.stringify(message));
    console.log(message);
  }, [message]);

  if (!message) return <h1>No message</h1>;

  return (
    <div className={"h-[85vh] overflow-auto py-[10px]  pl-10 pr-[10px] scroll"}>
      {themeMode === "light" ? (
        <div className="flex justify-end pr-6 p-4 mr-4 w-1/4 absolute right-0">
          {console.log(themeMode)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
            onClick={() => dispatch(setMode("dark"))}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        </div>
      ) : (
        <div className="flex justify-end pr-6 p-4 mr-4  w-1/4 absolute right-0">
          {console.log(themeMode)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
            onClick={() => dispatch(setMode("light"))}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </div>
      )}
      {message.map((msg, index) => {
        if (msg.senderOrReceiver) {
          return (
           <div className="w-2/3 flex justify-end h-auto">
               <div
              className={
                "rounded-md mb-6 max-w-[600px] p-3 bg-[#FFFBEB] shadow-lg w-[55%] "
              }
              key={index}
            >
              <div className="flex justify-between">
                <span className={"text-green-600 text-xl"}>{msg.username}</span>
                <span className={"text-[#71717A] text-sm font-medium"}>
                  {formatTime(msg.createTime)}
                </span>
              </div>
              {senderOrReceiver === "receiver" ? (
                <p className={"text-[#44403C] text-md text-wrap w-full"}>{msg.message}</p>
              ) : (
                <p className="text-black text-md text-wrap w-full h-auto">{msg.message}</p>
              )}
              <br />
            </div>
           </div>
          );
        }

        return (
         <div className="w-2/3">
           <div
            className={
              "rounded-md mb-6 max-w-[600px] p-3 bg-green-500 shadow-lg w-[55%] flex flex-col justify-end"
            }
            key={index}
          >
            <div className="flex justify-between">
              <span className={"text-white text-xl"}>{msg.username}</span>
              <span className={"text-[#4a4a4b] text-sm font-medium"}>
                {formatTime(msg.createTime)}
              </span>
            </div>
            {senderOrReceiver === "receiver" ? (
              <p className={"text-[#6c6c70] text-md"}>{msg.message}</p>
            ) : (
              <p className="text-black text-md">{msg.message}</p>
            )}
            <br />
          </div>
         </div>
        );
      })}
    </div>
  );
}

export default Message;
