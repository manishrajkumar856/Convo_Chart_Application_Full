import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import AddFriendBtn from "../Buttons/AddFriendBtn";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import CancleFrBtn from "../Buttons/CancleFrBtn";

const FriendCard = ({ cardData, imgData }) => {
  const { userData, fetchUserData } = useContext(UserDataContext);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const sendFriendRequest = async (event) => {
    event.stopPropagation(); // Prevetn from firing parent
    
    const requestData = {
      senderId: userData._id,
      receiverId: cardData._id,
      status: "pending",
    };

    try {
      const response = await axios.post(
        "https://convo-chart-application-full.onrender.com/api/sendFriendRequest",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

     
      fetchUserData();
      
    } catch (error) {
     
    }
  };


   const CancleFriendRequest = async (event) => {
    event.stopPropagation(); // Prevetn from firing parent
    const requestData = {
      UserId: userData._id,
      CardUserId: cardData._id,
      status: "pending",
    };

    try {
      const response = await axios.post(
        "https://convo-chart-application-full.onrender.com/api/cancle_request/",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

     
      fetchUserData();
      
    } catch (error) {
     
    }
  };


  const handleClickCard = (event)=>{
    navigate(`/details/${cardData._id}`, {
      state: {cardData: cardData}
    });
  }

  return (
    <div onClick={handleClickCard} className="w-[15em] shadow-sm shadow-[#252525] mb-3 cursor-pointer overflow-hidden bg-[#ffff] flex flex-col items-center justify-center rounded-3xl border border-[#9391918d]">
      <div className="w-full">
        {!imgData && (
          <div className="w-full h-50 bg-[#d2d2d2] text-[10em] text-[#707070]  flex items-end justify-center">
            {cardData.profilePicInfo ? <img className="w-full h-full object-cover" src={cardData.profilePicInfo.profileUrl} alt="" /> : <FaUser />}
          </div>
        )}
      </div>
      <div className="text-[1.3em] mt-3 mb-10 font-semibold text-[#484848]">
        {cardData.firstName + " " + cardData.serName}
      </div>
      <div className="w-full mb-5 px-5">
        {
          userData && !userData.requests.includes(cardData._id) && 
          <AddFriendBtn sendFriendRequest={sendFriendRequest} />
        }

        {
          userData && userData.requests.includes(cardData._id) && 
          <CancleFrBtn sendFriendRequest={CancleFriendRequest} />
        }
      </div>
    </div>
  );
};

export default FriendCard;
