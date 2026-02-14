import React, { useContext, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import axios from "axios";

const ProfileCoverBtn = () => {

  const profileCoverPicRef = useRef();
  const {userData,  fetchUserData} = useContext(UserDataContext);
  const token = localStorage.getItem("accessToken");


  // Handle Data
  const handleProfileCoverPicChange = async (event) => {
    const file = event.target.files[0];

    // Sending file data to the server
    try {
      const fd = new FormData();
      fd.append("profileCoverPicData", file);
      fd.append("userId", userData._id);

      const response = await axios.patch('https://convo-chart-application-full.onrender.com/api/profile/changeProfileCoverPic',
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response);

      fetchUserData();

    } catch (error) {
      console.log("Error: ",error);
    }
  };


  const handleProfileCoverEvent = (event) => {
    profileCoverPicRef.current.click();
  };

  return (
    <button
      onClick={handleProfileCoverEvent}
      className="absolute cursor-pointer bottom-4 right-5 md:bottom-8 md:right-10 font-semibold bg-[#e2dcdc] px-5 py-2 outline-none rounded-xl flex gap-2 items-center"
    >
      <input style={{ display: "none" }} onChange={handleProfileCoverPicChange} type="file" ref={profileCoverPicRef} accept="image/*" />
      <FaCamera /> Edit cover photo
    </button>
  );
};

export default ProfileCoverBtn;
