import { useEffect, useState } from 'react'
import Message from '../Components/Message'
import '../App.css'
import RoomUsers from './RoomUsers'
import SendMessage from './SendMessage'
import { useSelector } from 'react-redux'

function Chat({socket, setUsers, users}) {
  const username = useSelector(state => state.userName)
  const roomId = useSelector(state => state.roomId);
  const [userPresent, setUserPresent] = useState(false);  

  useEffect(() => {
    socket.emit("join_room", { username, roomId });
    console.log("Joining Room In Chat Page");


    socket.on("event:user_present", (data) => {
      if(data.userisPresent){
        setUserPresent(true);
      }
    });

    return () =>  socket.removeAllListeners("event:user_present");
  }, []);

  if(userPresent){
    return <h1 className='flex justify-center items-center text-2xl font-semibold pt-4'>User is already present</h1>
  }
 
  return (
    <div className='max-w-full my-0 grid chatContainer'>
      <RoomUsers socket={socket} username={username} roomId={roomId} setUsers={setUsers} />
        <div>
            <Message socket = {socket}  />
            <SendMessage socket={socket} username={username} roomId={roomId} users={users} />
        </div>
    </div>
  )
}

export default Chat