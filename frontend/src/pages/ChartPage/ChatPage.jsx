

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../socket/socket";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import axios from "axios";

const ChatPage = () => {
  const location = useLocation();
  const { friendId } = location.state || {};
  const { userData, getDataUsingId } = useContext(UserDataContext);
  const [getFrData, setFrData] = useState(null);
  const token = localStorage.getItem("accessToken");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getFriendData = async () => {
    const frData = await getDataUsingId(friendId);

    setFrData(frData);
  };

  useEffect(() => {
    getFriendData();
  }, []);

  useEffect(() => {
    // connect socket
    socket.connect();

    // Join your own room
    socket.emit("join", userData._id);

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("welcome", (msg) => {
      console.log("Emited Msg: ", msg);
    });
  }, [friendId]);

  const handle_change_field = (e) => {
    setMessage(e.target.value);
  };

  const handle_submit_message = (e) => {
    const create_message = {
      sender: userData._id,
      receiver: friendId,
      message: message.trim(),
    };

    socket.emit("mess", create_message);
    setMessage("");
  };

  const getAllMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/chat/getAllChat",
        {
          yourId: userData._id,
          friendId: friendId,
        },
      );

      console.log(response);

      setMessages(response.data.chats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessage();
  });

function dateConverter(dateStr) {
  const date = new Date(dateStr);

  // Convert to IST by shifting timezone
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Get formatted string in Indian format
  const dateIn = new Intl.DateTimeFormat("en-IN", options).format(date);

  // For custom month names
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Extract IST parts using DateTimeFormat with individual options
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).formatToParts(date);

  // Helper to get specific part
  const getPart = (type) => parts.find(p => p.type === type).value;

  const convertedDate = `${getPart("day")} ${months[parseInt(getPart("month")) - 1]} at - ${getPart("hour")}hr : ${getPart("minute")}min`;

  return convertedDate;
}

// Example usage:
console.log(dateConverter("2026-02-10T06:00:00Z"));
// Output: "10 Feb at - 11hr : 30min"

  return (
    <div className="w-full mt-20 max-w-200 h-[60vh] flex flex-col bg-[#f4f4f4]">
      {/* Header */}
      <div className="p-4 bg-white flex justify-start items-center gap-3 text-xl shadow font-semibold">
        <div className="w-10 h-10 text-[#ffff] text-2xl flex items-center justify-center overflow-hidden bg-[#930b0bca] rounded-full">
          {getFrData?.profilePicInfo?.profileUrl && (
            <img
              className="w-full h-full object-cover"
              src={getFrData.profilePicInfo.profileUrl}
              alt=""
            />
          )}

          {getFrData && !getFrData?.profilePicInfo?.profileUrl && (
            <h3>{getFrData.firstName.split("")[0]}</h3>
          )}
        </div>

        {getFrData && (
          <div className="text-[#727272]">
            {getFrData.firstName + " " + getFrData.serName}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="w-full h-full flex flex-col gap-2 py-3 px-2 md-10 overflow-y-auto">
        {messages.map((data) => (
          <div className="w-full " key={data._id || Math.random()}>
            {data.sender === userData._id ? (
              <div className="w-full  flex flex-col justify-start ">
                <div className="inline-block w-fit px-8 py-2 rounded-l-2xl rounded-bl-full rounded-full bg-[#6db4de9f] text-blue-600">
                  You: {data.message}
                </div>
                <div className="block px-8 py-2 text-sm rounded-full text-[#2f2e2e]">{dateConverter(data.createdAt)}</div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-end justify-end">
                <div className="block w-fit px-8 py-2 rounded-full bg-[#95959555] text-[#2f2e2e]">
                  Friend: {data.message}
                </div>
                <div className="block px-8 py-2 text-sm rounded-full text-[#2f2e2e]">{dateConverter(data.createdAt)}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white flex gap-2">
        <input
          type="text"
          value={message}
          onChange={handle_change_field}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handle_submit_message}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
