import storyModel from "../modals/story_model.js";
import { User } from "../modals/user_model.js";

export const createNewStory = async (req, res)=>{

    console.log(req.file, req.body);
    const {storyFileType, userId, storyDesc} = req.body;
    const newStoryFile = {
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        storyUrl: `http://localhost:9000/${req.file.destination}/${req.file.filename}`,
    }

    if(!storyFileType){
        return res.status(400).json({
            success: false,
            message: "Story File is messing! please select one before uploading"
        })
    }

    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User not exist",
            })
        }

        const story = await storyModel.create({
            userId,
            storyDescription: storyDesc,
            storyType: storyFileType,
            storyData: newStoryFile,
        })
        user.storyList.unshift(story._id);
        await user.save();

        return res.status(200).json({
            message: "Story uploaded successfylly",
            story: story,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error"+error
        })
    }


}


export const getAllStoryById = async (req, res) =>{
    const uploaderId = req.params.uploaderId;

    try {
        const stories = await storyModel.find({userId: uploaderId});

        return res.status(200).json({
            message: "Success!",
            stories,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed! "+error,
        });        
    }
}