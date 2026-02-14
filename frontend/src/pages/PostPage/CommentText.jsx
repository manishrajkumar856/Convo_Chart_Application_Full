import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../../contextApi/DataContaxt'

const CommentText = ({comment}) => {
    const {getDataUsingId} = useContext(UserDataContext);
    const [commentUser, setCommentUser] = useState(null);

    const getData = async ()=>{
        const data = await getDataUsingId(comment.commentedBy);
        setCommentUser(data);
        console.log(data);
    }

    useEffect(()=>{
        getData();
    }, []);

  return (
    <div className=' flex justify-start items-center gap-3 '> 
        <div className='w-8 h-8 md:w-10 md:h-10 overflow-hidden bg-[#a55656] rounded-full flex justify-center items-center'>
            {
                commentUser?.profilePicInfo && <img className='w-full h-full object-cover' src={commentUser.profilePicInfo.profileUrl} alt="" />
            }

            {
                commentUser && !commentUser?.profilePicInfo && <h1 className='text-white '>{commentUser.firstName.split("")[0]}</h1>
            }
        </div>

        <div className='px-5 text-[0.5em] md:text-[1em] text-[#666666] py-2 bg-[#cfcfcf83] rounded-full'>
            <div className='text-[0.8em] md:text-[1em] text-[#1e1e1e]'>{commentUser && commentUser.firstName +" "+ commentUser.serName}</div>
            {comment.commentData}
        </div>
    </div>
  )
}

export default CommentText