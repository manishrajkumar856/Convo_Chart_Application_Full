import React from "react";
import { NavLink } from "react-router-dom";

const ProfileHeader = () => {
  return (
    <div className="w-full mt-5 border-b border-b-[#9090907f] py-2">
      <div>
        <NavLink
          to="/profile"
          end
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            borderBottom: isActive ? "3px solid #1655b4" : "none"
          })}

          className="text-xl font-semibold px-5 py-2 text-[#666464]"
        >
          All
        </NavLink>
        <NavLink
          to="/profile/about"
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            borderBottom: isActive ? "3px solid #1655b4" : "none"
          })}

          className="text-xl font-semibold px-5 py-2 text-[#666464]"
        >
          About
        </NavLink>
        <NavLink
          to="/profile/friend"
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            borderBottom: isActive ? "3px solid #1655b4" : "none"
          })}

          className="text-xl font-semibold px-5 py-2 text-[#666464]"
        >
          Friend
        </NavLink>
        <NavLink
          to="/profile/posts"
          style={({ isActive }) => ({
            color: isActive ? "#1655b4" : "#565555",
            borderBottom: isActive ? "3px solid #1655b4" : "none"
          })}

          className="text-xl font-semibold px-5 py-2 text-[#666464]"
        >
          Posts
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileHeader;
