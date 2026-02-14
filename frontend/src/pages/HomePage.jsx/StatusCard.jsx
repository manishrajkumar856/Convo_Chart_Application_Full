import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import StoryPage from "../StoryPage/StoryPage";

const StatusCard = ({ id }) => {
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

  //Style
  const cardStyle = {
    backgroundImage:
      "url('https://th.bing.com/th/id/R.966f895d1d51d64540ad850e8d0cc675?rik=R%2fVIL4CNzzXtpw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-Kr2KVnyWveA%2fUA6_7TXcs8I%2fAAAAAAAAAVU%2f6c3SkPn9skk%2fs1600%2fballoons-sunset-view-facebook-cover.jpg&ehk=kPhjnc2%2fmk4XJI4w%2bGKvGF7%2fmjs5t8F1ibKJhfsgQ3s%3d&risl=&pid=ImgRaw&r=0')",
  };

  if(user&& user.storyList.length <=0 ){
    return null
  }

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
      className="w-45 h-65 px-4 shrink-0 flex flex-col items-start justify-between shadow-xl border-2 border-[#5f5e5e8e] shadow-[#212121] py-3 bg-[#dddada] rounded-2xl"
    >
      {/* For Viewing Story */}
      {openStoryContainer && user.storyList.length > 0 && (
        <StoryPage
          setStoryOpenContainer={setStoryOpenContainer}
          userId={id}
          userInf={user}
        />
      )}

      

      {user && (
        <div className="w-12 h-12 overflow-hidden left-3 border-3 border-[#4974da] bg-[#d15b5b] rounded-full">
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

      {
        user && <div className="w-full text-[1em] text-center px-2 py-5 text-[#dedede] text-xl font-semibold">{user.firstName+" "+user.serName}</div>
      }
    </div>
  );
};

export default StatusCard;
