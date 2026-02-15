import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import FriendCard from "../../components/Cards/FriendCard";
import Slider1 from "../../components/Slider/Slider1";
import axios from "axios";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import AllPost from "./AllPost";
import StatusCard from "./StatusCard";
import UserStatusCard from "./UserStatusCard";
import CreateStory from "../ProfilePage/CreateStory";

const HomePage = () => {
  const token = localStorage.getItem("accessToken");
  const [getLoading, setLoading] = useState(false);
  const [getLoading2, setLoading2] = useState(true);
  const [getFriendSugg, serFriendSugg] = useState(null);
  const { userData } = useContext(UserDataContext);
  

  const friendSuggestion = async () => {
    console.log(userData);
    try {
      const response = await axios.get(
        "https://convo-chart-application-full.onrender.com/api/getFriendSugg/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: userData._id,
          },
        },
      );

      console.log(response.data);
      serFriendSugg(response.data.friendSuggestionList);
      setLoading2(false);
    } catch (error) {}
  };

  useEffect(() => {
    friendSuggestion();
  }, []);

  if (getLoading) {
    return (
      <div className="w-full h-screen">
        <Loader />
      </div>
    );
  }


  // Fro Story Creation
  const [isStoryClicked, setIsStoryClicked] = useState(false);
  
  return (
    <div className="w-full flex flex-col justify-center items-start  px-5 md:px-20 lg:px-30 py-5">


       {/* For Story Creation*/}
      {isStoryClicked && <CreateStory setIsStoryClicked={setIsStoryClicked} />}


      <div className="w-full overflow-x-auto custom-scrollbar whitespace-nowrap h-full px-10 py-10 rounded-2xl mt-20 flex gap-3">
        <UserStatusCard id={userData && userData._id} isStoryClicked={isStoryClicked} setIsStoryClicked={setIsStoryClicked}  />
      
        {userData &&
          userData.friendList.map((frId, idx) => {
            return <StatusCard key={idx} id={frId} />
          })}
      </div>

      <Slider1 className="flex flex-col">
        {getLoading2 && <Loader />}

        {!getLoading2 &&
          getFriendSugg &&
          getFriendSugg.map((itm, idx) => (
            <FriendCard key={idx} cardData={itm} imgData={null} />
          ))}
      </Slider1>

      <div className="w-full mt-3 bg-white px-3 md:px-5 lg:px-10 py-4 rounded-xl">
        <h2 className="mt-5 mb-3 text-xl text-[#3d7fd0] font-medium">
          New Posts
        </h2>
        <AllPost />
      </div>
    </div>
  );
};

export default HomePage;
