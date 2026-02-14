import express from "express";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import multer from "multer";
import path from "path";
import { createNewStory, getAllStoryById } from "../controller/story_controller.js";


const storyRouter = express.Router();

//Storage 
const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, 'uploads/Story');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

storyRouter.post('/createNewStory',isAuthenticated, upload.single("story"), createNewStory);
storyRouter.get('/getAllStory/:uploaderId', isAuthenticated, getAllStoryById)

export default storyRouter;