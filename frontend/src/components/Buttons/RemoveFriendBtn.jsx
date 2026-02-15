import axios from "axios";
import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { UserDataContext } from "../../../contextApi/DataContaxt";


const AddFriendBtn = ({friendId}) => {

  const token = localStorage.getItem('accessToken');
  const {userData, fetchUserData} = useContext(UserDataContext);

  const handleRemoveFriend = async ()=>{
    

    try {
      const response = await axios.delete(`https://convo-chart-application-full.onrender.com/api/friend/removeFriend/${friendId}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          },
          data: {
            userId: userData._id,
          }
        }
      );

     
      fetchUserData();


    } catch (error) {
      
    }
  }

  return (
    <button onClick={handleRemoveFriend} className="active:scale-95 cursor-pointer w-full py-2 text-[1.2em] bg-[#eab1a769] flex items-center justify-center gap-3  rounded-2xl font-semibold text-[#286199]">
      <MdDelete /> Remove
    </button>
  );
};

export default AddFriendBtn;
