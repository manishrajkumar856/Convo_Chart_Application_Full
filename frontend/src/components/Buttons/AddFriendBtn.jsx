import React from "react";
import { RiUserAddFill } from "react-icons/ri";


const AddFriendBtn = ({sendFriendRequest}) => {
  return (
    <button onClick={sendFriendRequest} className="active:scale-95 cursor-pointer w-full py-2 text-[1.2em] bg-[#a7c4ea69] flex items-center justify-center gap-3  rounded-2xl font-semibold text-[#286199]">
      <RiUserAddFill /> Add Friend
    </button>
  );
};

export default AddFriendBtn;
