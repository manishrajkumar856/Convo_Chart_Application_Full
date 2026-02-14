import React from 'react'
import { IoMdArrowDropleft } from "react-icons/io";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-5 text-2xl text-[#23287a] transform flex items-center justify-center -translate-y-[50%]  font-semibold w-10 h-10 bg-[#1e71a82c] rounded-full"
      style={{position: "absolute", zIndex: 100}}
      onClick={onClick}
    ><IoMdArrowDropleft/></div>
  );
}

export default PrevArrow