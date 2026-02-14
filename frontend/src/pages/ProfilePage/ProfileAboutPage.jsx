import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import AboutInfo from "../About_Semi_Pages/AboutInfo";
import AboutPersonalDetails from "../About_Semi_Pages/AboutPersonalDetails";
import AboutWork from "../About_Semi_Pages/AboutWork";
import AboutLanguage from "../About_Semi_Pages/AboutLanguage";
import AboutContactInfo from "../About_Semi_Pages/AboutContactInfo";
import AboutSkills from "../About_Semi_Pages/AboutSkills";
import AboutEducation from "../About_Semi_Pages/AboutEducation";
import AboutHobbies from "../About_Semi_Pages/AboutHobbies";

const ProfileAboutPage = () => {
  return (
    <div className="w-full px-3 flex flex-row items-start justify-center bg-[#f4f4f4] mt-3 rounded-2xl">
      <div className="w-[20vw] border-r-2 border-[#c5c5c5c8] px-3 py-8">
        <h1 className="text-[1.5em] font-bold">About</h1>

        {/* Semi Links */}
        <nav className="mt-3 text-[1em] flex flex-col gap-1">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#1655b4" : "#959595",
              backgroundColor: isActive ? "#5b92de3f" : "transparent",
            })}
            to="/profile/about"
            end
            className="font-medium text-[#959595] px-5 py-2 bg-[#5b92de3f] rounded-[0.7em]"
          >
            Info
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#1655b4" : "#959595",
              backgroundColor: isActive ? "#5b92de3f" : "transparent",
            })}
            to="/profile/about/personal_details"
            className="font-medium text-[#959595] px-5 py-2  rounded-[0.7em]"
          >
            Personal Details
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#1655b4" : "#959595",
              backgroundColor: isActive ? "#5b92de3f" : "transparent",
            })}
            to="/profile/about/work"
            className="font-medium text-[#959595] px-5 py-2  rounded-[0.7em]"
          >
            Work
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#1655b4" : "#959595",
              backgroundColor: isActive ? "#5b92de3f" : "transparent",
            })}
            to="/profile/about/education"
            className="font-medium text-[#959595] px-5 py-2  rounded-[0.7em]"
          >
            Education
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#1655b4" : "#959595",
              backgroundColor: isActive ? "#5b92de3f" : "transparent",
            })}
            to="/profile/about/skills"
            className="font-medium text-[#959595] px-5 py-2  rounded-[0.7em]"
          >
            Skills
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#1655b4" : "#959595",
              backgroundColor: isActive ? "#5b92de3f" : "transparent",
            })}
            to="/profile/about/hobbies"
            className="font-medium text-[#959595] px-5 py-2  rounded-[0.7em]"
          >
            Hobbies
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#1655b4" : "#959595",
              backgroundColor: isActive ? "#5b92de3f" : "transparent",
            })}
            to="/profile/about/contact_info"
            className="font-medium text-[#959595] px-5 py-2  rounded-[0.7em]"
          >
            Contact Info
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#1655b4" : "#959595",
              backgroundColor: isActive ? "#5b92de3f" : "transparent",
            })}
            to="/profile/about/language"
            className="font-medium text-[#959595] px-5 py-2  rounded-[0.7em]"
          >
            Language
          </NavLink>
        </nav>
      </div>

      <div className="w-full">
        {/* Local Routes */}
        <Routes>
          <Route index element={<AboutInfo />} />
          <Route path="personal_details" element={<AboutPersonalDetails />} />
          <Route path="work" element={<AboutWork />} />
          <Route path="education" element={<AboutEducation />} />
          <Route path="skills" element={<AboutSkills />} />
          <Route path="hobbies" element={<AboutHobbies />} />
          <Route path="contact_info" element={<AboutContactInfo />} />
          <Route path="language" element={<AboutLanguage />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfileAboutPage;
