import React, { useContext } from "react";
import ProfileCoverBtn from "../../components/Buttons/ProfileCoverBtn";
import { UserDataContext } from "../../../contextApi/DataContaxt";

const CoverContainer = ({cardData}) => {
  const { userData } = useContext(UserDataContext);


  // Use a simple fallback: if cardData exists, use it; otherwise use userData
  const userDatas = cardData || userData;

  return (
    <div className="w-full max-w-300 max-h-[15em] md:max-h-[25em] overflow-hidden rounded-2xl relative">
      {userDatas.profileCoverPicInof ? (
        <img
          className="w-full object-cover"
          src={userDatas.profileCoverPicInof.profileCoverUrl}
          alt=""
        />
      ) : (
        <img
          className="w-full object-cover"
          src="https://th.bing.com/th/id/R.966f895d1d51d64540ad850e8d0cc675?rik=R%2fVIL4CNzzXtpw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-Kr2KVnyWveA%2fUA6_7TXcs8I%2fAAAAAAAAAVU%2f6c3SkPn9skk%2fs1600%2fballoons-sunset-view-facebook-cover.jpg&ehk=kPhjnc2%2fmk4XJI4w%2bGKvGF7%2fmjs5t8F1ibKJhfsgQ3s%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />
      )}

      {!cardData && <ProfileCoverBtn />}
    </div>
  );
};

export default CoverContainer;
