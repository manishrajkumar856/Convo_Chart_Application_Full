import { Folders } from "@imagekit/nodejs/resources/index.mjs";
import storyModel from "../modals/story_model.js";
import { User } from "../modals/user_model.js";
import ImageKit, { toFile } from "@imagekit/nodejs";

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.URL_END_POINT,
})

export const createNewStory = async (req, res)=>{

    const {storyFileType, userId, storyDesc} = req.body;

    if(!req.file){
        return res.status(401).json({
            message: "File not get!"
        })
    }

    let result = null;
    try {
        result = await imageKit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), "file"),
            fileName: req.file.originalname,
            folder: "/Convo_Chart/Profile/Story",
        })
        console.log(result)
    } catch (error) {
        return res.status(400).json({
            message: "File is Messing! "+error,
        })
    }

    console.log(result);

    const newStoryFile = {
        destination: req.file.destination,
        filename: result.fileId,
        size: req.file.size,
        storyUrl: result.url,
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