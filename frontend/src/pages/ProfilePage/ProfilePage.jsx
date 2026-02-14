import React from "react";
import CoverContainer from "./CoverContainer";
import ProfileInfo from "./ProfileInfo";
import ProfileHeader from "./ProfileHeader";
import { Route, Routes } from "react-router-dom";
import ProfileAllPage from "./ProfileAllPage";
import ProfileAboutPage from "./ProfileAboutPage";
import ProfileFriendPage from "./ProfileFriendPage";
import ProfilePostPage from "./ProfilePostPage";

const ProfilePage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center  px-5">
      {/* Cover Picture */}
      <CoverContainer />

      {/* Profile Info */}
      <ProfileInfo />

      {/* Profile Header */}
      {/* <ProfileHeader /> */}

      {/* Local Routes */}
      <Routes>
        <Route index element={<ProfileAllPage />} /> {/* default /profile */}
        <Route path="about/*" element={<ProfileAboutPage />} />
        <Route path="friend" element={<ProfileFriendPage />} />
        <Route path="posts" element={<ProfilePostPage />} />
      </Routes>

      
    </div>
  );
};

export default ProfilePage;
