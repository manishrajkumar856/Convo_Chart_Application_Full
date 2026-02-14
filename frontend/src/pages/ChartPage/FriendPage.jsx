import React, { useContext, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import AddFriendBtn from "../../components/Buttons/AddFriendBtn";
import ChatWithFriendBtn from "../../components/Buttons/ChatWithFriendBtn";
import RemoveFriendBtn from "../../components/Buttons/RemoveFriendBtn";
import FriendCard from "../../components/Cards/FriendCard";
import AcFriendCard from "../../components/Cards/AcFriendCard";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import { Outlet } from "react-router-dom";

const FriendPage = () => {
  return (
    <div className="w-full mt-20 flex justify-center items-center px-2 md:px-10  lg:px-30 py-5">
      <Outlet/>
    </div>
  );
};

export default FriendPage;
