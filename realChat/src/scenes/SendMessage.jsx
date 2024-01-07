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




// .chatContainer {
//     max-width: 1100px;
//     margin: 0 auto;
//     display: grid;
//     grid-template-columns: 1fr 4fr;
//     gap: 20px;
//   }
  
//   /* Room and users component */
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
  
//   /* Messages */
//   .messagesColumn {
//     height: 85vh;
//     overflow: auto;
//     padding: 10px 10px 10px 40px;
//   }
//   .message {
//     background: rgb(0, 24, 111);
//     border-radius: 6px;
//     margin-bottom: 24px;
//     max-width: 600px;
//     padding: 12px;
//   }
//   .msgMeta {
//     color: rgb(153, 217, 234);
//     font-size: 0.75rem;
//   }
//   .msgText {
//     color: #fff;
//   }
  
//   /* Message input and button */
//   .sendMessageContainer {
//     padding: 16px 20px 20px 16px;
//   }
//   .messageInput {
//     padding: 14px;
//     margin-right: 16px;
//     width: 60%;
//     border-radius: 6px;
//     border: 1px solid rgb(153, 217, 234);
//     font-size: 0.9rem;
//   }