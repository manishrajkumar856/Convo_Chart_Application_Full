import React, { useContext, useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";
import axios from "axios";
import { UserDataContext } from "../../../contextApi/DataContaxt";

const PostPage = () => {
  const [closePost, setClosePost] = useState(true);
  const [getPosts, setPosts] = useState(null);
  const token = localStorage.getItem("accessToken");
  const { userData } = useContext(UserDataContext);

  const fetchPosts = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `https://convo-chart-application-full.onrender.com/api/posts/getPostById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data.posts);
      setPosts(response.data.posts);
      console.log("Post:", getPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts(userData._id);
  }, []);

  return (
    <div className="w-full min-h-screen  py-20 px-5 md:px-20 lg:px-40">
      <CreatePost closePost={closePost} setClosePost={setClosePost} />
      {!closePost && (
        <CreatePostForm closePost={closePost} setClosePost={setClosePost} />
      )}

      {
        getPosts && getPosts.length > 0 &&
        <div className="w-full px-5 py-3 mt-3 bg-[#ffff] rounded-xl">
        <h2 className="text-xl px-10 font-semibold text-[#236cc5]">
          Here is your posts
        </h2>

        <div className="w-full columns-1 lg:columns-2 gap-6 mt-5 ">
          {getPosts &&
            getPosts.map((post, idx) => {
              console.log(post);
              return (
                <div key={idx} className="w-full mb-5">
                  <PostCard post={post} />
                </div>
              );
            })}
        </div>
      </div>
      }
    </div>
  );
};

export default PostPage;
