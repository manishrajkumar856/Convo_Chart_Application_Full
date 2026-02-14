import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { UserDataContext } from "../contextApi/DataContaxt";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import BottomNav from "./pages/BottomNav/BottomNav";

const App = () => {
  const { fetchUserData, userData, dataLoader } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!dataLoader && userData === null) {
      navigate("/login");
    }
  }, [dataLoader, userData, navigate]);

  if (dataLoader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex pb-30 flex-col min-h-screen bg-[#e9e3e3]">
      {userData && <Header />}
        <Outlet />
      {/* {userData && <Footer />} */}

      {userData && <BottomNav />}

    </div>
  );
};

export default App;