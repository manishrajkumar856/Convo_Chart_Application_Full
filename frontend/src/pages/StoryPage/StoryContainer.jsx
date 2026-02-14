



import React, { useEffect, useState } from "react";

const StoryContainer = ({ story, timing = 5000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const intervalTime = 50; // smoothness
    const increment = 100 / (timing / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [story, timing]);

  return (
    <div className="relative overflow-hidden w-full h-160 mt-10 rounded-[1em] md:w-110 bg-[#131313]">

      {/* 🔥 Progress Bar */}
      <div className="absolute top-4 left-4 right-4 h-1 bg-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {story.storyType.startsWith("image") && (
        <img
          className="w-full h-full object-cover"
          src={story.storyData.storyUrl}
          alt=""
        />
      )}

      {story.storyType.startsWith("video") && (
        <video
          className="w-full h-full object-cover"
          src={story.storyData.storyUrl}
          autoPlay
          muted
        />
      )}

      <div className="absolute bottom-10 px-10 py-3 flex justify-center text-white text-2xl font-semibold left-0 w-full">
        {story.storyDescription && <h2>{story.storyDescription}</h2>}
      </div>
    </div>
  );
};

export default StoryContainer;
