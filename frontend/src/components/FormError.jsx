import React from 'react'
import { ImCross } from "react-icons/im";

const FormError = ({message}) => {
  return (
    <div
    className='px-5 absolute top-5 right-10 py-3 bg-[#eb7979d6] flex items-center gap-2 text-2xl rounded-2xl text-white font-semibold'>
        <ImCross className='text-[#e44f4f]' /> <div className='text-[#e44f4f]'>Error! <span className='text-[#ddd6d6]'>{message}</span></div>
    </div>
  )
}

export default FormError