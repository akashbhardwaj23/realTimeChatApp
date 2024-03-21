import React from 'react'

function Input({type, name, className, placeholder, setRoomId, setUsername}) {

  return (
    <div className='mb-4 w-full flex justify-center'>
        <input type={type} name={name} className={className} placeholder={placeholder} onChange={(e) => (
            name === 'username'? setUsername(e.target.value): setRoomId(e.target.value)
    
  )} />
    </div>
  )
}

export default Input