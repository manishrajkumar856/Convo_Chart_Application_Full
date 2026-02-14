import React, { useContext, useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { UserDataContext } from "../../../contextApi/DataContaxt";
import CommentBox from "./CommentBox";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";

const PostCardAll = ({ post }) => {
  const { getDataUsingId, userData, fetchUserData } = useContext(UserDataContext);
  const [postUser, setPostUser] = useState(null);
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
  const token = localStorage.getItem('accessToken');

  function dateConverter(dateStr) {
    const date = new Date(dateStr);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const convertedDate = `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} at - ${date.getUTCHours()}hr : ${date.getUTCMinutes()}min`;

    return convertedDate;
  }

  async function getUserPostInfo() {
    setPostUser(await getDataUsingId(post.userId));
  }

  useEffect(() => {
    getUserPostInfo();
  }, []);

  // Handle Comment Box open close
  const handleCommentBox = () => {
    return isOpenCommentBox
      ? setIsOpenCommentBox(false)
      : setIsOpenCommentBox(true);
  };

  // Handle Like btn
  const handleLikeBtn = async (e)=>{
    try {
      const response = await axios.patch(`https://convo-chart-application-full.onrender.com/api/posts/likePost/${post._id}`, 
        {
          likeUserId: userData._id,
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchUserData();
    } catch (error) {
      console.log("Error: ", error);      
    }
  }

  return (
    <div className="w-full relative px-1 md:px-5 overflow-hidden bg-[#ffffff] border border-[#a3a3a382] rounded-xl">
      {/* Delete Post */}
      

      <div className="px-1 md:px-3 py-2 bg-white flex items-center justify-start gap-5">
        <div className="w-10 h-10 bg-[#ac6e6e] overflow-hidden rounded-full">
          {postUser?.profilePicInfo?.profileUrl && (
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={postUser.profilePicInfo.profileUrl}
              alt="Profile"
            />
          )}

          {!postUser?.profilePicInfo?.profileUrl && (
            <div className="w-full h-full text-xl text-white flex justify-center items-center font-semibold">
              {postUser && postUser.firstName.split("")[0]}
            </div>
          )}
        </div>
        <div className="text-[1em] md:text-xl font-semibold">
          <div>
            {postUser && <h2>{postUser.firstName + " " + postUser.serName}</h2>}
          </div>
          <div>
            {post && (
              <p className="text-[0.5em] md:text-sm text-[#808080]">
                {dateConverter(post.uploadAt)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        {post && post.postType.startsWith("image/") && (
          <img
            className="max-h-full h-full rounded-2xl border border-[#6f6f6f98]"
            src={post.postData.postUrl}
            alt=""
          />
        )}

        {post && post.postType.startsWith("video/") && (
          <video
            controls
            className="max-h-full h-full rounded-2xl border border-[#6f6f6f98]"
            src={post.postData.postUrl}
            alt=""
          />
        )}
      </div>

      <div className="px-2 md:px-10 py-3 text-[1em] md:text-xl font-normal bg-white text-[#2a59c6]">
        {post.postDescription && <p> {post.postDescription} </p>}
      </div>

      <div className="w-full px-2 md:px-5 py-1 bg-white flex justify-between items-center">
        {post && !post.likedBy.includes(userData._id.toString()) && (
          <button
            onClick={handleLikeBtn}
            className="active:scale-80 text-[0.8em] md:text-xl hover:bg-[#dadadaac] ease-in duration-300  rounded-xl flex justify-center items-center gap-2 px-3 md:px-10 py-2 font-medium cursor-pointer text-[#848484]"
          >
            <FaRegHeart /> {post.likedBy.length}
          </button>
        )}

        {post && post.likedBy.includes(userData._id.toString()) && (
          <button
            onClick={handleLikeBtn}
            className="active:scale-80 text-[0.8em] md:text-xl hover:bg-[#dadadaac] ease-in duration-300  rounded-xl flex justify-center items-center gap-2 px-3 md:px-10 py-2 font-medium cursor-pointer text-[#848484]"
          >
            <FaHeart className="text-[#cd2121cb]" /> {post.likedBy.length}
          </button>
        )}

        {/* <button className="active:scale-80 text-xl hover:bg-[#dadadaac] ease-in duration-300  rounded-xl flex justify-center items-center gap-2 px-10 py-2 font-medium cursor-pointer text-[#848484]">
          <BiSolidLike /> {post.likedBy.length}
        </button> */}
        <button
          onClick={handleCommentBox}
          className="hover:bg-[#dadadaac] ease-in duration-300  rounded-xl active:scale-95 text-[0.8em] md:text-xl flex justify-center items-center gap-2 px-3 md:px-10 py-2 font-medium cursor-pointer text-[#848484]"
        >
          <FaComment /> {post.comments.length}
        </button>
      </div>

      {isOpenCommentBox && <CommentBox post={post} />}
    </div>
  );
};

export default PostCardAll;
