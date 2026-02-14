
import { FaUser } from "react-icons/fa";
import axios from "axios";
import ChatWithFriendBtn from "../../components/Buttons/ChatWithFriendBtn";
import RemoveFriendBtn from "../../components/Buttons/RemoveFriendBtn";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../contextApi/DataContaxt";


const AcFriendCard = ({id}) => {

  const [getFrData , setFrData] = useState(null);
  const token = localStorage.getItem('accessToken');
  const { userData, getDataUsingId } = useContext(UserDataContext);

  const fetchData = async()=>{
    setFrData(await getDataUsingId(id));
  }

  useEffect(()=> {
    fetchData();
  }, []);


  return (
    <div className="w-[15em] mb-5 overflow-hidden shadow-xl shadow-[#959595]  bg-[#ffff] flex flex-col items-center justify-center rounded-3xl border border-[#9391918d]">
      <div className="w-full">
        <div className="w-full h-50 bg-[#d2d2d2] text-[10em] text-[#707070]  flex items-end justify-center">
          {getFrData && getFrData.profilePicInfo ? <img className="w-full h-full object-cover" src={getFrData.profilePicInfo.profileUrl} alt="" /> : <FaUser />}
        </div>
      </div>
      <div className="text-[1.3em] mt-2 mb-2 font-semibold text-[#484848]">
        {getFrData && <h3>{getFrData.firstName +" "+getFrData.serName}</h3>}
      </div>
      <div className="w-full flex flex-col  gap-2 mb-5 px-3">
        <ChatWithFriendBtn friendId={getFrData && getFrData._id}/>
        <RemoveFriendBtn friendId={getFrData && getFrData._id}/>
      </div>
    </div>
  );
};

export default AcFriendCard;
