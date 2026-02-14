import React, { useContext, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { UserDataContext } from '../../../contextApi/DataContaxt';
import axios from 'axios';
import CommentText from './CommentText';

const CommentBox = ({post}) => {
  const [getComment, setComment] = useState("");
  const {userData, fetchUserData} = useContext(UserDataContext);
  const token = localStorage.getItem('accessToken');

  
  const handleCommentSubmit = async (e)=>{
    e.preventDefault();
    
    let commentData = {
      postId: post._id,
      commentedBy: userData._id,
      commentData: getComment,
    }

    try {
      const response = await axios.post("https://convo-chart-application-full.onrender.com/api/posts/addNewComment",
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response);
      setComment("");
      commentData = null;
      fetchUserData()
    

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full px-1 md:px-5 py-2 bg-[#ffffff]'>
      <form onSubmit={handleCommentSubmit} className='relative'>
        <input onChange={(e)=> setComment(e.target.value)} value={getComment} className='w-full bg-[#cdcdcd89] px-5 py-2 pb-10 rounded-xl outline-none' placeholder='Write a comment' type="text" />
        <button type='submit' className='absolute right-5 bottom-3 cursor-pointer text-xl text-[#9b9a9a]'><IoSend /></button>
      </form>

      <div className='w-full h-50 overflow-auto text-[0.8em] text-xl font-semibold text-[#afafaf] flex flex-col mt-2  gap-2 justify-start'>
        { post.comments.length > 0 &&
          post.comments.map((comment, idx)=>{
            return <CommentText key={idx} comment={comment} />
          })
        }

        {
          !post.comments.length > 0  && 
          <div className='w-full h-full flex justify-center items-center'>
            No comment yet
          </div> 
        }
      </div>
    </div>
  )
}

export default CommentBox