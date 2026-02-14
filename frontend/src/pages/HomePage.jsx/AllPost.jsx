import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCardAll from "../PostPage/PostCardAll";

const AllPost = () => {
  const token = localStorage.getItem("accessToken");
  const [getPosts, setPosts] = useState(null);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/posts/getAllPosts`,
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
    fetchAllPosts();
  }, []);

  return (
    <div className="w-full h-full columns-1 md:columns-2 gap-5">
      {getPosts &&
        getPosts.map((post, idx) => {
          return (
            <div className="w-full mb-5" key={idx}>
              <PostCardAll post={post} />
            </div>
          );
        })}
    </div>
  );
};

export default AllPost;
