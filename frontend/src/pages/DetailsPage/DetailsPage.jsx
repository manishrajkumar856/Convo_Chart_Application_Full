import React from 'react'
import CoverContainer from '../ProfilePage/CoverContainer';
import ProfileInfo from '../ProfilePage/ProfileInfo';
import ProfileHeader from '../ProfilePage/ProfileHeader';
import ProfileAllPage from '../ProfilePage/ProfileAllPage';
import ProfileAboutPage from '../ProfilePage/ProfileAboutPage';
import ProfileFriendPage from '../ProfilePage/ProfileFriendPage';
import ProfilePostPage from '../ProfilePage/ProfilePostPage';
import { Route, Routes, useLocation } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  const {cardData} = location.state || {};

  console.log("Card Data: ",cardData);

  return (
    <div className="w-full flex flex-col justify-center items-center  px-5">
      {/* Cover Picture */}
      <CoverContainer cardData={cardData}/>

      {/* Profile Info */}
      <ProfileInfo cardData={cardData} />

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
}

export default DetailsPage