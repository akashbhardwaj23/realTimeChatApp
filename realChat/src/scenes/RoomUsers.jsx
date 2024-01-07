import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RoomUsers({socket, username, roomId, setUsers}) {


    const [roomUsers, setRoomUsers] = useState([])

    const navigate = useNavigate();

    useEffect(() => {

        socket.on('chatUsers', (data) => {
            console.log(data)
            setRoomUsers(data)
            setUsers(data);
        })


        return () => socket.off('chatUsers')

    },[socket])



    const leaveRoom = () => {
        const createTime = Date.now()
        socket.emit('leave_room', {username, roomId, createTime})
        navigate('/')
    }



  return (
    <div className={'border-r-2 border-solid border-[#dfdfdf] min-h-screen h-full bg-[#06B6D4] px-4 '}>
        <h1 className='mb-1 text-[3rem] uppercase text-white font-semibold'>ROOM</h1>
      <h2 className={'mb-[60px] uppercase text-[2rem] text-purple-800 text-center'}>{roomId}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className={'text-xl text-white'}>Users:</h5>}
        <ul className={'list-none pl-0 mb-[60px] text-[#000000]'}>
          {roomUsers.map((user) => (
            <li
            className='mb-3'
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>


      <button className='bg-transparent border-2 border-[#000] p-4 rounded-md shadow-2xl font-semibold text-[#000] uppercase text-md' onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};


export default RoomUsers


 /* Room and users component */
//   .roomAndUsersColumn {
//     border-right: 1px solid #dfdfdf;
//   }
//   .roomTitle {
//     margin-bottom: 60px;
//     text-transform: uppercase;
//     font-size: 2rem;
//     color: #fff;
//   }
//   .usersTitle {
//     font-size: 1.2rem;
//     color: #fff;
//   }
//   .usersList {
//     list-style-type: none;
//     padding-left: 0;
//     margin-bottom: 60px;
//     color: rgb(153, 217, 234);
//   }
//   .usersList li {
//     margin-bottom: 12px;
//   }