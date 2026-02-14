import express from "express";
import { addNewComment, createNewPost, deletePostById, getAllPost, getPostById, handlePostLike } from "../controller/post_controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import multer from "multer";
import path from "path";

const postRouter = express.Router();

// Strage
const storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        cb(null, 'uploads/Posts');  // Save files in upload folder
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname)); // Unique Filename
    }
});

const upload = multer({storage})


postRouter.post('/createNewPost',isAuthenticated, upload.single("post"), createNewPost);
postRouter.get('/getPostById/:userId', isAuthenticated, getPostById);
postRouter.get('/getAllPosts', isAuthenticated, getAllPost);
postRouter.post('/addNewComment', isAuthenticated, addNewComment);
postRouter.delete('/deletePost/:postId', isAuthenticated, deletePostById);
postRouter.patch('/likePost/:postId', isAuthenticated, handlePostLike);

export default postRouter;