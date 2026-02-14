import mongoose from "mongoose";
import 'dotenv/config'

// Establish connection from mongo db
const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Db connect Successfully!");
    } catch (error) {
        console.log("Error! while connecting with mongo db.");
    }
}

export default connectDB;