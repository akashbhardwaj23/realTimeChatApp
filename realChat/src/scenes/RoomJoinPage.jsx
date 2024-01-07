import React, { useEffect, useState } from 'react'
import Input from '../Components/Input'
import Button from '../Components/Button'

import {useNavigate} from 'react-router-dom'




function RoomJoinPage({socket, username, setUsername, roomId, setRoomId}) {
  

   const navigate = useNavigate()

   


    const showMessage = () => {
        socket.on('recieve_message', ({message}) => {
            console.log(message)
        })
    }



    const joinRoom = () => {
        console.log({username, roomId})

        if(username === null || roomId === null) return alert('Please enter username and roomId');
        socket.emit('join_room', {username, roomId})    

        navigate('/chat')
    }
   

  return (
    <div className='bg-[#FBBF24] flex flex-col justify-center items-center relative top-[20%] w-1/2 left-[25%] p-8 rounded-md shadow-lg' >
        <h1 className='p-4 text-[#0369A1] text-3xl font-bold uppercase mb-2'>Rooms</h1>

        <Input type={'text'} name={"username"} className={'p-4 w-1/2 rounded-md border-2 border-blue-300 focus:outline focus:outline-2 focus:outline-blue-500 placeholder:text-slate-300 placeholder:text-xl placeholder:font-medium '} placeholder={'UserName'} setUsername={setUsername}  />

        <Input type={'text'} name={"roomId"} className={'p-4 w-1/2 rounded-md border-2 border-blue-300 focus:outline focus:outline-2 focus:outline-blue-500 placeholder:text-slate-300 placeholder:text-xl placeholder:font-medium '} placeholder={'RoomId'} setRoomId={setRoomId} />

        <Button text= "Join Room" onClick= {joinRoom} />

        <Button text="see Message" onClick={showMessage} />
    </div>
  )
}

export default RoomJoinPage