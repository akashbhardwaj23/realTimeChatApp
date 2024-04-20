import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RoomUsers({ socket, username, roomId, setUsers }) {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatUsers", (data) => {
      console.log(data);
      setRoomUsers(data);
      setUsers(data);
      console.log("saving user to local storage");
      localStorage.setItem("users", JSON.stringify(data));
    });

    return () => socket.off("chatUsers");
  }, [socket]);

  const leaveRoom = () => {
    const createTime = Date.now();
    socket.emit("leave_room", { username, roomId, createTime });
    localStorage.removeItem("message");
    localStorage.removeItem("username");
    localStorage.removeItem("roomId");
    navigate("/");
  };

  return (
    <div
      className={
        "md:block hidden border-r border-solid border-[#171A1C] min-h-screen h-full shadow-xl bg-[#F1F2F3] px-4 dark:bg-[#000000]"
      }
    >
      <div className="flex items-center mt-8">
        <h1 className="text-[3rem] uppercase text-black font-semibold dark:text-white">
          ROOM -{" "}
        </h1>
        <h2
          className={
            "ml-2 uppercase text-[2rem] text-purple-800 text-center dark:text-[#009EFF]"
          }
        >
          {roomId}
        </h2>
      </div>
      <div className="w-11/12">
        {roomUsers.length > 0 && (
          <h5
            className={
              "text-xl mt-6 text-[#009EFF] font-semibold mb-1 uppercase"
            }
          >
            Users : - 
          </h5>
        )}
        <ul className={"list-none mb-[60px] text-[#171717]"}>
          {roomUsers.map((user) => (
            <li
              className="mb-3"
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              <div className="flex justify-evenly">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 dark:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <div className="ml-2 dark:text-white">{user.username}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="bg-transparent border-2 border-[#000] p-4 rounded-md shadow-2xl font-semibold text-[#000] uppercase text-md dark:border-white dark:text-white"
        onClick={leaveRoom}
      >
        Leave
      </button>
    </div>
  );
}

export default RoomUsers;
