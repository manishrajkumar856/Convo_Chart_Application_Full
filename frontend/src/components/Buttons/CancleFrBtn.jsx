import React from 'react'
import { RiUserAddFill } from "react-icons/ri";


const CancleFrBtn = ({sendFriendRequest}) => {
  return (
    <button onClick={sendFriendRequest} className="active:scale-95 cursor-pointer w-full py-2 text-[1.2em] bg-[#9999991a] flex items-center justify-center gap-3  rounded-2xl font-semibold text-[#f04c36]">
           Cancle request
        </button>
  )
}

export default CancleFrBtn