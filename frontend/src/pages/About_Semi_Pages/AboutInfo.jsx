import React, { useState } from "react";
import { FaHandSparkles } from "react-icons/fa6";
import { IoHandLeftOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

const AboutInfo = () => {
  const [isBioEdit, setIsBioEdit] = useState(false);

  const handleEditInfo = () => {
    if (isBioEdit) {
      setIsBioEdit(false);
      return;
    }
    setIsBioEdit(true);
  };

  return (
    <div className="px-10 py-10">
      <h2 className="text-xl font-semibold">Bio</h2>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-3 items-center text-xl font-semibold">
          <IoHandLeftOutline className="text-3xl" /> About You
        </div>

        <div
          onClick={handleEditInfo}
          className="flex items-center justify-center p-3 cursor-pointer rounded-full hover:bg-[#dedede] ease-in duration-300"
        >
          <GoPencil className="text-3xl text-[#6e6c6c]" />
        </div>
      </div>

      {isBioEdit && (
        <div className="mt-3">
          <form className="w-full text-2xl  ">
            <textarea className="w-full px-5 py-3 rounded-2xl border-2 outline-none border-[#bbb7b7]" name="about_info"></textarea>
          
            <div className="flex justify-end gap-3">
              <button className="text-xl font-medium px-5 py-1 rounded-xl bg-[#bfbcbc]">cancle</button>
              <button className="text-xl font-medium px-5 py-1 rounded-xl bg-[#5591e6e5] text-[#ffff]">save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AboutInfo;
