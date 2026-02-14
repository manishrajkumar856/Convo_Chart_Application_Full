import axios from "axios";
import React, { useEffect, useState } from "react";
import StoryContainer from "./StoryContainer";

const StoryPage = ({ setStoryOpenContainer, userId, userInf }) => {
  const token = localStorage.getItem("accessToken");
  const [stories, setStories] = useState(null);
  const [crrStory, setCurrStory] = useState(0);

  async function findAllPostById(id) {
    try {
      const response = await axios.get(
        `https://convo-chart-application-full.onrender.com/api/story/getAllStory/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);
      setStories(response.data.stories);
      selectWhatToRun();
    } catch (error) {
      console.log(error);
    }
  }

  // For viewing Story
  useEffect(() => {
    if (!stories) return;

    console.log("Stories length:", stories.length);

    const interval = setInterval(() => {
      setCurrStory((prev) => {
        if (prev >= stories.length - 1) {
          clearInterval(interval);
          setStoryOpenContainer(false);
          return prev; // clamp at last story
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [stories]);

  useEffect(() => {
    findAllPostById(userId);
  }, []);



  
  
  return (
    <div className="absolute top-0 left-0 py-10 px-3 flex flex-col justify-center items-center z-80 w-full h-full  bg-[#0e0d0dd6] backdrop-blur-5xl">
      {stories && (
        // stories && stories.map((story, idx)=>{
        //     return <div key={idx} ><StoryContainer story={story}/></div>
        // })

        <div>
          <StoryContainer story={stories[crrStory]} />
        </div>
      )}
    </div>
  );
};

export default StoryPage;
