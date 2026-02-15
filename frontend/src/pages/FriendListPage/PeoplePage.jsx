import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import axios from "axios";
import FriendCard from "../../components/Cards/FriendCard";
import SearchPeople from "./SearchPeople";

const PeoplePage = () => {
  const { userData } = useContext(UserDataContext);
  const token = localStorage.getItem("accessToken");
  const [peoples, setPeopleList] = useState(null);
  const [getPeoples, setPeoples] = useState(null);

  const peopleList = async () => {
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

     
      setPeoples(response.data.friendSuggestionList);
      setPeopleList(response.data.friendSuggestionList);
    } catch (error) {}
  };

  useEffect(() => {
    peopleList();
  }, []);

  return (
    <div className="w-full min-h-screen mt-20 md:mt-0 flex items-start justify-center px-2 md:px-20 md:py-20">
      <div className="w-full bg-white px-3 py-10 rounded-2xl">
        <SearchPeople getPeoples={getPeoples} setPeopleList={setPeopleList} />

        <div className="w-full min-h-full rounded-2xl flex items-center justify-center gap-10 flex-wrap px-3 py-10 h-full ">
          {peoples &&
            peoples.map((itm, idx) => (
              <FriendCard key={idx} cardData={itm} imgData={null} />
            ))}
        </div>

        {
          peoples && peoples.length<=0 && <div className='text-[#636262] text-2xl w-full h-full flex justify-center items-center'>
                No serch result found
          </div>
        }
      </div>
    </div>
  );
};

export default PeoplePage;
