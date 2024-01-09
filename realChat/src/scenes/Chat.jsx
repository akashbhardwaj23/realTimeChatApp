import React from 'react'
import Message from '../Components/Message'
import '../App.css'
import RoomUsers from './RoomUsers'
import SendMessage from './SendMessage'

function Chat({socket, username, roomId, setUsers, users, setThemeMode, themeMode}) {
  return (
    <div className='max-w-full my-0  grid chatContainer'>
      <RoomUsers socket={socket} username={username} roomId={roomId} setUsers={setUsers} />
        <div>
            <Message socket = {socket} setThemeMode={setThemeMode} themeMode={themeMode} />
            <SendMessage socket={socket} username={username} roomId={roomId} users={users} />
        </div>
    </div>
  )
}

export default Chat