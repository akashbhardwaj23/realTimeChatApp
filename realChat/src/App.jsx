import React, {useState, useEffect} from 'react'
import RoomJoinPage from './scenes/RoomJoinPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './scenes/Chat'

import { io } from 'socket.io-client'

function App() {

  const socket = io('http://localhost:3000')

  const [username, setUsername] = useState(null)
   const [roomId, setRoomId] = useState(null)
   const [users, setUsers] = useState([])

  
   useEffect(() => {
        
    socket.on('connect', () => {
        console.log('connected')
    })


},[])




  return (
    <div className='w-full min-h-full h-screen bg-gradient-to-r from-[#06B6D4] to-[#A5F3FC]'>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<RoomJoinPage socket={socket} username={username} setUsername={setUsername} roomId={roomId} setRoomId={setRoomId} />}/>

          <Route path='/chat' element={<Chat socket={socket} username={username} roomId={roomId} setUsers={setUsers} users={users} />}/>
        </Routes>
      </BrowserRouter>


      
    </div>
  )
}

export default App