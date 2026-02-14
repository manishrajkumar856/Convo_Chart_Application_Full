import { NavLink } from "react-router-dom"


import { IoHome } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { MdChat } from "react-icons/md";
import { RiFriendicaFill } from "react-icons/ri";
import { BsPostcardFill } from "react-icons/bs";

const BottomNav = () => {
  return (
    <div className="w-full md:hidden flex items-center px-3 justify-center fixed z-50 bottom-5 ">
        <nav className="bg-[#ffffff] max-w-100 border border-[#41414162] shadow shadow-[#2d2d2d] px-5 py-1 rounded-2xl top-[120%] w-full flex items-center justify-evenly   gap-3 ">
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
    </div>
  )
}

export default BottomNav