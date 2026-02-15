import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import ProfileBox from "./ProfileBox";
import { MdChat } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { RiFriendicaFill } from "react-icons/ri";
import { BsPostcard } from "react-icons/bs";
import { BsPostcardFill } from "react-icons/bs";
import SearchMaterial from "./SearchMaterial";
import { UserDataContext } from "../../contextApi/DataContaxt";
import axios from "axios";

const Header = () => {
  const [isInputFocus, setIsInputFocus] = useState(false);
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



  const handleInputChange = (e)=>{
    const filterPeople = getPeoples.filter((peple)=> {
      const fullName = peple.firstName+" "+peple.serName;
      return fullName.toLowerCase().startsWith(e.target.value);
    })

    setPeopleList(filterPeople);

  }

  const handleInputFocus = ()=>{
    setIsInputFocus(true);
  }

  const handleInputBlur = ()=>{
    setIsInputFocus(false);
  }


  return (
    <div className="w-full fixed z-100  flex shadow-2xl shadow-[#8c8c8c]  justify-between px-10 py-2 bg-[#f9f9f9]">
      <div className="w-1/2 flex justify-start items-center gap-8">
        <div className="text-xl font-semibold text-[#2989c4]">
          {/* <img className="w-10 " src="./logo.png" /> */}C
          <span className="font-bold text-[#d54343]">Room</span>
        </div>
        <div className="relative hidden lg:block">
          <IoSearch className="absolute left-5 text-[#918f8f] text-[1.2em] top-1/2 -translate-y-1/2" />
          <input
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search Friends"
            className="w-60 outline-none px-11 py-2 bg-[#54545412] border-0 border-[#838282] rounded-full"
            type="text"
          />

          {
            isInputFocus && <SearchMaterial peoples={peoples} />
          }
          
        </div>
      </div>

      <nav className=" w-1/2 hidden md:flex items-center justify-evenly   gap-3 ">
        <NavLink
          className="w-full py-2 flex items-center justify-center rounded-xl text-2xl text-center"
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            backgroundColor: isActive ? "#4b94e248" : "transparent",
          })}
        >
          <IoHome />
        </NavLink>

        <NavLink
          to="/friends"
          className="w-full py-2 flex items-center justify-center rounded-xl text-2xl text-center"
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            backgroundColor: isActive ? "#3070cf6a" : "transparent",
          })}
        >
          <RiFriendicaFill />
        </NavLink>

        <NavLink
          to="/people"
          className="w-full py-2 flex items-center justify-center rounded-xl text-2xl text-center"
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            backgroundColor: isActive ? "#3070cf6a" : "transparent",
          })}
        >
          <MdPeopleAlt />
        </NavLink>


        <NavLink
          className="w-full py-2 flex items-center justify-center rounded-xl text-2xl text-center"
          to="/posts"
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            backgroundColor: isActive ? "#3070cf6a" : "transparent",
          })}
        >
          <BsPostcardFill />
        </NavLink>


        <NavLink
          className="w-full py-2 flex items-center justify-center rounded-xl text-2xl text-center"
          to="/notification"
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            backgroundColor: isActive ? "#3070cf6a" : "transparent",
          })}
        >
          <MdChat />
        </NavLink>
      </nav>

      <NavLink to='/profile' className="w-1/2 flex justify-end items-center cursor-pointer">
        <ProfileBox />
      </NavLink>
    </div>
  );
};

export default Header;
