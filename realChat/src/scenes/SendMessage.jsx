import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setMessages } from '../store/chatSlice';

function SendMessage({socket, username, roomId}) {
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()

    const sendMessage = () => {
       let createTime = Date.now();
       if(!message) return window.alert('Please enter message')
       const data = {message, username, roomId, createTime , senderOrReceiver : true};

       socket.emit('sendMessage', data);

        dispatch(setMessages(data))

       setMessage('');
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            sendMessage();
        }
    }

  return (
    <div className={'pt-3 pr-4 pb-4 pl-3'}>

      <input
        className={'p-4 mr-4 md:w-2/3 w-1/2 rounded-md border-solid border mb-2 border-[#99d9ea] focus:border-3 outline-[#CA8A04] outline-2 outline-solid placeholder:text-gray-700'}                                                    
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyUp={handleKeyPress}
      />
      <button className='bg-green-600 p-4 rounded-md shadow-lg text-white text-md uppercase' onClick={sendMessage} >
        Send Message
      </button>

      
    </div>
  )
}

export default SendMessage


