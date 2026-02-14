import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import StoryPage from "../StoryPage/StoryPage";
import { FiPlus } from "react-icons/fi";

const UserStatusCard = ({ id, isStoryClicked,setIsStoryClicked }) => {
  const { getDataUsingId } = useContext(UserDataContext);
  const [user, setUser] = useState(null);

  async function fetchUser() {
    setUser(await getDataUsingId(id));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  //******************Story Related******************
  const [openStoryContainer, setStoryOpenContainer] = useState(false);
  const storyStyle = {
    border: "3px solid #336fd0",
  };

  const handleStoryView = () => {
    if (user.storyList.length > 0) {
      setStoryOpenContainer(true);
    }
  };


  


  // Fro creating story
  const handleStory = (event) => {
      event.stopPropagation();
        if (isStoryClicked) {
          setIsStoryClicked(false);
        } else {
          setIsStoryClicked(true);
        }
      };

  //Style
  const cardStyle = {
    
    backgroundImage:
      "url('https://th.bing.com/th/id/R.966f895d1d51d64540ad850e8d0cc675?rik=R%2fVIL4CNzzXtpw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-Kr2KVnyWveA%2fUA6_7TXcs8I%2fAAAAAAAAAVU%2f6c3SkPn9skk%2fs1600%2fballoons-sunset-view-facebook-cover.jpg&ehk=kPhjnc2%2fmk4XJI4w%2bGKvGF7%2fmjs5t8F1ibKJhfsgQ3s%3d&risl=&pid=ImgRaw&r=0')",
  };

  return (
    <div
      style={
        user &&
        (!user.profileCoverPicInof
          ? cardStyle
          : {
              backgroundImage: `url(${user?.profileCoverPicInof?.profileCoverUrl})`,
            })
      }
      onClick={handleStoryView}
      className="w-45 shrink-0 h-65 overflow-hidden  flex flex-col items-start justify-between shadow-xl border-2 border-[#5f5e5e8e] shadow-[#212121] bg-[#dddada] rounded-2xl"
    >
      {/* For Viewing Story */}
      {openStoryContainer && user.storyList.length > 0 && (
        <StoryPage
          setStoryOpenContainer={setStoryOpenContainer}
          userId={id}
          userInf={user}
        />
      )}

      <div className="px-5 py-3">
        {user && (
        <div style={
          {
            border: user && user.storyList.length > 0 ? "3px solid #4974da" : null,
          }
        } className="w-12 h-12 overflow-hidden left-3 bg-[#d15b5b] rounded-full">
          {user.profilePicInfo && (
            <img
              className="w-full h-full object-cover"
              src={user.profilePicInfo.profileUrl}
              alt=""
            />
          )}

          {!user.profilePicInfo && (
            <div className="w-full h-full justify-center flex items-center font-semibold text-[#ffff]">
              {user.firstName.split("")[0]}
            </div>
          )}
        </div>
      )}
      </div>

      {user && (
        <div className="relative w-full h-1/3 text-center px-2 py-5 bg-[#ffff] text-[#a69797] flex items-center justify-center text-xl font-semibold">
          <div onClick={handleStory} className="cursor-pointer absolute -top-1/2 flex items-center justify-center text-3xl text-white font-semibold translate-y-1/3 w-12 h-12 border-4 border-white bg-[#4a94ef] rounded-full">
            <FiPlus />
          </div>
          <h3 className="text-[#131313] text-[0.8em]">{user.firstName + " " + user.serName}</h3>
        </div>
      )}
    </div>
  );
};

export default UserStatusCard;
