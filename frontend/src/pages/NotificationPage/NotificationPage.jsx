import React, { useContext, useEffect } from "react";
import NothingHere from "../../components/NothingHere";
import NotificationMessageCard1 from "../../components/Cards/NotificationMessageCard1";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import axios from "axios";

const NotificationPage = () => {
  const notification = null;
  const { userData } = useContext(UserDataContext);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start px-2  md:px-15 lg:px-40">
      <div className="w-full max-w-200 mt-18 max-h-[90vh] overflow-hidden flex flex-col justify-start items-start  gap-3 bg-[#efefefaa] px-2 md:px-20 py-5 mb-10 rounded-2xl text-[#575656]">
        {userData.userNotifications.length == 0 && <NothingHere />}
        {userData.userNotifications.map((itm, idx) => (
          <NotificationMessageCard1 data={itm.data} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
