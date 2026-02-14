import e from "express";
import { fetchAllChat } from "../controller/chat_controller.js";

const ChatRouter = e.Router();


ChatRouter.post('/getAllChat', fetchAllChat)


export default ChatRouter;
