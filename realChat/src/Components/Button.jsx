import React from 'react'

function Button(props) {
  return (
    <div className='mb-4 w-full flex justify-center'>
        <button className={`border-1 border-[#7ee0a2] ${props.error ? "bg-[#FF002B]" : "bg-white"} dark:bg-blue-500  text-black uppercase font-bold p-4 rounded-md lg:w-1/2 w-full shadow-lg`} onClick={props.onClick}>
            {props.text}
        </button>
    </div>
  )
}

export default Button