import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VerifyForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [getOtp, setOtp] = useState("");

  const handleSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("FLDSKF",getOtp, email);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/user/auth/verify",
        {
          otp: getOtp,
          email: email,
        },
      );

      console.log(response.data);

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  };

  const handleCancleBtn = async (event)=>{
    console.log("Hello Cancle", event)
    try {
        const response = await axios.post(
        "http://localhost:9000/api/user/auth/cancle",
        {
          email: email,
        },
      );

      console.log(response.data);
      navigate('/signup/signin')
    } catch (error) {
        console.log("Error Message: ", error)
        setErrorMessage(error.response.data.message);
    }
  }


  const handleChange = (event) => {
    console.log(getOtp);
    setOtp(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmitHandler}
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
      className="max-w-140 lg:min-w-100 bg-[#ffffff] md:shrink-0  py-5 flex flex-col items-center justify-center rounded-2xl "
    >
      <div className="w-full py-3  border-b border-[#c2bbbbc3]">
        <h3 className="text-xl md:text-2xl px-5 md:px-10 font-medium text-start">
          Enter Security Code
        </h3>
      </div>
      {errorMessage && (
        <h3 className="text-[#c73c3c] w-full mt-1 text-xl bg-[#d28d8ddc] py-2 text-center">
          Error! {errorMessage}{" "}
        </h3>
      )}
      <div className="w-full py-3 ">
        <p className="text-[0.8em] px-5 md:px-10  md:text-[1.1em] text-[#454343] text-start font-medium ">
          Please Check your email for a message with your otp. your otp is 4
          numbers long.
        </p>
      </div>
      <div className="w-full py-1 px-5 md:px-10  flex flex-col md:flex-row gap-5">
        <div className="w-full gap-3 mt-3">
          <input
            type="text"
            name="otp"
            onChange={handleChange}
            value={getOtp}
            placeholder="Otp"
            className="w-full px-3  py-[0.6em] outline-none border border-[#848181] rounded-xl"
          />
        </div>

        <div className="w-full text-2xl flex flex-col">
          <h3 className="text-[0.71em] font-semibold">We send you code to:</h3>
          {email && (
            <p className="text-[0.71em] font-light text-[#5f5a5a]">{email}</p>
          )}
        </div>
      </div>

      <div className="flex-col-reverse md:flex-row mt-3 w-full justify-between items-center px-5 md:px-10  border-t py-2 border-[#b8b5b5a1]">
        <div className="font-semibold  text-[#436097] px-3 md:px-8 text-sm py-2 ">
          <Link to="/signup">Didn't get a code</Link>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={handleCancleBtn} className="active:scale-95 text-[0.9em] md:text-xl  bg-[#b0b4b7] text-white px-6 md:px-8 rounded-2xl py-1 md:py-2 ">
            Cancle
          </button>

          <button type="submit" className="active:scale-95 text-[0.9em]  md:text-xl bg-[#549bdd] text-white  px-6 md:px-8 rounded-2xl py-1 md:py-2 ">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerifyForm;
