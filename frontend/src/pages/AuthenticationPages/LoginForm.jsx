import React, { useContext, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../../../contextApi/DataContaxt";

const LoginForm = () => {
  const navigate = useNavigate();

  // Error Message
  const [errorMessage, setErrorMessage] = useState(null);
  const {userData, setUserData} = useContext(UserDataContext);

  const [getLoginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (event)=>{
    console.log(getLoginForm)
    setLoginForm((prev)=>{
      return {...prev, [event.target.name]: event.target.value}
    })
  }
 
  const handleSubmitHandler = async (event)=>{
    event.preventDefault();
    console.log(getLoginForm);
    try {
      const response = await axios.post('http://localhost:9000/api/user/auth/login',
        { getLoginForm }
      );

      console.log("Response:",response.data);

      if(response.data.success){

        localStorage.setItem("UserId", response.data.userId);
        localStorage.setItem("accessToken", response.data.accessToken);
        setUserData(response.data.userData);
        navigate('/');
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
      className="max-w-140 lg:min-w-100 bg-[#ffffff] shrink-0 py-5 flex flex-col items-center justify-center rounded-2xl"
    >
      <div className="w-full py-3   ">
        <h3 className="text-2xl px-10 md:text-2xl font-medium text-center">
          Log in to ConvoRoom
        </h3>
      </div>
      { errorMessage && <h3 className="text-[#c73c3c] text-xl bg-[#d28d8ddc] py-2 text-center">Error! {errorMessage} </h3>}
      <div className="w-full py-3 px-5">
        <div className="w-full flex gap-3 mt-3">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={getLoginForm.email}
            placeholder="Email address"
            className="w-full px-3  py-[0.6em] outline-none border border-[#848181] rounded-xl"
          />
        </div>

        <div className="w-full mt-3 flex gap-3">
          <input
            name="password"
            onChange={handleChange}
            value={getLoginForm.password}
            type="text"
            placeholder="New Password"
            className="w-full px-3  py-[0.6em] outline-none border border-[#848181] rounded-xl"
          />
        </div>

        <div className="w-full mt-3 flex gap-3">
          <h3>Forget Password</h3>
        </div>
      </div>

      <div className="flex flex-col mt-3">
        <button className="active:scale-95 text-xl font-semibold md:text-2xl md:font-bold bg-[#549bdd] text-white px-8 rounded-2xl py-2 ">
        
          Log in
        </button>

        <div className="font-semibold  text-[#436097] px-8 text-sm py-2 ">
          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
