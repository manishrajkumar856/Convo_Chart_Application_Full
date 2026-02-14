import express from "express";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { getAllFriends, remove_friend } from "../controller/friends_controller.js";

const friendRouter = express.Router();


friendRouter.get('/getAllFriends/:userId', isAuthenticated, getAllFriends);
friendRouter.delete('/removeFriend/:friendId', isAuthenticated, remove_friend);



export default friendRouter;