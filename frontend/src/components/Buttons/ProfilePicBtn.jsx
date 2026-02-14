import React, { useContext, useRef } from 'react'
import { FaCamera } from "react-icons/fa";
import { UserDataContext } from '../../../contextApi/DataContaxt';
import axios from 'axios';

const ProfilePicBtn = () => {
    const profilePicRef = useRef();
    const {userData, fetchUserData} = useContext(UserDataContext);
    const token = localStorage.getItem('accessToken');

    const handleProfilePicEvent = (event)=>{
        profilePicRef.current.click();
    }

    const handleProfilePicChange = async (event)=>{
        const file = event.target.files[0];
        

        // Sending File Data to server
        try {
            const fd = new FormData();

            fd.append('profilePicData', event.target.files[0]);
            fd.append('userId', userData._id);

            const response = await axios.patch('http://localhost:9000/api/profile/changeProfilePic',
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
            console.log("Error:",error);
        }
    }

  return (
    <div>
        <input style={{display: 'none'}} onChange={handleProfilePicChange} type="file" ref={profilePicRef} accept="image/*"/>
        <button onClick={handleProfilePicEvent} className='w-10 cursor-pointer h-10 absolute bottom-8 right-0 font-semibold rounded-full bg-[#d6d5d5] outline-none flex justify-center gap-2 items-center text-[1.2em]' ><FaCamera/></button>
    </div>
  )
}

export default ProfilePicBtn