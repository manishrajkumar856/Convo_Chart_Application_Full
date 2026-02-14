import React from 'react'
import { FaPlus } from "react-icons/fa6";

const CreatePost = ({setClosePost}) => {

    const handleCreatePost = ()=>{
        setClosePost(false);
    }
  return (
    <div className='w-full bg-white px-10 py-5 rounded-xl flex justify-between items-center'>
        <h3 className='text-[1em] md:text-2xl font-semibold'>Create new post</h3>
        <div onClick={handleCreatePost} className='active:scale-95 cursor-pointer flex text-[1em] text-[#ffff] items-center justify-center gap-1 px-5 py-2 rounded-xl md:text-xl font-semibold bg-[#4898e3a4]'><FaPlus className='text-[1em] md:text-2xl' /> Create</div>
    </div>
  )
}

export default CreatePost