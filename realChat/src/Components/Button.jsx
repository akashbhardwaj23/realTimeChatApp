import React from 'react'

function Button(props) {
  return (
    <div className='mb-4 w-full flex justify-center'>
        <button className='bg-green-600 border-1 border-[#7ee0a2] text-white uppercase font-semibold p-4 rounded-xl w-1/2 shadow-lg' onClick={props.onClick}>
            {props.text}
        </button>
    </div>
  )
}

export default Button