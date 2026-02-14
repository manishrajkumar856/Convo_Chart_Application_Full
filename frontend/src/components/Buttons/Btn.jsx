import React from 'react'

export const Btn = ({text, color, bgColor, btn_Handler}) => {

  return (
    <button onClick={btn_Handler} className='active:scale-95 px-5 py-1 text-[0.8em] md:text-[1.2em] rounded-xl font-medium text-[#ffff]' style={{backgroundColor: bgColor, color: color}}>{text}</button>
  )
}
