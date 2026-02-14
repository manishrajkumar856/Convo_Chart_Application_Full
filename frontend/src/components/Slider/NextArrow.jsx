import React from 'react'
import { IoMdArrowDropright } from "react-icons/io";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-5 text-2xl transform flex items-center justify-center -translate-y-[50%] text-[#23287a] font-semibold w-10 h-10 bg-[#1e71a82c] rounded-full"
      onClick={onClick}
    ><IoMdArrowDropright/></div>
  );
}

export default NextArrow;