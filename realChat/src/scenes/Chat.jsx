import React from 'react'
import Message from '../Components/Message'
import '../App.css'
import RoomUsers from './RoomUsers'
import SendMessage from './SendMessage'
import { useSelector } from 'react-redux'

function Chat({socket, setUsers, users}) {
  const username = useSelector(state => state.userName)
  const roomId = useSelector(state => state.roomId)
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