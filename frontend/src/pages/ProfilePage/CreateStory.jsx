import React, { useContext, useRef, useState } from "react";

import { RxCross2 } from "react-icons/rx";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import axios from "axios";


const CreateStory = ({setIsStoryClicked}) => {
  const inputPostFileRef = useRef();
  const [getFile, setFile] = useState(null);
  const [getFileUrl, setFileUrl] = useState(null);
  const [desc, setDesc] = useState("");
  const {userData, fetchUserData} = useContext(UserDataContext);
  const token = localStorage.getItem("accessToken");

  function handleCancleBtn() {
    setDesc("");
    setFileUrl("");
    setFile(null);
  }

  function handleCrossBtn() {
    setDesc("");
    setFileUrl("");
    setFile(null);
    setIsStoryClicked(false);
  }

  // Main upload logic
  async function handleStoryUpload(event) {
    event.preventDefault();

    const storyData = {
      storyDesc: desc,
      userId: userData._id,
      storyFileType: getFile && getFile.type,
      story: getFile,
    }

    const fd = new FormData();
    fd.append("storyDesc", storyData.storyDesc);
    fd.append("userId", storyData.userId);
    fd.append("storyFileType", storyData.storyFileType);
    fd.append("story", storyData.story);

    try {
      const response = await axios.post(
        "https://convo-chart-application-full.onrender.com/api/story/createNewStory",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

  
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  }

  function handleTextAreaChange(e) {
    setDesc(e.target.value);
  }

  function handleSelectFile(e) {
    setFile(e.target.files[0]);
    const storyFile = e.target.files[0];

    if(storyFile){
      const reader = new FileReader();
      reader.onload = (e)=>{
        setFileUrl(e.target.result); 
      }
      reader.readAsDataURL(storyFile);
    }
  }

  return (
    <div className="absolute flex justify-center px-3 items-center z-50 top-0 left-0 w-full h-full bg-[#3e3e3e]">
      <form
        onSubmit={handleStoryUpload}
        className=" w-150 px-5 py-3 bg-[#ffff] border-2 border-[#acacac] rounded-2xl"
      >
        <div className="w-full text-2xl flex justify-end">
          <div
            onClick={handleCrossBtn}
            className="px-2 py-2 hover:bg-[#d6d6d6] ease-in duration-200 cursor-pointer rounded-full font-semibold"
          >
            <RxCross2 />
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-3">Create your new story</h3>

        {/* Input Description Field */}
        <textarea
          placeholder="Story Description if not leave it empty"
          onChange={handleTextAreaChange}
          value={desc}
          className="w-full border-2 outline-none px-5 rounded-2xl py-3 border-[#acacac]"
          name="description"
        ></textarea>

        {/* For video and Images Selecter */}
        <div className="w-full max-h-70 flex items-center justify-center bg-[#85858583] h-70 rounded-xl  overflow-hidden">
          {getFile && getFile.type.startsWith("image/") && (
            <img className="h-full object-fill" src={getFileUrl} />
          )}

          {getFile && getFile.type.startsWith("video/") && (
            <video autoPlay className="h-full object-fill" src={getFileUrl} />
          )}
        </div>

        {/* For getting Video and Image File */}
        <input
          ref={inputPostFileRef}
          onChange={handleSelectFile}
          style={{ display: "none" }}
          className="px-5 py-2 bg-[#ffff]"
          type="file"
          accept="image/*" // Fro videos and imge both ->  accept="image/*, video/*"
        />

        {/* Image Selecter Btn */}
        <div className="w-full flex  justify-between  items-center mt-5 px-5">
          <div className="text-[0.8em] md:text-xl font-semibold">
            Choose what to upload
          </div>
          <button
            type="button"
            onClick={(e) => inputPostFileRef.current.click()}
            className="px-10 py-2 bg-[#8b8b8bef] rounded-xl text-[#ffff]"
          >
            Select
          </button>
        </div>

        {/* Cancle and Upload Btn */}
        <div className="w-full flex justify-center gap-5 mt-3">
          <button
            type="button"
            onClick={handleCancleBtn}
            className="px-10 py-2 bg-[#d75041ef] rounded-xl text-[#ffff]"
          >
            Cancle
          </button>
          <button
            className="px-10 py-2 bg-[#5da7e7ef] rounded-xl text-[#ffff]"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;
