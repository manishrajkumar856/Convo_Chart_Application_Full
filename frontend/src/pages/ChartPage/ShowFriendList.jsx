import React, { useContext } from "react";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import AcFriendCard from "../../components/Cards/AcFriendCard";
import NothingHere from "../../components/NothingHere";

const ShowFriendList = () => {
  const { userData, getDataUsingId } = useContext(UserDataContext);
  const token = localStorage.getItem("accessToken");

  if(userData && userData.friendList.length == 0 ){
    return(
      <div className="w-full rounded-2xl text-[#797979] px-10 py-5 bg-[#ffff]">
        <NothingHere />
      </div>
    )
  }
            
  return (
    <div className="w-full">
      <div className="relative   z-10 w-full bg-white  px-2 py-8 rounded-2xl">
        <h2 className="w-full text-xl md:text-2xl font-semibold mb-3 text-center text-[#4a4a4a]">
          Connect with your Friends
        </h2>

        <div className="w-full flex justify-center items-center gap-3 flex-wrap">
          {userData && userData.friendList.map((id, idx) => {
              return (
                <div key={idx}>
                  <AcFriendCard id={id} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ShowFriendList;
