import React, { useState } from "react";
import { FaHandSparkles } from "react-icons/fa6";
import { IoHandLeftOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

const AboutPersonalDetails = () => {
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


      <div>
        <h2 className="text-[1.2em] font-semibold">Name</h2>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#717171]">
            Manish raj kumar
          </h2>
          <div
            onClick={handleEditInfo}
            className="flex items-center justify-center p-3 cursor-pointer rounded-full hover:bg-[#dedede] ease-in duration-300"
          >
            <GoPencil className="text-2xl text-[#6e6c6c]" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[1.2em] font-semibold">D.O.B</h2>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#717171]">
            21 Aug 2004
          </h2>
          <div
            onClick={handleEditInfo}
            className="flex items-center justify-center p-3 cursor-pointer rounded-full hover:bg-[#dedede] ease-in duration-300"
          >
            <GoPencil className="text-2xl text-[#6e6c6c]" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[1.2em] font-semibold">Address</h2>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#717171]">
            Bhuli
          </h2>
          <div
            onClick={handleEditInfo}
            className="flex items-center justify-center p-3 cursor-pointer rounded-full hover:bg-[#dedede] ease-in duration-300"
          >
            <GoPencil className="text-2xl text-[#6e6c6c]" />
          </div>
        </div>
      </div>


      <div>
        <h2 className="text-[1.2em] font-semibold">Country</h2>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#717171]">
            India
          </h2>
          <div
            onClick={handleEditInfo}
            className="flex items-center justify-center p-3 cursor-pointer rounded-full hover:bg-[#dedede] ease-in duration-300"
          >
            <GoPencil className="text-2xl text-[#6e6c6c]" />
          </div>
        </div>
      </div>




      <div>
        <h2 className="text-[1.2em] font-semibold">State</h2>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-medium text-[#717171]">
            Jharkhand
          </h2>
          <div
            onClick={handleEditInfo}
            className="flex items-center justify-center p-3 cursor-pointer rounded-full hover:bg-[#dedede] ease-in duration-300"
          >
            <GoPencil className="text-2xl text-[#6e6c6c]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPersonalDetails;
