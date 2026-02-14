import React, { useContext, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import axios from "axios";

const CreatePostForm = ({ setClosePost }) => {
  const inputPostFileRef = useRef();
  const [getFile, setFile] = useState(null);
  const [fileSrc, setFileSrc] = useState(null);
  const [desc, setDesc] = useState("");
  const { userData, fetchUserData } = useContext(UserDataContext);
  const token = localStorage.getItem("accessToken");

  // Handle Submit Form
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      description: desc,
      postType: getFile && getFile.type,
      post: getFile,
      userId: userData._id,
    };

    const fd = new FormData();
    fd.append("description", postData.description);
    fd.append("postType", postData.postType);
    fd.append("post", postData.post);
    fd.append("userId", postData.userId);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/posts/createNewPost",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFile(null);
      setFileSrc(null);
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle File and Src conversion
  const handleSelectFile = (event) => {
    const PostFile = event.target.files[0];
    setFile(PostFile);

    if (PostFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileSrc(e.target.result); // Base 64 String
      };
      reader.readAsDataURL(PostFile);
      /**
         * you’re telling the FileReader API to read the file object (PostFile) and convert it into a Base64‑encoded Data URL.
            - readAsDataURL() reads the file’s binary data
         */
    }
  };

  // Handle Cancle Btn
  const handleCancleBtn = (event) => {
    setFile(null);
    setFileSrc(null);
    setDesc("");
  };

  // Handle cross btn
  const handleCrossBtn = (event) => {
    setFile(null);
    setFileSrc(null);
    setDesc("");
    setClosePost(true);
    fetchUserData();
  };

  const handleTextAreaChange = (e)=>{
    setDesc(e.target.value);
  }

  return (
    <div className="absolute flex justify-center px-3 items-center z-50 top-0 left-0 w-full h-full bg-[#3e3e3e]">
      <form onSubmit={handlePostSubmit}
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


        <h3 className="text-2xl font-semibold mb-3">What is on your mind?</h3>

        {/* Input Description Field */}
        <textarea
          onChange={handleTextAreaChange}
          value= {desc}
          className="w-full border-2 outline-none px-5 rounded-2xl py-3 border-[#acacac]"
          name="description"
        ></textarea>

        {/* For video and Images Selecter */}
        <div className="w-full max-h-70 flex items-center justify-center bg-[#85858583] h-70 rounded-xl  overflow-hidden">
          {getFile && getFile.type.startsWith("image/") && (
            <img className="h-full object-fill" src={fileSrc} />
          )}

          {getFile && getFile.type.startsWith("video/") && (
            <video autoPlay className="h-full object-fill" src={fileSrc} />
          )}
        </div>

        {/* For getting Video and Image File */}
        <input
          ref={inputPostFileRef}
          onChange={handleSelectFile}
          style={{ display: "none" }}
          className="px-5 py-2 bg-[#ffff]"
          type="file"
          accept="image/*"   // For video and image -> accept="image/*, video/*"
        />

        {/* Image Selecter Btn */}
        <div className="w-full flex  justify-between  items-center mt-5 px-5">
          <div className="text-[0.8em] md:text-xl font-semibold">Choose what to upload</div>
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

export default CreatePostForm;
