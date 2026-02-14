import express, { Router } from "express";
import { deleteUser, homePage, loginUser, signup, verifyUser } from "../controller/user_controller.js";


const UserRouter = express.Router();

UserRouter.post('/signup', signup);
UserRouter.post('/verify', verifyUser);
UserRouter.post('/cancle', deleteUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/home', homePage);




export default UserRouter;