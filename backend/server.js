import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./database/db.js";
import UserRouter from "./routes/user_router.js";
import publicRouter from "./routes/public_router.js";
import friendRouter from "./routes/friends_routere.js";
import { initSocket } from "./Socket_Handlers/socket.js";
import http from 'http';
import ChatRouter from "./routes/chat_router.js";
import profileRouter from "./routes/profile_router.js";
import postRouter from "./routes/post_router.js";
import storyRouter from "./routes/story_router.js";


const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow from all origin

//Public Folder
app.use(express.static('./public'));
app.use("/uploads/Images/profilePic", express.static("uploads/Images/profilePic")); // Server only this as public
app.use("/uploads/Images/profileCover", express.static("uploads/Images/profileCover")); // Server only this as public
app.use("/uploads/Posts", express.static("uploads/Posts")); // Serve as Static
app.use('/uploads/Story', express.static('uploads/Story')); // Server as Static

app.use('/api', publicRouter);
app.use('/api/user/auth', UserRouter);
app.use('/api/friend', friendRouter);
app.use('/api/chat', ChatRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts/', postRouter);
app.use('/api/story', storyRouter);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initSocket(server);

const PORT = process.env.PORT; 
server.listen(PORT,()=>{
    connectDB();
    console.log(`Server Running at http://localhost:${PORT}/`);
})