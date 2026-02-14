import axios from "axios";
import React, { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const UserDataContext = createContext();

function DataContextProvider({ children }) {
  const token = localStorage.getItem("accessToken");
  // const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [dataLoader, setDataLoader] = useState(true);

  // Fetch User Data
  const fetchUserData = async () => {
    if (!token) {
      setDataLoader(false);
      return false;
    }

    // Setting Loader
    setDataLoader(true);
    try {
      const res = await axios.get("http://localhost:9000/api/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(res.data.userData);
      console.log(res.data);
      return true;
    } catch (error) {
      console.error(error);
      setUserData(null);
    }
    finally{
      setDataLoader(false);
    }
  };

  // Get data using id
  async function getDataUsingId(id) {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/getUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.data;
    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }
  }
  return (
    <UserDataContext.Provider value={{ fetchUserData, getDataUsingId, userData, setUserData, dataLoader }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default DataContextProvider;