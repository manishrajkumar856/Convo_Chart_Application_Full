import { postModal } from "../modals/post_modal.js";
import fs from 'fs';
import path from "path";

export const createNewPost = async (req, res)=>{
    console.log(req.file, req.body);

    try {
        const newPost = await postModal.create({
            userId: req.body.userId,
            postDescription: req.body.description,
            postType: req.file && req.body.postType,
            postData: req.file && {
                destination: req.file.destination,
                filename: req.file.filename,
                postUrl: `http://localhost:9000/${req.file.destination}/${req.file.filename}`,
            },
        });

        await newPost.save();
        res.status(201).json({
            success: true,
            message: "Post Upload Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}


export const getPostById =  async (req, res)=>{
    const userId = req.params.userId;

    if(!userId){
        return req.status(404).json({
            success: false,
            message: "Id is messing",
        })
    }

    try {
        const posts = await postModal.find({userId: userId});

        return res.status(202).json({
            success: true,
            message: "Post fetch successfully!",
            posts
        });
        
    } catch (error) {
        return req.status(404).json({
            success: false,
            message: "Error :"+error,
        })
    }

}


export const getAllPost =  async (req, res)=>{

    try {
        const posts = await postModal.find().sort({createdAt: 1});

        return res.status(202).json({
            success: true,
            message: "Post fetch successfully!",
            posts
        });
        
    } catch (error) {
        return req.status(404).json({
            success: false,
            message: "Error :"+error,
        })
    }

}


export const addNewComment = async (req, res) => {
    
    const {postId, commentedBy, commentData} = req.body;
    console.log(req.body)

    if(!postId || !commentedBy || !commentData){
        return res.status(402).json({
            success: false,
            message: "Comment Id CommentedBy and CommentData one of them is messing"
        });
    }

    try {
        const post = await postModal.findById(postId);

        if(!post){
            return res.status(402).json({
            success: false,
            message: "Post not exist!"
        });
        }

        post.comments.unshift({postId, commentedBy, commentData});
        await post.save();

        return res.status(202).json({
            success: true,
            message: "Comment send successfylly!",
            post,
        });


    } catch (error) {
        console.log(error);
    }

}


export const deletePostById = async (req, res) =>{
    const postId = req.params.postId;
    
    try {
        const post = await postModal.findById(postId);

        console.log(post);

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not exist",
            })
        }


        if(post.postData){
            const filePath = path.join(post.postData.destination, post.postData.filename);
           
            fs.unlink(filePath, (err)=>{
                if(err){
                    console.log("Error while deleting file!");
                }
                else{
                    console.log("Delete file successfully!");
                }
            });
        }

        await postModal.findByIdAndDelete(postId);

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully!",
        });


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error: "+error,
        });
    }
}


export const handlePostLike = async (req, res)=>{
    console.log(req.params.postId, req.body)
    const postId = req.params.postId;
    const likedUserId = req.body.likeUserId;

    if(!postId || !likedUserId){
        return res.status(400).json({
            success: false,
            message: "Error! postId or userId is messing!",
        })
    }

    try {
        
        const post = await postModal.findById(postId);

        if(!post){
            return res.status(400).json({
                success: false,
                message: "Error: post not exist",
            })
        }

        console.log(post);
        if(post.likedBy.includes(likedUserId.toString())){
            console.log("Included");
            post.likedBy = post.likedBy.filter(ele => ele !== likedUserId.toString()) ;
        }
        else{
            console.log("Not Included");
            post.likedBy.unshift(likedUserId.toString());
        }

        await post.save();
        return res.status(200).json({
            success: true,
            message: "Like Success"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error!"+error,
        })
    }
}