import React, { useContext, useEffect, useState } from "react";
import { Btn } from "../Buttons/Btn";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { UserDataContext } from "../../../contextApi/DataContaxt";

const NotificationMessageCard1 = ({ data }) => {
  const token = localStorage.getItem("accessToken");
  const [getNotUserData, setNotUserData] = useState(null);
  const { userData, fetchUserData } = useContext(UserDataContext);

  async function getDataUsingId(id) {
    try {
      const response = await axios.get(
        `https://convo-chart-application-full.onrender.com/api/getUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNotUserData(response.data.data);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  const reject_handler = async (event) => {
    try {
      const response = await axios.post(
        `https://convo-chart-application-full.onrender.com/api/reject_request/${data.senderId}`,
        {
          userId: userData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };


  const accept_handler = async (event) => {
    console.log(data.senderId);
    try {
      const response = await axios.post(
        `https://convo-chart-application-full.onrender.com/api/accept_request/${userData._id}`,
        {
          receiverId: data.receiverId,
          senderId: data.senderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUsingId(data.senderId);
  }, []);

  return (
    <div className="w-full px-2 md:px-5 py-2 md:py-3 bg-[#ffff] rounded-2xl flex gap-3 md:gap-10">
      <div className="w-20 h-25 bg-[#d2d2d2] rounded-xl text-[5em] text-[#707070]  flex items-end justify-center">
        <FaUser />
      </div>

      <div className="w-full flex flex-col justify-between">
        <div>
          <h2 className="text-[0.7em] md:text-[1em] font-semibold">
            A friend request has bees sent by this accoutnt{" "}
          </h2>
          <h2 className="text-[0.9em] md:text-[1.5em] font-semibold">
            {getNotUserData &&
              getNotUserData.firstName + " " + getNotUserData.serName}
          </h2>
        </div>
        <div className="w-full flex justify-end gap-2 md:gap-5">
          <Btn text="Accept" bgColor="green" btn_Handler={accept_handler} />
          <Btn text="Reject" bgColor="red" btn_Handler={reject_handler} />
        </div>
      </div>
    </div>
  );
};

export default NotificationMessageCard1;
