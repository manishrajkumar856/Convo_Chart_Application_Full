import React, { useContext } from "react";
import { UserDataContext } from "../../contextApi/DataContaxt";

const ProfileBox = () => {
  const { userData } = useContext(UserDataContext);
  return (
    <div className="w-10 h-10 text-[#ffffff] overflow-hidden font-semibold bg-[#be1d1dbc] rounded-full border border-[#a6a1a1b2] flex items-center justify-center text-2xl">
      { 
        !userData.profilePicInfo &&
        <div>{userData && userData.firstName.split("")[0]}</div>
      }

      {
        userData.profilePicInfo &&
        <img className="w-full h-full object-cover" src={userData.profilePicInfo.profileUrl} alt="" />
      }


    </div>
  );
};

export default ProfileBox;
