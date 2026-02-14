import express from "express";
import { handleProfileCoverPicChange, handleProfilePicChange } from "../controller/profile_controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import multer from "multer";
import path from 'path'

const profileRouter = express.Router();


// Multer Storage Config - For Profile
const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, "uploads/Images/profilePic");  // Save files in /uploads folder
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    }
})
const upload = multer({storage});

// Multer Storage Config - For ProfileCover
const storage2 = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, "uploads/Images/profileCover"); // Save files in /uploads folder
    },

    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
})
const upload2 = multer({storage:storage2});

profileRouter.patch('/changeProfilePic',isAuthenticated, upload.single("profilePicData"), handleProfilePicChange);
profileRouter.patch('/changeProfileCoverPic', isAuthenticated, upload2.single("profileCoverPicData"), handleProfileCoverPicChange);

export default profileRouter; 