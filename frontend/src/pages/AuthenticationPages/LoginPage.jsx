import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className=" w-full px-3  py-20">
      <div className="w-full flex  flex-col items-center justify-center gap-10 ">
        <div className="w-fit ">
          <h1 className="text-2xl text-center  text-[#3577b5] font-bold">
            Convo<span className="text-4xl text-[#c24545]">Room</span>
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
