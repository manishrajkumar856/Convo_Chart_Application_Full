import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import ProfilePicBtn from "../../components/Buttons/ProfilePicBtn";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import CreateStory from "./CreateStory";
import StoryPage from "../StoryPage/StoryPage";

const ProfileInfo = ({ cardData }) => {
  const { userData } = useContext(UserDataContext);
  const userDatas = cardData || userData;
  const [isStoryClicked, setIsStoryClicked] = useState(false);

  const handleStory = (e) => {
    if (isStoryClicked) {
      setIsStoryClicked(false);
    } else {
      setIsStoryClicked(true);
    }
  };

  //******************Story Related******************
  const [openStoryContainer, setStoryOpenContainer] = useState(false);
  const storyStyle = {
    border: "3px solid #336fd0",
  };

  const handleStoryView = () => {
    if (userData.storyList.length > 0) {
      setStoryOpenContainer(true);
    }
  };

  return (
    <div className="w-full max-w-300 flex flex-col justify-center gap-5 md:flex  md:flex-row md:justify-between items-center mt-5 ">
      {/* For Story */}
      {isStoryClicked && <CreateStory setIsStoryClicked={setIsStoryClicked} />}

      {/* For Viewing Story */}
      {openStoryContainer && userData.storyList.length > 0 && (
        <StoryPage
          setStoryOpenContainer={setStoryOpenContainer}
          userId={userData._id}
          userInf={userData}
        />
      )}

      <div className="flex md:flex gap-10 justify-center items-center">
        <div
          onClick={handleStoryView}
          style={userData.storyList.length > 0 ? storyStyle : null}
          className="w-30 h-30 md:w-50 md:h-50 relative rounded-full"
        >
          {userDatas.profilePicInfo ? (
            <img
              className="w-full h-full rounded-full object-cover"
              src={userDatas.profilePicInfo.profileUrl}
              alt=""
            />
          ) : (
            <img
              className="w-full h-full rounded-full object-cover"
              src="https://th.bing.com/th/id/R.966f895d1d51d64540ad850e8d0cc675?rik=R%2fVIL4CNzzXtpw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-Kr2KVnyWveA%2fUA6_7TXcs8I%2fAAAAAAAAAVU%2f6c3SkPn9skk%2fs1600%2fballoons-sunset-view-facebook-cover.jpg&ehk=kPhjnc2%2fmk4XJI4w%2bGKvGF7%2fmjs5t8F1ibKJhfsgQ3s%3d&risl=&pid=ImgRaw&r=0"
              alt=""
            />
          )}

          {!cardData && <ProfilePicBtn />}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-3xl font-semibold">
            {userDatas.firstName + " " + userDatas.serName}
          </h3>
          <div className="text-[1em] font-medium ">
            <span>{userDatas.friendList.length}</span> Friends
          </div>
        </div>
      </div>

      <div className="">
        {!cardData && (
          <div className="flex gap-3 px-5">
            <button
              onClick={handleStory}
              className="text-[0.8em] font-semibold py-[0.5em] px-5 md:py-[0.35em] rounded-2xl  text-white bg-[#307ecd] outline-none flex justify-center gap-2 items-center md:text-[1.2em]"
            >
              <FaPlus /> Add Story
            </button>

            <button className="text-[0.8em] py-[0.5em] font-semibold px-5  rounded-2xl bg-[#d0cfcf] outline-none flex justify-center gap-2 items-center md:text-[1.2em]">
              <MdEdit /> Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
