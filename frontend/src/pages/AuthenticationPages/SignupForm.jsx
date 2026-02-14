import React, { useState } from "react";
import DatePicker from "../../components/DatePicker";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const SignupForm = () => {
  // Error Message
  const [errorMessage, setErrorMessage] = useState(null);

  // Days
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Months
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Years (example: 1900–2026)
  const years = Array.from({ length: 127 }, (_, i) => 1900 + i);


  const [getSignupData, setSignupData] = useState({
    firstName: "",
    serName: "",
    dob: {
      days: "",
      months: "",
      years: "",
    },
    gender: "",
    email: "",
    password: "",    
  })

  const navigate = useNavigate();

  const handleChange = (event)=>{
    console.log(getSignupData);
    setSignupData((prev)=>{
      return {...prev, [event.target.name] : event.target.value}
    })
  }

  const handleSubmitHandler = async (event)=>{
    event.preventDefault();
    console.log(getSignupData);

    try {
      const response = await axios.post('http://localhost:9000/api/user/auth/signup',
        { UserData: getSignupData }
      );

      console.log(response.data);

      if(response.data.success){
        navigate('http://localhost:5173/signup/verify', {state: {email:getSignupData.email}})
      }

    } catch (error) {
      if(error.response){
        setErrorMessage(error.response.data.message);

        setTimeout(()=>{
          setErrorMessage(null);
        }, 3000)
      }
    }
  }
  


  return (
    <form onSubmit={handleSubmitHandler}
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
      className="max-w-140 bg-[#ffffff] shrink-0 py-5 flex flex-col items-center justify-center rounded-2xl"
    >
      <div className="w-full py-3 mb-2 border-b border-[#848181]">
        <h3 className="text-2xl md:text-3xl font-bold text-center">
          Create a new Account
        </h3>
        <p className="text-[1.2em] text-[#5a5858] text-center">
          It's quick and easy
        </p>

        { errorMessage && <h3 className="text-[#c73c3c] text-xl bg-[#d28d8ddc] py-2 text-center">Error! {errorMessage} </h3>}
      </div>
      <div className="w-full py-3 px-5">
        <div className="w-full flex gap-3">
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3  py-[0.6em] outline-none border border-[#848181] rounded-xl"
          />
          <input
            type="text"
            name="serName"
            onChange={handleChange}
            placeholder="Sername"
            className="w-full px-3  py-[0.6em] outline-none border border-[#848181] rounded-xl"
          />
        </div>

        <h3 className="text-[#5a5858] mt-3 mb-1">Date of Birth</h3>
        <div className="w-full flex gap-3">
          <DatePicker option={days} type={"Days"} names={"days"} getSignupData={getSignupData}  setSignupData={setSignupData} />
          <DatePicker  option={months} type={"Month"} names={"months"} getSignupData={getSignupData} setSignupData={setSignupData} />
          <DatePicker option={years} type={"Year"} names={"years"} getSignupData={getSignupData} setSignupData={setSignupData} />
        </div>

        <h3 className="text-[#5a5858] mt-3 mb-1">Gender</h3>
        <div className="w-full flex gap-3">
          <label
            name="gender"
            value = "male"
            checked = {getSignupData.gender === "male"}
            onChange={handleChange}
            className="w-full flex  items-center justify-between text-[#5a5858] px-3 rounded-[0.4em] py-[0.6em] outline-none border border-[#848181]"
          >
            Male
            <input type="radio" name="gender" value="Male" />
          </label>

          <label
            name="gender"
            value="female"
            checked={getSignupData.gender === "female"}
            onChange={handleChange}
            className="w-full flex  items-center justify-between text-[#5a5858] px-3 rounded-[0.4em] py-[0.6em] outline-none border border-[#848181]"
          >
            Female
            <input type="radio" name="gender" value="Female" />
          </label>

          <label
            name="gender"
            value="custom"
            checked={getSignupData.gender === "custom"}
            onChange={handleChange}
            className="w-full flex  items-center justify-between text-[#5a5858] px-3 rounded-[0.4em] py-[0.6em] outline-none border border-[#848181]"
          >
            Custom
            <input type="radio" name="gender" value="Custom" />
          </label>
        </div>

        <div className="w-full flex gap-3 mt-3">
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full px-3  py-[0.6em] outline-none border border-[#848181] rounded-xl"
          />
        </div>

        <div className="w-full mt-3 flex gap-3">
          <input
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="New Password"
            className="w-full px-3  py-[0.6em] outline-none border border-[#848181] rounded-xl"
          />
        </div>

        <div>
          <p className="text-[1em] font-medium text-[#848181] leading-none mt-3">
            People who use our service may have uploaded your contact
            information to Facebook.{" "}
            <span className="text-[#375b9f]"> Learn more. </span>
          </p>
          <p className="text-[0.9em] font-medium text-[#848181] leading-none mt-3">
            By clicking Sign up, you agree to our{" "}
            <span className="text-[#375b9f]"> Terms, Privacy Policy </span>
            <span className="text-[#375b9f]"> and Cookies Policy</span>.<br />
            You may receive SMS notifications from us and can opt out at any
            time.
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <button type="submit" className="active:scale-95 text-xl font-semibold md:text-2xl md:font-bold bg-[#15793d] text-white px-8 rounded-2xl py-2 ">
          
          Sign up
        </button>

        <Link to="/login" className="font-semibold  text-[#436097] px-8 text-sm py-2 ">
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
