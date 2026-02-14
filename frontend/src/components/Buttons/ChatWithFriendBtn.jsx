import React from "react";
import { RiUserAddFill } from "react-icons/ri";
import { IoIosChatboxes } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const AddFriendBtn = ({friendId}) => {
  const navigate = useNavigate();

  const chat_handler = ()=>{
    console.log("Chat Handler Success!");
    navigate(`/friends/chat/${friendId}`, {
      state: {friendId: friendId}
    });

  }


  return (
    <button onClick={chat_handler} className="active:scale-95 cursor-pointer w-full py-2 text-[1.2em] bg-[#a7eaca69] flex items-center justify-center gap-3  rounded-2xl font-semibold text-[#286199]">
      <IoIosChatboxes/> Chat
    </button>
  );
};

export default AddFriendBtn;
