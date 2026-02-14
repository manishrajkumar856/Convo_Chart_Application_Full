import React from "react";
import SignupForm from "./SignupForm";
import FormError from "../../components/FormError";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const SignupPage = () => {

  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div className=" w-full min-h-screen lg:px-10  px-3 py-2"

    >
      <div className="w-full h-full flex items-center justify-center flex-col gap-10  ">
        <div className="">
           <h1 className=" mt-10   text-center text-2xl lg:text-3xl text-[#3577b5]  font-bold">Convo<span className="text-2xl md:text-3xl lg:text-3xl  text-[#c24545]">Room</span></h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SignupPage;
