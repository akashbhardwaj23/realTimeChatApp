import React, { useState } from 'react'

function SendMessage({socket, username, roomId, users}) {
    const [message, setMessage] = useState('');
   


    const sendMessage = () => {
        let senderOrReceiver = 'sender';
       let createTime = Date.now();
       if(!message) return window.alert('Please enter message')
       
       
       socket.emit('sendMessage', {message, username, roomId, createTime})
       setMessage('')
    }


  return (
    <div className={'pt-3 pr-4 pb-4 pl-3'}>

      <input
        className={'p-4 mr-4 w-2/3 rounded-md border-solid border border-[#99d9ea] focus:border-3 outline-[#CA8A04] outline-2 outline-solid placeholder:text-gray-700'}                                                    
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='bg-green-600 p-4 rounded-md shadow-lg text-white text-md uppercase' onClick={sendMessage}>
        Send Message
      </button>

      
    </div>
  )
}

export default SendMessage


