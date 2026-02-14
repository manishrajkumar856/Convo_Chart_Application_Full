import express from "express";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { acceptUserRequest, CancleFrRequest, getFriendSuggestion, getUserById, handleHomePage, rejectUserRequest, sendFriendRequest } from "../controller/public_controller.js";

const publicRouter = express.Router();


publicRouter.get('/', isAuthenticated, handleHomePage);
publicRouter.get('/getFriendSugg/', isAuthenticated, getFriendSuggestion);
publicRouter.get('/getUser/:id', isAuthenticated, getUserById);



publicRouter.post('/sendFriendRequest', isAuthenticated, sendFriendRequest);
publicRouter.post('/reject_request/:id', isAuthenticated, rejectUserRequest);
publicRouter.post('/accept_request/:id',isAuthenticated, acceptUserRequest);
publicRouter.post('/cancle_request', isAuthenticated, CancleFrRequest);


export default publicRouter;